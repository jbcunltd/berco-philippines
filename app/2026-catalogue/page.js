const SITE = 'https://berco-philippines.vercel.app'
const PDF = '/berco-catalogue-2026.pdf'
const PAGE_DIR = '/img/catalogue/2026'
const PAGES = 48

export const metadata = {
  title: '2026 Catalogue | Berco',
  description: 'Read the Berco 2026 Catalogue — collections, materials, the making process and the Berco turnover standard. View it here or download the PDF.',
  keywords: ['Berco catalogue', 'Berco 2026 catalogue', 'cabinetry catalogue Philippines', 'custom kitchen catalogue Philippines', 'wardrobe catalogue Philippines'],
  alternates: { canonical: '/2026-catalogue' },
  openGraph: {
    type: 'website', url: `${SITE}/2026-catalogue`, siteName: 'Berco',
    title: '2026 Catalogue | Berco',
    description: 'The Berco 2026 Catalogue — collections, materials and the making process. View it here or download the PDF.',
    images: [{ url: `${SITE}/img/custom-kitchen-cabinetry-philippines.jpg`, alt: 'Berco custom cabinetry — 2026 Catalogue' }],
  },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '2026 Catalogue | Berco',
  url: `${SITE}/2026-catalogue`,
  description: 'The Berco 2026 Catalogue — collections, materials, the making process and the turnover standard.',
  about: { '@type': 'HomeAndConstructionBusiness', name: 'Berco', url: SITE, areaServed: { '@type': 'Country', name: 'Philippines' }, parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' } },
}

export default function Catalogue2026() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/#precision">Materials</a>
          <a href="/for-designers">For designers</a>
          <a className="navlink-cta" href="#book">Book a consult</a>
        </div>
        <a className="navcta" href="#book">Book a consult</a>
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <section className="band pgintro"><div className="shell">
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · 2026 Catalogue</span><span>Philippines</span></div>
        <span className="eyebrow">The catalogue</span>
        <h1>The 2026 Catalogue.</h1>
        <p className="lead">Collections, materials, how a Berco kitchen is actually made, and the standard we hand a project over on. Read it here, or take the PDF with you.</p>
        <div className="acts reveal" style={{ marginTop: '28px' }}>
          <a className="btn" href={PDF} download>Download the PDF →</a>
        </div>
      </div></section>

      <section className="band catrange catread"><div className="shell">
        <div className="catpages stag">
          {Array.from({ length: PAGES }, (_, i) => {
            const n = String(i + 1).padStart(2, '0')
            return (
              <a className="catpage" href={PDF} target="_blank" rel="noopener" key={i}>
                <img src={`${PAGE_DIR}/bc-${n}.jpg`} alt={`Berco 2026 Catalogue — page ${i + 1}`} loading="lazy" />
              </a>
            )
          })}
        </div>
        <div className="acts reveal" style={{ marginTop: 'clamp(28px,4vh,44px)' }}>
          <a className="btn" href={PDF} download>Download the full catalogue (PDF) →</a>
        </div>
        <p className="note reveal">Tap any page to open the full catalogue.</p>
      </div></section>

      <section className="jbc band"><div className="shell in">
        <h2 className="reveal">See the range in full.</h2>
        <p className="reveal">The catalogue is the overview — the collections pages carry the full reference library. Every image is a design reference, not a completed project. That&rsquo;s the honest way we show a new brand.</p>
        <div className="acts reveal" style={{ marginTop: '18px' }}>
          <a className="link" href="/#collections">All collections →</a>
          <a className="link" href="/collections/interior-systems" style={{ marginLeft: '22px' }}>Interior Systems →</a>
        </div>
      </div></section>

      <section id="book" className="final band"><div className="shell reveal">
        <h2>Planning a project this year?</h2>
        <a className="btn" href="mailto:sales@bercohome.com?subject=Consult%20enquiry%20%E2%80%94%202026%20Catalogue">Book a consult →</a>
        <p className="fee">We&rsquo;ll walk your space and layout with you, and tell you honestly what works before anything is ordered. Or message us on <a href="tel:+639178000730">0917 800 0730</a>.</p>
      </div></section>

      <footer><div className="shell">
        <div className="footgrid">
          <div>
            <div className="footlock" role="img" aria-label="Berco — The Heart of Your Home">Berco — The Heart of Your Home</div>
            <div className="foot-contact">
              <a href="mailto:sales@bercohome.com">sales@bercohome.com</a><br/>
              <a href="tel:+639178000730">0917 800 0730</a><br/>
              Philippines · under JBC UNLTD CORP
            </div>
          </div>
          <div className="footcol">
            <h4>Collections</h4>
            <a href="/collections/kitchens">Kitchens</a><a href="/collections/wardrobes">Wardrobes</a>
            <a href="/collections/living">Living &amp; Media</a><a href="/collections/bedrooms">Bedrooms</a>
            <a href="/collections/bathrooms">Bathrooms</a><a href="/collections/dining">Dining</a>
            <a href="/collections/interior-systems">Interior Systems</a>
          </div>
          <div className="footcol">
            <h4>Studio</h4>
            <a href="/how-we-work">How we work</a><a href="/for-designers">For designers</a>
            <a href="/#precision">Materials</a><a href="/2026-catalogue">2026 Catalogue</a>
          </div>
        </div>
        <div className="legal"><span>© 2026 Berco — a brand under JBC UNLTD CORP.</span><span>www.BERCOHOME.com</span></div>
      </div></footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
