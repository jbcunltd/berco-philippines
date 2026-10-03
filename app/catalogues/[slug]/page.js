import { CATALOGUES, CAT_ORDER } from '../data'
import { notFound } from 'next/navigation'
import Pic from '../../components/Pic'
import SiteFooter from '../../components/SiteFooter'

const SITE = 'https://www.bercohome.com'

export function generateStaticParams() {
  return CAT_ORDER.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const c = CATALOGUES[params.slug]
  if (!c) return {}
  const url = `${SITE}/catalogues/${params.slug}`
  return {
    title: c.seoTitle,
    description: c.seoDesc,
    keywords: c.keywords,
    alternates: { canonical: `/catalogues/${params.slug}` },
    openGraph: {
      type: 'website', url, siteName: 'Berco', title: c.seoTitle, description: c.seoDesc,
      images: [{ url: `${SITE}${c.cover}`, alt: `${c.name} cover` }],
    },
    twitter: { card: 'summary_large_image', title: c.seoTitle, description: c.seoDesc, images: [`${SITE}${c.cover}`] },
    robots: { index: true, follow: true },
  }
}

export default function Catalogue({ params }) {
  const c = CATALOGUES[params.slug]
  if (!c) notFound()
  const others = CAT_ORDER.filter((s) => s !== params.slug)

  // Matches the visible trail above, item for item: Berco · Catalogues · name.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Berco', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Catalogues', item: `${SITE}/catalogues` },
      { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE}/catalogues/${params.slug}` },
    ],
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: c.name,
    numberOfPages: c.pages,
    bookFormat: 'https://schema.org/EBook',
    inLanguage: 'en',
    url: `${SITE}/catalogues/${params.slug}`,
    image: `${SITE}${c.cover}`,
    description: c.seoDesc,
    publisher: { '@type': 'Organization', name: 'Berco', url: SITE },
  }

  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks" id="navmenu">
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
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false" aria-controls="navmenu"><span></span><span></span><span></span></button>
      </div></nav>

      <a className="skip" href="#main">Skip to content</a>
      <main id="main">

      <section className="band pgintro"><div className="shell">
        <div className="masthead">
          {/* The middle crumb said Catalogues and went to /for-designers. */}
          <span><a href="/" className="crumb">Berco</a> · <a href="/catalogues" className="crumb">Catalogues</a> · {c.name}</span>
          <span>Philippines</span>
        </div>

        <div className="cathead">
          <span className="cathead-cover"><Pic src={c.cover} alt={`${c.name} cover`} sizes="(max-width:600px) 132px, (max-width:1280px) 18vw, 230px" width="1000" height="1415" /></span>
          <div className="cathead-body">
            <span className="eyebrow">{c.eyebrow}</span>
            <h1>{c.hero}</h1>
            <p className="lead">{c.lead}</p>
            <div className="acts">
              <a className="btn" href="#read">Read it here →</a>
              <span className="dlmeta">{c.meta}</span>
            </div>
          </div>
        </div>
      </div></section>

      <section className="band catrange catread"><div className="shell">
        <p className="viewslabel" id="read">Read it here, all {c.pages} {c.pages === 1 ? 'page' : 'pages'}</p>
        <div className="catpages">
          {Array.from({ length: c.pages }, (_, i) => {
            const n = String(i + 1).padStart(2, '0')
            return (
              <a className="catpage" href={c.pdf} target="_blank" rel="noopener" key={i}>
                <Pic src={`${c.pageDir}/${c.prefix}-${n}.jpg`} alt={`${c.name}, page ${i + 1}`} loading="lazy" width="1100" height="1556" />
              </a>
            )
          })}
        </div>
        <div className="acts reveal" style={{ marginTop: 'clamp(28px,4vh,44px)' }}>
          {/* One template string, not `PDF, {c.size} →`. Three JSX children put
              React's `<!-- -->` text separators through the middle of the label
              in the HTML, which reads correctly in the DOM but not to anything
              grepping the markup for the file size. */}
          <a className="btn" href={c.pdf} download>{`Download the full PDF, ${c.size} →`}</a>
        </div>
        <p className="note reveal">Prices are quoted per project on a proposal, not in the catalogues. For a live specification, talk to a Berco designer.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>The other catalogues.</h2><span className="eyebrow">Also available</span></div>
        <div className="dlgrid stag">
          {others.map((s) => {
            const o = CATALOGUES[s]
            return (
              <a className="dlcard" href={`/catalogues/${s}`} key={s}>
                <span className="dlcover"><Pic src={o.cover} alt={`${o.name} cover`} sizes="(max-width:600px) 132px, (max-width:1080px) 13vw, 140px" loading="lazy" width="1000" height="1415" /></span>
                <span className="dlbody">
                  <span className="dlmeta">{o.meta}</span>
                  <h3>{o.name}</h3>
                  <span className="dlgo">View &amp; download →</span>
                </span>
              </a>
            )
          })}
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Specifying a project?</h2>
        <a className="btn" href="/contact">Talk to a Berco designer →</a>
        <p className="fee">Named materials and hardware, real sizes and cabinet fits, and honest lead times before anything is ordered. Or call <a href="tel:+639178000730">0917 800 0730</a>.</p>
      </div></section>

      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
