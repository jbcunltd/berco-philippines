import { CATALOGUES, CAT_ORDER } from './data'
import Pic from '../components/Pic'

const SITE = 'https://www.bercohome.com'

export const metadata = {
  title: 'Catalogues — Read or Download | Berco',
  description: 'The Berco catalogues — the 2026 Catalogue, Interior Systems, Materials & Finishes, and the Technical Specification. Read each one here or download the PDF.',
  keywords: ['Berco catalogue', 'cabinetry catalogue Philippines', 'interior systems catalogue', 'kitchen materials catalogue Philippines'],
  alternates: { canonical: '/catalogues' },
  openGraph: {
    type: 'website', url: `${SITE}/catalogues`, siteName: 'Berco',
    title: 'Catalogues — Read or Download | Berco',
    description: 'The Berco catalogues — collections, interior systems, materials and technical specification. Read them here or download the PDFs.',
    images: [{ url: `${SITE}/img/covers/catalogue-2026-cover.jpg`, alt: 'Berco 2026 Catalogue cover' }],
  },
  robots: { index: true, follow: true },
}

export default function Catalogues() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
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
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <a className="skip" href="#main">Skip to content</a>
      <main id="main">

      <section className="band pgintro"><div className="shell">
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · Catalogues</span><span>Philippines</span></div>
        <span className="eyebrow">The books</span>
        <h1>Catalogues.</h1>
        <p className="lead">How a Berco kitchen is planned, what goes inside it, and what it is made of — in four books. Read each one right here, page by page, or download the PDF.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="colgrid stag">
          {CAT_ORDER.map((s) => (
            <a className="colcard" href={`/catalogues/${s}`} key={s}>
              <Pic src={CATALOGUES[s].cover} alt={`${CATALOGUES[s].name} — cover`} sizes="(max-width:520px) 92vw, (max-width:820px) 47vw, 31vw" loading="lazy" width="1200" height="900" />
              <span className="lbl"><span className="cn">{CATALOGUES[s].name}</span><span className="go">{CATALOGUES[s].meta} →</span></span>
            </a>
          ))}
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Would you like us to review your space and guide you through the design process?</h2>
        <a className="btn" href="/contact">Book a design consultation →</a>
        <p className="fee">A design engagement fee secures the design phase — deductible from the project. Or message us on <a href="https://m.me/bercophilippines?ref=catalogues-index" rel="noopener">Messenger</a>.</p>
      </div></section>

      </main>

      <footer><div className="shell">
        <div className="footgrid">
          <div>
            <div className="footlock" role="img" aria-label="Berco — The Heart of Your Home">Berco — The Heart of Your Home</div>
            <div className="foot-contact">
              <a href="mailto:sales@bercohome.com">sales@bercohome.com</a><br/>
              <a href="tel:+639178000730">0917 800 0730</a><br/>
              <a href="https://m.me/bercophilippines?ref=website-footer" rel="noopener">Message us on Messenger</a><br/>
              Mandaluyong &amp; Cebu · Projects nationwide · JBC UNLTD CORP
            </div>
          </div>
          <div className="footcol">
            <h3>Catalogues</h3>
            {CAT_ORDER.map((s) => <a href={`/catalogues/${s}`} key={s}>{CATALOGUES[s].name}</a>)}
          </div>
          <div className="footcol">
            <h3>Studio</h3>
            <a href="/catalogues">Catalogues</a>
            <a href="/how-we-work">How we work</a><a href="/#precision">Materials</a>
            <a href="/for-designers">For designers</a><a href="/contact">Contact</a>
          </div>
          <div className="footcol">
            <h3>Policies</h3>
            <a href="/delivery-policy">Delivery &amp; installation</a><a href="/returns-policy">Returns &amp; warranty</a><a href="/privacy-policy">Privacy</a>
          </div>
        </div>
        <div className="legal"><span>© 2026 Berco — JBC UNLTD CORP.</span><span><a href="/delivery-policy">Delivery</a> · <a href="/returns-policy">Returns &amp; warranty</a> · <a href="/privacy-policy">Privacy</a></span></div>
      </div></footer>
    </>
  )
}
