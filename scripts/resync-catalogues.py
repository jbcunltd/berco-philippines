#!/usr/bin/env python3
"""
Re-render every catalogue's web pages + cover straight from its PDF, and correct the
page count in app/catalogues/data.js to whatever the PDF actually is.

Run this whenever the catalogue workstream ships a new or updated PDF into public/.
Without it, /catalogues/<slug> keeps showing the OLD pages while the Download button
hands over the NEW file, and a changed page count silently truncates the viewer.

    python3 scripts/resync-catalogues.py            # resync all
    python3 scripts/resync-catalogues.py materials-finishes

Requires: PyMuPDF (fitz), Pillow.
"""
import io, os, re, sys, glob, hashlib

try:
    import fitz
    from PIL import Image
except ImportError:
    sys.exit("Needs PyMuPDF and Pillow:  pip3 install pymupdf pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'app', 'catalogues', 'data.js')
PAGE_W = 1100      # page-image width used by the viewer
COVER_W = 1000     # cover width used by the cards
QUALITY = 82

def catalogues():
    """Read the slug -> {pdf, pageDir, prefix, cover, pages} map out of data.js."""
    src = open(DATA).read()
    out = {}
    for slug, body in re.findall(r"'([a-z0-9-]+)':\s*\{(.*?)\n  \},", src, re.S):
        g = lambda k: (re.search(k + r":\s*'([^']+)'", body) or [None, None])[1]
        pages = re.search(r"pages:\s*(\d+)", body)
        out[slug] = {
            'pdf': g('pdf'), 'pageDir': g('pageDir'), 'prefix': g('prefix'),
            'cover': g('cover'), 'pages': int(pages.group(1)) if pages else None,
        }
    return out

def render(slug, c):
    pdf_path = os.path.join(ROOT, 'public', c['pdf'].lstrip('/'))
    if not os.path.exists(pdf_path):
        print(f"  {slug:26} SKIP - no PDF at {c['pdf']}")
        return None
    doc = fitz.open(pdf_path)
    n = doc.page_count
    outdir = os.path.join(ROOT, 'public', c['pageDir'].lstrip('/'))
    os.makedirs(outdir, exist_ok=True)

    # drop stale page images if the document got shorter
    for old in glob.glob(os.path.join(outdir, f"{c['prefix']}-*.jpg")):
        idx = int(re.search(r'-(\d+)\.jpg$', old).group(1))
        if idx > n:
            os.remove(old); print(f"  {slug:26} removed stale page {idx}")

    changed = 0
    for i in range(n):
        page = doc[i]
        pix = page.get_pixmap(matrix=fitz.Matrix(PAGE_W / page.rect.width,
                                                 PAGE_W / page.rect.width), alpha=False)
        im = Image.open(io.BytesIO(pix.tobytes('ppm'))).convert('RGB')
        dest = os.path.join(outdir, f"{c['prefix']}-{i+1:02d}.jpg")
        buf = io.BytesIO(); im.save(buf, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
        new = buf.getvalue()
        old = open(dest, 'rb').read() if os.path.exists(dest) else b''
        if hashlib.md5(new).hexdigest() != hashlib.md5(old).hexdigest():
            open(dest, 'wb').write(new); changed += 1

    # cover = page 1
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(COVER_W / page.rect.width,
                                             COVER_W / page.rect.width), alpha=False)
    cov = os.path.join(ROOT, 'public', c['cover'].lstrip('/'))
    os.makedirs(os.path.dirname(cov), exist_ok=True)
    Image.open(io.BytesIO(pix.tobytes('ppm'))).convert('RGB').save(
        cov, 'JPEG', quality=86, optimize=True, progressive=True)

    print(f"  {slug:26} {n:3} pages ({changed} changed){'  PAGE COUNT WAS ' + str(c['pages']) if c['pages'] != n else ''}")
    return n

def fix_counts(actual):
    src = open(DATA).read(); orig = src
    for slug, n in actual.items():
        if n is None: continue
        blk = re.search(r"('" + slug + r"':\s*\{.*?\n  \},)", src, re.S)
        if not blk: continue
        fixed = re.sub(r"pages:\s*\d+", f"pages: {n}", blk.group(1))
        src = src.replace(blk.group(1), fixed)
    if src != orig:
        open(DATA, 'w').write(src); print("\n  data.js page counts updated")
    else:
        print("\n  data.js already correct")

if __name__ == '__main__':
    want = sys.argv[1:] or None
    cats = catalogues()
    print(f"Resyncing {'all' if not want else ', '.join(want)} from public/*.pdf\n")
    actual = {}
    for slug, c in cats.items():
        if want and slug not in want: continue
        actual[slug] = render(slug, c)
    fix_counts(actual)
    # newly rendered pages need their WebP variants too, or the site serves stale ones
    print("\nRebuilding WebP variants...")
    os.system(f'python3 {os.path.join(os.path.dirname(os.path.abspath(__file__)), "build-webp.py")}')
    print("\nDone. Commit public/img/catalogue/** , public/img/covers/** and app/catalogues/data.js")
