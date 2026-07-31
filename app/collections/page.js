import { CATS, ORDER } from './data'
import Pic from '../components/Pic'

const SITE = 'https://berco-philippines.vercel.app'

export const metadata = {
  title: 'Collections — Custom Cabinetry by Space | Berco',
  description: 'Berco custom cabinetry by space — kitchens, wardrobes, living & media, bedrooms, bathrooms and dining for Philippine homes. Explore each collection.',
  keywords: ['custom cabinetry collections Philippines', 'kitchen wardrobe cabinetry Philippines', 'built-in storage Philippines', 'Berco collections'],
  alternates: { canonical: '/collections' },
  openGraph: {
    type: 'website', url: `${SITE}/collections`, siteName: 'Berco',
    title: 'Collections — Custom Cabinetry by Space | Berco',
    description: 'Custom cabinetry by space — kitchens, wardrobes, living, bedrooms, bathrooms and dining for Philippine homes.',
    images: [{ url: `${SITE}/img/custom-kitchen-cabinetry-philippines.jpg`, alt: 'Berco custom cabinetry — design reference' }],
  },
  robots: { index: true, follow: true },
}

const first = (slug) => `/img/collections/${slug}/${CATS[slug].images[0].src}`

export default function Collections() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/collections">Collections</a>
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

      <section className="band pgintro"><div className="shell">
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · Collections</span><span>Philippines</span></div>
        <span className="eyebrow">What we make</span>
        <h1>Cabinetry, by space.</h1>
        <p className="lead">Kitchens, wardrobes, living and media, bedrooms, bathrooms and dining — custom cabinetry designed, measured and built for how each room is actually used. Every image is a design reference.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="colgrid stag">
          {ORDER.map((s) => (
            <a className="colcard" href={`/collections/${s}`} key={s}>
              <Pic src={first(s)} alt={`${CATS[s].name} — Berco custom cabinetry design reference`} loading="lazy" width="1600" height="900" />
              <span className="lbl"><span className="cn">{CATS[s].name}</span><span className="go">Explore →</span></span>
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
    </>
  )
}
