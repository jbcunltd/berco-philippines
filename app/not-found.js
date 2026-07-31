import { CATS, ORDER } from './collections/data'

export const metadata = {
  title: 'Page not found | Berco',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/#precision">Materials</a>
          <a href="/#about">About</a>
          <a className="navlink-cta" href="/#book">Book a consultation</a>
        </div>
        <a className="navcta" href="/#book">Book a consultation</a>
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <section className="band pgintro nf"><div className="shell">
        <span className="eyebrow">404</span>
        <h1>This page has moved on.</h1>
        <p className="lead">The page you were looking for isn&rsquo;t here — but the good part of the house still is. Start from the beginning, or step straight into a collection.</p>
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

      <footer><div className="shell">
        <div className="legal"><span>© 2026 Berco — a brand under JBC UNLTD CORP.</span><span><a href="/delivery-policy">Delivery</a> · <a href="/returns-policy">Returns &amp; warranty</a></span></div>
      </div></footer>
    </>
  )
}
