#!/usr/bin/env python3
"""
Pre-build WebP versions of every served image, so the site ships modern formats
without depending on a metered runtime optimizer.

For each source JPEG under public/img:
  foo.jpg  ->  foo.webp          (same width, ~64% smaller)
  foo.jpg  ->  foo-800.webp      (800px wide, for phones) - browse imagery only

"Browse imagery" = the pictures people scroll through (homepage, collections,
carousel, covers). Catalogue page scans are excluded: they load lazily only when
someone deliberately opens a catalogue, and they need to stay legible when zoomed.

Re-run after adding or replacing images:   python3 scripts/build-webp.py
Idempotent - only rewrites a file when the bytes actually change.
"""
import io, os, sys, glob, hashlib

try:
    from PIL import Image
except ImportError:
    sys.exit("Needs Pillow:  pip3 install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'public', 'img')
FULL_Q = 78          # visually indistinguishable from the q86-90 JPEG sources
SMALL_Q = 74
SMALL_W = 800
# catalogue scans keep only a full-size webp (no phone variant - they get zoomed)
NO_SMALL = ('/catalogue/',)

def write_if_changed(path, data):
    old = open(path, 'rb').read() if os.path.exists(path) else b''
    if hashlib.md5(old).hexdigest() == hashlib.md5(data).hexdigest():
        return False
    open(path, 'wb').write(data)
    return True

def main():
    srcs = sorted(glob.glob(os.path.join(IMG, '**', '*.jpg'), recursive=True))
    made = changed = skipped_small = 0
    src_bytes = out_bytes = 0
    for s in srcs:
        rel = s[len(IMG):].replace(os.sep, '/')
        im = Image.open(s).convert('RGB')
        src_bytes += os.path.getsize(s)

        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=FULL_Q, method=6)
        full = s[:-4] + '.webp'
        if write_if_changed(full, buf.getvalue()):
            changed += 1
        made += 1
        out_bytes += os.path.getsize(full)

        if any(k in rel for k in NO_SMALL) or im.width <= SMALL_W:
            skipped_small += 1
            continue

        h = int(round(im.height * SMALL_W / im.width))
        b2 = io.BytesIO()
        im.resize((SMALL_W, h), Image.LANCZOS).save(b2, 'WEBP', quality=SMALL_Q, method=6)
        small = s[:-4] + f'-{SMALL_W}.webp'
        if write_if_changed(small, b2.getvalue()):
            changed += 1
        made += 1
        out_bytes += os.path.getsize(small)

    print(f"  sources        : {len(srcs)} jpg  ({src_bytes/1048576:.1f}MB)")
    print(f"  webp written   : {made} files ({out_bytes/1048576:.1f}MB), {changed} changed this run")
    print(f"  no phone variant: {skipped_small} (catalogue scans / already small)")
    print(f"\n  full-size webp is ~{100 - int(out_bytes*100/src_bytes)}% smaller than the jpg set")

if __name__ == '__main__':
    main()
