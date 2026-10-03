import { CATALOGUES, CAT_ORDER } from './data'
import Pic from '../components/Pic'
import SiteFooter from '../components/SiteFooter'

const SITE = 'https://www.bercohome.com'

export const metadata = {
  title: 'Catalogues: Read or Download | Berco',
  description: 'The Berco catalogues: the 2026 Catalogue, Interior Systems, Materials & Finishes, and the Technical Specification. Read each one here or download the PDF.',
  keywords: ['Berco catalogue', 'cabinetry catalogue Philippines', 'interior systems catalogue', 'kitchen materials catalogue Philippines'],
  alternates: { canonical: '/catalogues' },
  openGraph: {
    type: 'website', url: `${SITE}/catalogues`, siteName: 'Berco',
    title: 'Catalogues: Read or Download | Berco',
    description: 'The Berco catalogues: collections, interior systems, materials and technical specification. Read them here or download the PDFs.',
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
        <p className="lead">How a Berco kitchen is planned, what goes inside it, and what it is made of, in four books. Read each one right here, page by page, or download the PDF.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="catgrid stag">
          {CAT_ORDER.map((s) => (
            <a className="catcard" href={`/catalogues/${s}`} key={s}>
              {/* The site label used to sit ON the cover, inside a 4:5 crop, and every one
                  of the four collided with the cover's own typography: "Interior Systems
                  Catalogue" landed on the cover's own "Interior Systems.", "Materials &
                  Finishes 2026" and "PDF 48PP" landed on "The Surface.", "Technical
                  Specification" landed on the issue block. Two type systems in the same
                  corner and neither one read.

                  There is no single image area to crop to: of the four covers one is a
                  full-bleed photo with type at both ends, one has type bottom-left, one
                  splits photo over a black type block at 70%, and one is a cream page with
                  a photographic plate in the middle. So the cover is shown WHOLE, at its
                  own 1000x1415 proportion, and the site label moved out from under it into
                  a caption row on cream. The cover already states its name; the caption
                  carries the format and the affordance, and gives the link its text.
                  No scrim and no hover zoom, both of which damaged the artwork. */}
              <span className="catshot">
                <Pic src={CATALOGUES[s].cover} alt={`${CATALOGUES[s].name} cover`} sizes="(max-width:520px) 92vw, (max-width:820px) 47vw, 31vw" loading="lazy" width="1000" height="1415" />
              </span>
              <span className="catlbl">
                <span className="cn">{CATALOGUES[s].name}</span>
                <span className="go">{CATALOGUES[s].meta} →</span>
              </span>
            </a>
          ))}
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Would you like us to review your space and guide you through the design process?</h2>
        <a className="btn" href="/contact">Book a design consultation →</a>
        <p className="fee">The design consultation is free. The site measurement visit is paid, and credited to your project when you go ahead. Or message us on <a href="https://m.me/bercophilippines?ref=catalogues-index" rel="noopener">Messenger</a>.</p>
      </div></section>

      </main>

      <SiteFooter />
    </>
  )
}
