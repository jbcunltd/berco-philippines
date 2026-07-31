import { CATS, ORDER } from '../../data'
import { notFound } from 'next/navigation'
import Pic from '../../../components/Pic'

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
  const title = `${im.title} — ${c.name} | Berco`
  return {
    title,
    description: im.blurb,
    alternates: { canonical: `/collections/${params.slug}/${im.slug}` },
    openGraph: { type: 'article', url, siteName: 'Berco', title, description: im.blurb, images: [{ url: image, width: 1600, height: 900, alt: im.alt }] },
    twitter: { card: 'summary_large_image', title, description: im.blurb, images: [image] },
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
  // main image first, then any extra angles of the same design
  const views = [im.src, ...(im.angles || [])]
  const more = imgs.filter((x) => x.slug !== im.slug).slice(0, 6)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: im.title,
    caption: im.alt,
    description: im.blurb,
    contentUrl: `${SITE}${src}`,
    creditText: 'Berco — design reference',
    isPartOf: { '@type': 'CollectionPage', name: c.name, url: `${SITE}/collections/${params.slug}` },
    author: { '@type': 'Organization', name: 'Berco', url: SITE },
  }

  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/#precision">Materials</a>
          <a href="/for-designers">For designers</a>
          <a href="/contact">Contact</a>
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
          <Pic id="refmain" src={src} alt={im.alt} loading="eager" fetchPriority="high" width="1600" height="900" />
        </figure>

        {views.length > 1 && (
          <div className="views reveal" data-views>
            <p className="viewslabel">{views.length} views of this design</p>
            <div className="viewstrip">
              {views.map((v, k) => (
                <button className="viewthumb" type="button" data-view={`/img/collections/${params.slug}/${v}`}
                  aria-current={k === 0 ? 'true' : 'false'}
                  aria-label={`View ${k + 1} of ${im.title}`} key={v}>
                  <Pic src={`/img/collections/${params.slug}/${v}`} alt={`${im.title} — view ${k + 1}`} sizes="(max-width:720px) 22vw, 12vw" loading="lazy" width="1600" height="900" />
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
          <p className="refnote">This is a design reference — a starting point for your own space, not a completed Berco project. Every Berco kitchen or wardrobe is drawn, measured and specified to your room.</p>
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
        <p className="fee">A design engagement fee secures the design phase — deductible from the project. Or message us on <a href="tel:+639178000730">0917 800 0730</a>.</p>
      </div></section>

      </main>

      <footer><div className="shell">
        <div className="footgrid">
          <div>
            <div className="footlock" role="img" aria-label="Berco — The Heart of Your Home">Berco — The Heart of Your Home</div>
            <div className="foot-contact">
              <a href="mailto:sales@bercohome.com">sales@bercohome.com</a><br/>
              <a href="tel:+639178000730">0917 800 0730</a><br/>
              {/* ?ref= arrives with the conversation and is readable in ManyChat, so a
                  website-originated chat can be told apart from an ad-originated one. */}
              <a href="https://m.me/bercophilippines?ref=website-footer" rel="noopener">Message us on Messenger</a><br/>
              Philippines · under JBC UNLTD CORP
            </div>
          </div>
          <div className="footcol">
            <h4>Collections</h4>
            {ORDER.map((s) => <a href={`/collections/${s}`} key={s}>{CATS[s].name}</a>)}
          </div>
          <div className="footcol">
            <h4>Studio</h4>
            <a href="/how-we-work">How we work</a><a href="/#precision">Materials</a>
            <a href="/for-designers">For designers</a><a href="/#about">About</a><a href="/contact">Contact</a>
          </div>
          <div className="footcol">
            <h4>Policies</h4>
            <a href="/delivery-policy">Delivery &amp; installation</a><a href="/returns-policy">Returns &amp; warranty</a>
          </div>
        </div>
        <div className="legal"><span>© 2026 Berco — a brand under JBC UNLTD CORP.</span><span><a href="/delivery-policy">Delivery</a> · <a href="/returns-policy">Returns &amp; warranty</a></span></div>
      </div></footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
