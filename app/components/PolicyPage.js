import { POLICIES, POLICY_ORDER } from '../policies/data'
import { notFound } from 'next/navigation'

// Shared renderer for the policy pages. Explicit routes (not a root catch-all),
// so nothing can shadow /collections, /catalogues or the 404.
export default function PolicyPage({ slug }) {
  const p = POLICIES[slug]
  if (!p) notFound()
  const other = POLICY_ORDER.find((s) => s !== slug)

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

      <section className="band pgintro"><div className="shell">
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · {p.name}</span><span>Philippines</span></div>
        <span className="eyebrow">{p.eyebrow}</span>
        <h1>{p.hero}</h1>
        <p className="lead">{p.lead}</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="policy">
          {p.sections.map((s, i) => (
            <div className="polsec reveal" key={i}>
              <h2>{s.h}</h2>
              {s.p && <p>{s.p}</p>}
              {s.list && <ul>{s.list.map((l, k) => <li key={k}>{l}</li>)}</ul>}
            </div>
          ))}
          <p className="note">Last updated {p.updated}. Berco is a brand of JBC UNLTD CORP. Specific terms for your project — including dates, fees and scope — are set out in your written quotation, which takes precedence over this page.</p>
          <div className="acts" style={{ marginTop: 'clamp(24px,3.4vh,36px)' }}>
            <a className="link" href={`/${other}`}>{POLICIES[other].name} →</a>
          </div>
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Questions before you commit?</h2>
        <a className="btn" href="/contact">Ask us directly →</a>
        <p className="fee">We would rather answer it now than have you find out later. Or call <a href="tel:+639178000730">0917 800 0730</a>.</p>
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
              Philippines · JBC UNLTD CORP
            </div>
          </div>
          <div className="footcol">
            <h3>Studio</h3>
            <a href="/how-we-work">How we work</a><a href="/for-designers">For designers</a>
            <a href="/#precision">Materials</a><a href="/#about">About</a><a href="/contact">Contact</a>
          </div>
          <div className="footcol">
            <h3>Policies</h3>
            {POLICY_ORDER.map((s) => <a href={`/${s}`} key={s}>{POLICIES[s].name}</a>)}
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Berco — JBC UNLTD CORP.</span>
          <span><a href="/delivery-policy">Delivery</a> · <a href="/returns-policy">Returns &amp; warranty</a> · <a href="/privacy-policy">Privacy</a></span>
        </div>
      </div></footer>
    </>
  )
}
