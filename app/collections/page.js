import { CATS, ORDER } from './data'
import Pic from '../components/Pic'
import SiteFooter from '../components/SiteFooter'

const SITE = 'https://www.bercohome.com'

export const metadata = {
  title: 'Collections: Custom Cabinetry by Space | Berco',
  description: 'Berco custom cabinetry by space: kitchens, wardrobes, living & media, bedrooms, bathrooms and dining for Philippine homes. Explore each collection.',
  keywords: ['custom cabinetry collections Philippines', 'kitchen wardrobe cabinetry Philippines', 'built-in storage Philippines', 'Berco collections'],
  alternates: { canonical: '/collections' },
  openGraph: {
    type: 'website', url: `${SITE}/collections`, siteName: 'Berco',
    title: 'Collections: Custom Cabinetry by Space | Berco',
    description: 'Custom cabinetry by space: kitchens, wardrobes, living, bedrooms, bathrooms and dining for Philippine homes.',
    images: [{ url: `${SITE}/img/custom-kitchen-cabinetry-philippines.jpg`, alt: 'Berco custom cabinetry design reference' }],
  },
  robots: { index: true, follow: true },
}

const first = (slug) => `/img/collections/${slug}/${CATS[slug].images[0].src}`

// Matches the visible trail: "Berco · Collections".
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Berco', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE}/collections` },
  ],
}

export default function Collections() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks" id="navmenu">
          <a href="/collections">Collections</a>
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
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · Collections</span><span>Philippines</span></div>
        <span className="eyebrow">What we make</span>
        <h1>Cabinetry, by space.</h1>
        <p className="lead">Kitchens, wardrobes, living and media, bedrooms, bathrooms and dining. Custom cabinetry designed, measured and built for how each room is actually used. Every image is a design reference.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="colgrid stag">
          {ORDER.map((s) => (
            <a className="colcard" href={`/collections/${s}`} key={s}>
              {/* .colcard is a 4:5 portrait tile holding a 16:9 photo under object-fit:cover,
                  so the photo is ENLARGED: the tile is ~352 CSS px wide on a phone but the
                  picture is painted ~782 px wide. Declaring the tile width here would hand
                  these eight tiles the 1200px file and soften them, which is the regression
                  that got the 1,200px ladder reverted on 2026-09-17. Declare the painted
                  width instead. */}
              <Pic src={first(s)} alt={`${CATS[s].name}. Berco custom cabinetry design reference`} sizes="815px" loading="lazy" width="1600" height="900" />
              <span className="lbl"><span className="cn">{CATS[s].name}</span><span className="go">Explore →</span></span>
            </a>
          ))}
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Would you like us to review your space and guide you through the design process?</h2>
        <a className="btn" href="/contact">Book a design consultation →</a>
        <p className="fee">The design consultation is free. The site measurement visit is paid, and credited to your project when you go ahead.</p>
      </div></section>

      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
