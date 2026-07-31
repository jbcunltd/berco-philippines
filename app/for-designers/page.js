const SITE = 'https://berco-philippines.vercel.app'

export const metadata = {
  title: 'For Designers & Architects — Catalogues & Specification | Berco',
  description: 'Trade resources for architects and interior designers: download the Berco catalogue, the Interior Systems (fitted storage & sink) catalogue, the Materials & Finishes library of 202 finishes and the technical specification — with named materials, hardware, sizes and cabinet fits.',
  keywords: ['Berco for designers', 'cabinetry catalogue Philippines', 'interior systems catalogue', 'kitchen specification Philippines', 'trade cabinetry Philippines', 'architect resources cabinetry'],
  alternates: { canonical: '/for-designers' },
  openGraph: {
    type: 'website', url: `${SITE}/for-designers`, siteName: 'Berco',
    title: 'For Designers & Architects — Catalogues & Specification | Berco',
    description: 'Download the Berco catalogue, the Interior Systems catalogue, the Materials & Finishes library and the technical specification. Specification support for architects and designers.',
    images: [{ url: `${SITE}/img/custom-interiors-philippine-home.jpg`, alt: 'Berco custom interiors — design reference' }],
  },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'For Designers & Architects | Berco',
  url: `${SITE}/for-designers`,
  description: 'Trade resources for architects and interior designers — catalogues and technical specification from Berco.',
  about: { '@type': 'HomeAndConstructionBusiness', name: 'Berco', url: SITE, areaServed: { '@type': 'Country', name: 'Philippines' }, parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' } },
}

const DOWNLOADS = [
  { t: 'Berco Catalogue 2026', d: 'The full brand catalogue — collections, materials, the making process and the Berco turnover standard.', href: '/berco-catalogue-2026.pdf', meta: 'PDF' },
  { t: 'Interior Systems Catalogue', d: 'The complete fitted-storage, organisation and sink range — drawer organisation, larders, corner solutions, worktop integration, sinks & taps — with codes, sizes and cabinet fits.', href: '/berco-interior-systems-catalogue.pdf', meta: 'PDF' },
  { t: 'Technical Specification', d: 'Board grades, edge and finish specifications, hardware and the details you need at specification stage.', href: '/berco-technical-specification.pdf', meta: 'PDF' },
  { t: 'Materials & Finishes 2026', d: 'Part One is the selection — 54 finishes edited down to a working palette to put in front of a client. Part Two is the complete range, all 202, grouped by the material each is made from: melamine, film, lacquer, high-gloss UV, powder-coat, PET, veneer, leather, quartz and sintered stone worktops, and carcase panels. Every swatch carries its material code, so a finish can be scheduled and checked against the specification directly. Room approvals, care notes and an A–Z index at the back.', href: '/berco-materials-finishes-2026.pdf', meta: 'PDF · 28pp' },
]

const GET = [
  { t: 'Named specification', p: 'Real materials and hardware you can put on a schedule — multi-layer plywood carcases with aluminium kickboards, quartz, PUR and laser-sealed edges, Kesseböhmer and Peka fittings — with sizes and cabinet fits, not vague promises.' },
  { t: 'One team, drawing to install', p: 'The people who draw it coordinate the make and the install. Fewer hand-offs, one point of accountability from concept to turnover.' },
  { t: 'The truth, up front', p: 'Honest lead times and what drives them, and where a layout won’t work — told to you before anything is ordered, so your drawings hold.' },
]

export default function ForDesigners() {
  return (
    <>
      <nav><div className="shell navin">
        <a className="logo" href="/">Berco</a>
        <div className="navlinks">
          <a href="/#collections">Collections</a>
          <a href="/how-we-work">Process</a>
          <a href="/#precision">Materials</a>
          <a href="/for-designers">For designers</a>
          <a className="navlink-cta" href="#enquire">Enquire</a>
        </div>
        <a className="navcta" href="#enquire">Trade enquiry</a>
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <section className="band pgintro"><div className="shell">
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · For designers</span><span>Philippines</span></div>
        <span className="eyebrow">For architects &amp; designers</span>
        <h1>Specify with confidence.</h1>
        <p className="lead">Everything you need to draw Berco into a project — the catalogues, the technical specification, and a team that answers at specification stage. Named materials and hardware, real sizes and cabinet fits, and honest lead times before anything is ordered.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>Download the catalogues.</h2><span className="eyebrow">Resources</span></div>
        <div className="dlgrid stag">
          {DOWNLOADS.map((f) => (
            <a className="dlcard" href={f.href} download key={f.t}>
              <span className="dlmeta">{f.meta}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              <span className="dlgo">Download →</span>
            </a>
          ))}
        </div>
        <p className="note reveal">Prices are quoted per project on a proposal, not in the catalogues. For a live specification, talk to a Berco designer.</p>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>What you get, working with Berco.</h2><span className="eyebrow">Specification support</span></div>
        <div className="proc stag">
          {GET.map((g, i) => (
            <div className="procstep" key={i}>
              <div className="pn">{String(i + 1).padStart(2, '0')}</div>
              <div><h3>{g.t}</h3><p>{g.p}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="jbc band"><div className="shell in">
        <h2 className="reveal">Explore the range first.</h2>
        <p className="reveal">See the collections and the full Interior Systems range in reference before you specify. Every image is a design reference, not a completed project — the honest way we show a new brand.</p>
        <div className="acts reveal" style={{ marginTop: '18px' }}>
          <a className="link" href="/collections/interior-systems">Interior Systems →</a>
          <a className="link" href="/#collections" style={{ marginLeft: '22px' }}>All collections →</a>
        </div>
      </div></section>

      <section id="enquire" className="final band"><div className="shell reveal">
        <h2>Trade &amp; specification enquiries.</h2>
        <a className="btn" href="mailto:sales@bercohome.com?subject=Trade%20%2F%20specification%20enquiry">Start a trade enquiry →</a>
        <p className="fee">For architects, interior designers and project teams. Tell us the project and stage, and we&rsquo;ll get you what you need.</p>
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
            <a href="/#precision">Materials</a><a href="#enquire">Trade enquiry</a>
          </div>
        </div>
        <div className="legal"><span>© 2026 Berco — a brand under JBC UNLTD CORP.</span><span>www.BERCOHOME.com</span></div>
      </div></footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
