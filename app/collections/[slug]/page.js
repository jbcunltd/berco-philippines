import { CATS, ORDER } from '../data'
import { notFound } from 'next/navigation'
import Pic from '../../components/Pic'

const SITE = 'https://www.bercohome.com'
const base = (slug) => `${SITE}/img/collections/${slug}`

export function generateStaticParams() {
  return ORDER.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const c = CATS[params.slug]
  if (!c) return {}
  const url = `${SITE}/collections/${params.slug}`
  const hero = c.images[0] ? `${base(params.slug)}/${c.images[0].src}` : `${SITE}/img/custom-kitchen-cabinetry-philippines.jpg`
  return {
    title: c.seoTitle,
    description: c.seoDesc,
    keywords: c.keywords,
    alternates: { canonical: `/collections/${params.slug}` },
    openGraph: { type: 'website', url, siteName: 'Berco', title: c.seoTitle, description: c.seoDesc, images: [{ url: hero, alt: `${c.name} — Berco design reference` }] },
    twitter: { card: 'summary_large_image', title: c.seoTitle, description: c.seoDesc, images: [hero] },
    robots: { index: true, follow: true },
  }
}

export default function Collection({ params }) {
  const c = CATS[params.slug]
  if (!c) notFound()
  const img = (s) => `/img/collections/${params.slug}/${s}`
  const imgs = c.images
  const hero = imgs[0]
  const others = ORDER.filter((s) => s !== params.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: c.seoTitle.replace(' | Berco', ''),
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'Berco', url: SITE, parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' } },
    areaServed: { '@type': 'Country', name: 'Philippines' },
    description: c.seoDesc,
    url: `${SITE}/collections/${params.slug}`,
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

      <header className="cover cathead"><div className="shell">
        <div className="masthead"><span><a href="/#collections" className="crumb">Collections</a> · {c.name}</span><span>Philippines</span></div>
        <div className="coverimg">
          {hero
            ? <Pic className="cover-img" src={img(hero.src)} alt={hero.alt} width="1600" height="1000" />
            : <div className="cover-img ph pa" />}
          <div className="scrim"></div>
          {hero && <span className="cap">{c.name} · design reference</span>}
          <div className="type">
            <div className="eyebrow">Custom Cabinetry · Philippines</div>
            <h1>{c.hero}</h1>
            <p className="lead">{c.lead}</p>
            <div className="acts">
              <a className="btn" href="/contact">Book a design consultation →</a>
              <a className="link" href="/#collections">All collections</a>
            </div>
          </div>
        </div>
      </div></header>

      <section className="band"><div className="shell catbody reveal">
        <p className="catlead">{c.body}</p>
        <p className="refnote">Every image here is a design reference — a starting point for your space, not a completed Berco project.</p>
      </div></section>

      {c.types && (
        <section className="band"><div className="shell">
          <div className="sh reveal"><h2>The range.</h2><span className="eyebrow">{c.name}</span></div>
          <div className="typegrid stag">
            {c.types.map((t, i) => (
              <div className="typecard" key={i}><h3>{t.name}</h3><p>{t.line}</p></div>
            ))}
          </div>
        </div></section>
      )}

      {imgs.length > 0 && (
        <section className="band"><div className="shell">
          <div className="sh reveal"><h2>{c.name}, in reference.</h2><span className="eyebrow">Design references</span></div>
          <p className="galnote reveal">Tap any design to open it larger, with the details.</p>
          <div className="rgrid stag">
            {imgs.map((im) => (
              <a className="rcard" href={`/collections/${params.slug}/${im.slug}`} key={im.slug}>
                <span className="rcard-img"><Pic src={img(im.src)} alt={im.alt} loading="lazy" width="1600" height="900" /></span>
                <span className="rcard-t">{im.title || im.cap}</span>
              </a>
            ))}
          </div>
        </div></section>
      )}

      {c.catalogue && (
        <section className="band catrange"><div className="shell">
          <div className="sh reveal"><h2>{c.catalogue.title}</h2><span className="eyebrow">The catalogue</span></div>
          <p className="catlead reveal">{c.catalogue.intro}</p>
          <div className="acts reveal"><a className="btn" href={c.catalogue.pdf} download>{c.catalogue.pdfLabel}</a></div>
          <div className="catpages stag">
            {Array.from({ length: c.catalogue.pages }, (_, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <a className="catpage" href={c.catalogue.pdf} target="_blank" rel="noopener" key={i}>
                  <Pic src={`${c.catalogue.pageDir}/is-${n}.jpg`} alt={`${c.name} catalogue — page ${i + 1}`} loading="lazy" width="1100" height="1556" />
                </a>
              )
            })}
          </div>
          <div className="acts reveal"><a className="btn" href={c.catalogue.pdf} download>{c.catalogue.pdfLabel}</a></div>
        </div></section>
      )}

      {c.features && (
        <section className="band"><div className="shell">
          <div className="sh reveal"><h2>Built in as standard.</h2><span className="eyebrow">Features</span></div>
          <div className="chips reveal">
            {c.features.map((f, i) => <span className="chip" key={i}>{f}</span>)}
          </div>
        </div></section>
      )}

      <section className="prec band"><div className="shell reveal">
        <div className="sh"><h2>How your cabinetry is built.</h2><span className="eyebrow">Materials &amp; craft</span></div>
        <p className="catlead">Quartz worktops, multi-layer plywood carcases with aluminium kickboards, sealed PUR &amp; laser edges, and calibrated Austrian and German soft-close hardware — specified to materials we can name, then measured and fitted by one team.</p>
        <div className="acts"><a className="link" href="/#precision">See materials &amp; craft →</a></div>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>Other collections.</h2><span className="eyebrow">Explore</span></div>
        <div className="othergrid stag">
          {others.map((s) => (
            <a className="otile" href={`/collections/${s}`} key={s}>
              <span className="on">{CATS[s].name}</span>
              <span className="go">Explore →</span>
            </a>
          ))}
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Would you like us to review your space and guide you through the design process?</h2>
        <a className="btn" href="/contact">Book a design consultation →</a>
        <p className="fee">A design engagement fee secures the design phase — deductible from the project.</p>
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
