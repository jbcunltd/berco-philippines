// UNLISTED preview — the scroll-film hero ported into the real page furniture.
//
// This exists because Vercel preview URLs on this project are SSO-protected
// ("all_except_custom_domains"), so a branch preview would hit a login wall on a
// phone. The only surface Jumbo can actually open is the live custom domain, so
// the port is staged here, noindex, while the real homepage and the real
// /collections/kitchens stay exactly as they are until he passes it.
//
// Delete this route in the same commit that moves the hero onto the real pages.

import ScrollFilm from '../components/ScrollFilm'

export const metadata = {
  title: 'Hero scroll-film — port preview | Berco',
  robots: { index: false, follow: false },
}

export default function PreviewHero() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="#top">Berco</a>
        <div className="navlinks">
          <a href="#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/catalogues">Catalogues</a>
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

        {/* ── 1 · THE LANDING HERO — film C, open plan ─────────────────── */}
        <header id="top" className="cover">
          <ScrollFilm
            name="openplan"
            alt="Open-plan kitchen and living cabinetry in a Philippine home — Berco design reference"
            overlay={<h1>The heart of your home.</h1>}
            standfirst={<>
              <div className="sf-txt">
                <div className="eyebrow">Custom Cabinetry &amp; Interiors · Philippines</div>
                <p className="lead">Custom kitchens, wardrobes, vanities &amp; built-in storage for Philippine homes — designed, measured, and installed properly.</p>
              </div>
              <div className="acts">
                <a className="btn" href="/contact">Book a design consultation →</a>
                <a className="link" href="#collections">View collections</a>
              </div>
            </>}
          />
        </header>

        <section className="mani"><div className="shell reveal">
          <h2>We guide before we sell.</h2>
          <p>The truth about your space — before anything is built.</p>
        </div></section>

        {/* ── 2 · THE COLLECTION HERO — film D, walnut island ──────────── */}
        <section id="collections" className="band"><div className="shell">
          <div className="sh reveal"><h2>And the second one.</h2><span className="eyebrow">/collections/kitchens</span></div>
          <p className="lead-txt reveal">Below is the same mechanic on the kitchens page, with that page&rsquo;s own copy. Scrub it the same way.</p>
        </div></section>

        <header className="cover colhead">
          <ScrollFilm
            name="walnut"
            alt="Walnut island kitchen with quartz worktop — Berco design reference"
            overlay={<h1>Kitchens, built around you.</h1>}
            standfirst={<>
              <div className="sf-txt">
                <div className="eyebrow">Custom Cabinetry · Philippines</div>
                <p className="lead">Islands, sculleries and everyday kitchens — planned around how you cook, store and gather.</p>
              </div>
              <div className="acts">
                <a className="btn" href="/contact">Book a design consultation →</a>
                <a className="link" href="/catalogues">See the catalogue</a>
              </div>
            </>}
          />
        </header>

        <section className="band"><div className="shell">
          <div className="sh reveal"><h2>The range.</h2><span className="eyebrow">Kitchens</span></div>
          <p className="catlead reveal">A kitchen is decided before it is built: layout, storage zones, appliance placement and counter flow, worked out together first.</p>
        </div></section>

        <section className="band"><div className="shell">
          <div className="note-strip">
            <p><b>Unlisted preview.</b> Nothing on the live site has changed — the real homepage and the real kitchens page still carry their stills. This page exists so the film can be judged inside the actual page furniture: the real nav, the real copy, the real type.</p>
            <p>On a phone the copy sits on cream <i>beneath</i> the film, so nothing covers the cabinetry, and the Call / Messenger / Inquire bar carries the actions. On a laptop the film simply replaces the still inside the existing magazine-cover card, copy bottom-left where it already lives.</p>
          </div>
        </div></section>

      </main>
    </>
  )
}
