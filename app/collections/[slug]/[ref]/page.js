import { CATS, ORDER } from '../../data'
import { notFound } from 'next/navigation'
import Pic from '../../../components/Pic'
import SiteFooter from '../../../components/SiteFooter'

const SITE = 'https://www.bercohome.com'

// Build one detail page per design reference (140 total).
export function generateStaticParams() {
  const out = []
  for (const slug of ORDER) {
    for (const im of CATS[slug].images) out.push({ slug, ref: im.slug })
  }
  return out
}

function find(slug, ref) {
  const c = CATS[slug]
  if (!c) return null
  const i = c.images.findIndex((im) => im.slug === ref)
  if (i < 0) return null
  return { c, im: c.images[i], i }
}

export function generateMetadata({ params }) {
  const f = find(params.slug, params.ref)
  if (!f) return {}
  const { c, im } = f
  const url = `${SITE}/collections/${params.slug}/${im.slug}`
  const image = `${SITE}/img/collections/${params.slug}/${im.src}`
  const title = `${im.title} | ${c.name} | Berco`
  // im.metaDesc, not im.blurb. The blurb is the paragraph a visitor reads on the
  // page and runs 275-336 characters; a search result prints about 155, so every
  // one of these was truncated. See the note at the top of collections/data.js.
  const desc = im.metaDesc || im.blurb
  return {
    title,
    description: desc,
    alternates: { canonical: `/collections/${params.slug}/${im.slug}` },
    openGraph: { type: 'article', url, siteName: 'Berco', title, description: desc, images: [{ url: image, width: 1600, height: 900, alt: im.alt }] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [image] },
    robots: { index: true, follow: true },
  }
}

export default function Reference({ params }) {
  const f = find(params.slug, params.ref)
  if (!f) notFound()
  const { c, im, i } = f
  const imgs = c.images
  const prev = imgs[(i - 1 + imgs.length) % imgs.length]
  const next = imgs[(i + 1) % imgs.length]
  const src = `/img/collections/${params.slug}/${im.src}`
  const url = `${SITE}/collections/${params.slug}/${im.slug}`
  // main image first, then any extra angles of the same design
  const views = [im.src, ...(im.angles || [])]
  const more = imgs.filter((x) => x.slug !== im.slug).slice(0, 6)

  // Two graphs on this page. The breadcrumb is rendered on screen at the top of
  // the page and emitted nowhere, so a crawler saw a trail the visitor could see
  // and had to guess at the hierarchy. Named the same way the visible trail is,
  // item for item, because a BreadcrumbList that disagrees with the page is
  // worse than none.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Collections', item: `${SITE}/collections` },
      { '@type': 'ListItem', position: 2, name: c.name, item: `${SITE}/collections/${params.slug}` },
      { '@type': 'ListItem', position: 3, name: im.title, item: url },
    ],
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: im.title,
    caption: im.alt,
    description: im.blurb,
    contentUrl: `${SITE}${src}`,
    creditText: 'Berco design reference',
    isPartOf: { '@type': 'CollectionPage', name: c.name, url: `${SITE}/collections/${params.slug}` },
    // NO author, creator or copyrightNotice here, and they must not come back.
    // These are supplier renders. We did not photograph them, draw them or
    // commission them, so "author: Berco", "creator: Berco" and
    // "copyrightNotice: (c) 2026 JBC UNLTD CORP" were a copyright claim over
    // someone else's work, repeated across about 160 pages. They were added to
    // silence a Search Console "missing Image Metadata" warning, which is
    // non-critical and is the wrong reason to publish a claim that is not true.
    // creditText stays: "design reference" is exactly what these are, and it is
    // the same thing every page says in words.
    //
    // "license" and "acquireLicensePage" are absent for the same reason. They
    // drive Google's Licensable badge, which tells searchers the image can be
    // licensed from us. It cannot.
  }

  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/catalogues">Catalogues</a>
          <a href="/#precision">Materials</a>
          <a href="/for-designers">For designers</a>
          <a href="/contact">Contact</a>
          <a className="navlink-tap" href="tel:+639178000730">Tap to call 0917 800 0730</a>
          <a className="navlink-tap" href="https://m.me/bercophilippines?ref=nav-menu" rel="noopener">Message us on Messenger</a>
          <a className="navlink-cta" href="/contact">Book a consultation</a>
        </div>
        <a className="navcta" href="/contact">Book a consultation</a>
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <a className="skip" href="#main">Skip to content</a>
      <main id="main">

      <section className="band refwrap"><div className="shell">
        <div className="masthead">
          <span><a href="/#collections" className="crumb">Collections</a> · <a href={`/collections/${params.slug}`} className="crumb">{c.name}</a> · {im.title}</span>
          <span>Philippines</span>
        </div>

        <figure className="reffig reveal">
          <Pic id="refmain" src={src} alt={im.alt} sizes="(min-width:1240px) 1136px, 92vw" loading="eager" fetchPriority="high" width="1600" height="900" />
        </figure>

        {views.length > 1 && (
          <div className="views reveal" data-views>
            <p className="viewslabel">{views.length} views of this design</p>
            <div className="viewstrip">
              {views.map((v, k) => (
                <button className="viewthumb" type="button" data-view={`/img/collections/${params.slug}/${v}`}
                  aria-current={k === 0 ? 'true' : 'false'}
                  aria-label={`View ${k + 1} of ${im.title}`} key={v}>
                  <Pic src={`/img/collections/${params.slug}/${v}`} alt={`${im.title}, view ${k + 1}`} sizes="(max-width:720px) 22vw, 12vw" loading="lazy" width="1600" height="900" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="refhead reveal">
          <div className="refmeta">
            <span className="eyebrow">{c.name} · design reference</span>
            <h1>{im.title}</h1>
          </div>
          <div className="refnav">
            <a href={`/collections/${params.slug}/${prev.slug}`} className="rnav" aria-label="Previous design">← Prev</a>
            <a href={`/collections/${params.slug}/${next.slug}`} className="rnav" aria-label="Next design">Next →</a>
          </div>
        </div>

        <div className="refbody reveal">
          <p className="refblurb">{im.blurb}</p>
          <p className="refnote">This is a design reference, a starting point for your own space, not a completed Berco project. Every Berco kitchen or wardrobe is drawn, measured and specified to your room.</p>
          <div className="acts">
            <a className="btn" href="/contact">Book a design consultation →</a>
            <a className="link" href={`/collections/${params.slug}`}>← Back to {c.name}</a>
          </div>
        </div>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>More from {c.name}.</h2><span className="eyebrow">Keep exploring</span></div>
        <div className="rgrid stag">
          {more.map((x) => (
            <a className="rcard" href={`/collections/${params.slug}/${x.slug}`} key={x.slug}>
              <span className="rcard-img"><Pic src={`/img/collections/${params.slug}/${x.src}`} alt={x.alt} sizes="(max-width:560px) 92vw, (max-width:900px) 47vw, 31vw" loading="lazy" width="1600" height="900" /></span>
              <span className="rcard-t">{x.title}</span>
            </a>
          ))}
        </div>
        <div className="acts reveal" style={{ marginTop: 'clamp(20px,3vh,32px)' }}>
          <a className="link" href={`/collections/${params.slug}`}>All {c.name} references →</a>
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Would you like us to review your space and guide you through the design process?</h2>
        <a className="btn" href="/contact">Book a design consultation →</a>
        <p className="fee">The design consultation is free. The site measurement visit is paid, and credited to your project when you go ahead. Or message us on <a href="https://m.me/bercophilippines?ref=collection-detail" rel="noopener">Messenger</a>, or call <a href="tel:+639178000730">0917 800 0730</a>.</p>
      </div></section>

      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
