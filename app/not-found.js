import { CATS, ORDER } from './collections/data'
import SiteFooter from './components/SiteFooter'

// No `robots` key here on purpose. Next emits <meta name="robots" content="noindex">
// for a not-found page by itself; adding our own produced a SECOND, different
// robots tag on the same page ("noindex, follow"), which is the kind of
// disagreement a crawler is entitled to resolve either way. One tag, from the
// framework. Verified on the live 404 after this change.
// The description and the canonical are stated here because without them this
// page INHERITED the homepage's: every 404 on the site carried the homepage's
// 160-character sales description and, worse, rel=canonical pointing at
// https://www.bercohome.com/, which tells a crawler that a missing page IS the
// homepage. A noindex page should not nominate another page as its canonical,
// and this route answers every unmatched URL on the site, so there is no single
// self-referencing URL it could nominate instead. So the canonical is dropped
// rather than redirected: `canonical: null` suppresses the inherited tag, and
// Next's own noindex is left as the single directive on the page.
export const metadata = {
  title: 'Page not found | Berco',
  description: 'This Berco page is no longer here. Start from the homepage, or go straight to a cabinetry collection: kitchens, wardrobes, bathrooms, bedrooms or dining.',
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks" id="navmenu">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/catalogues">Catalogues</a>
          <a href="/#precision">Materials</a>
          <a href="/#about">About</a>
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

      <section className="band pgintro nf"><div className="shell">
        <span className="eyebrow">404</span>
        <h1>This page has moved on.</h1>
        <p className="lead">The page you were looking for isn&rsquo;t here. But the good part of the house still is. Start from the beginning, or step straight into a collection.</p>
        <div className="acts">
          <a className="btn" href="/">Back to home →</a>
          <a className="link" href="/how-we-work">How we work</a>
        </div>
        <div className="othergrid stag nfgrid">
          {ORDER.map((s) => (
            <a className="otile" href={`/collections/${s}`} key={s}>
              <span className="on">{CATS[s].name}</span>
              <span className="go">Explore →</span>
            </a>
          ))}
        </div>
      </div></section>

      </main>

      <SiteFooter />
    </>
  )
}
