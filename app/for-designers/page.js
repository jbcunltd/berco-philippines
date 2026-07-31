import Pic from '../components/Pic'
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
  { t: 'Berco Catalogue 2026', d: 'The full brand catalogue — collections, materials, the making process and the Berco turnover standard.', href: '/catalogues/2026-catalogue', meta: 'PDF', cover: '/img/covers/catalogue-2026-cover.jpg', coverAlt: 'Cover of the Berco Catalogue 2026' },
  { t: 'Interior Systems Catalogue', d: 'The complete fitted-storage, organisation and sink range — drawer organisation, larders, corner solutions, worktop integration, sinks & taps — with codes, sizes and cabinet fits.', href: '/catalogues/interior-systems', meta: 'PDF', cover: '/img/covers/interior-systems-cover.jpg', coverAlt: 'Cover of the Berco Interior Systems specification catalogue' },
  { t: 'Technical Specification', d: 'Board grades, edge and finish specifications, hardware and the details you need at specification stage.', href: '/catalogues/technical-specification', meta: 'PDF', cover: '/img/covers/technical-spec-cover.jpg', coverAlt: 'First page of the Berco technical specification sheet' },
  { t: 'Materials & Finishes 2026', d: 'Two complete schemes and a comparison of the four ways a door edge can be finished, then Part One — the selection, 50 finishes edited down to a working palette, each family shown in a room and as cabinetry. Part Two is the complete range, all 202, grouped by the material each is made from: melamine, film, lacquer, high-gloss UV, powder-coat, PET, veneer, leather, quartz and sintered stone worktops, and carcase panels. Every swatch carries its material code, so a finish can be scheduled and checked against the specification directly. Room approvals, care notes and an A–Z index at the back.', href: '/catalogues/materials-finishes', meta: 'PDF · 44pp', cover: '/img/covers/materials-finishes-cover.jpg', coverAlt: 'Cover of the Berco Materials and Finishes 2026 library' },
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
          <a href="/contact">Contact</a>
          <a className="navlink-cta" href="#inquire">Inquire</a>
        </div>
        <a className="navcta" href="#inquire">Trade inquiry</a>
        <button className="navtoggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div></nav>

      <a className="skip" href="#main">Skip to content</a>
      <main id="main">

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
            <a className="dlcard" href={f.href} key={f.t}>
              <span className="dlcover"><Pic src={f.cover} alt={f.coverAlt} loading="lazy" width="1000" height="1415" /></span>
              <span className="dlbody">
                <span className="dlmeta">{f.meta}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
                <span className="dlgo">View &amp; download →</span>
              </span>
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

      <section id="inquire" className="final band"><div className="shell reveal">
        <h2>Trade &amp; specification inquiries.</h2>
        <a className="btn" href="mailto:sales@bercohome.com?subject=Trade%20%2F%20specification%20inquiry">Start a trade inquiry →</a>
        <p className="fee">For architects, interior designers and project teams. Tell us the project and stage, and we&rsquo;ll get you what you need.</p>
      </div></section>

      </main>

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
            <a href="/#precision">Materials</a><a href="#inquire">Trade inquiry</a>
          </div>
          <div className="footcol">
            <h4>Policies</h4>
            <a href="/delivery-policy">Delivery &amp; installation</a><a href="/returns-policy">Returns &amp; warranty</a>
          </div>
        </div>
        <div className="legal"><span>© 2026 Berco — a brand under JBC UNLTD CORP.</span><span><a href="/delivery-policy">Delivery</a> · <a href="/returns-policy">Returns &amp; warranty</a></span></div>
      </div></footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
