const SITE = 'https://berco-philippines.vercel.app'

export const metadata = {
  title: 'How We Work — Our Cabinetry Process | Berco',
  description: 'How Berco designs, makes and installs custom cabinetry in the Philippines — a transparent, honest process. We show you exactly how it is built and tell you the truth before anything is made.',
  keywords: ['cabinetry process Philippines', 'how custom cabinets are made', 'kitchen design process Philippines', 'Berco process', 'custom cabinetry consultation Philippines'],
  alternates: { canonical: '/how-we-work' },
  openGraph: {
    type: 'website', url: `${SITE}/how-we-work`, siteName: 'Berco',
    title: 'How We Work — Our Cabinetry Process | Berco',
    description: 'A transparent cabinetry process: how Berco designs, makes and installs — and tells you the truth before anything is built.',
    images: [{ url: `${SITE}/img/custom-interiors-philippine-home.jpg`, alt: 'Berco custom interiors — design reference' }],
  },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How We Work — Our Cabinetry Process | Berco',
  url: `${SITE}/how-we-work`,
  description: 'How Berco designs, makes and installs custom cabinetry in the Philippines — a transparent, honest process.',
  about: { '@type': 'HomeAndConstructionBusiness', name: 'Berco', url: SITE, areaServed: { '@type': 'Country', name: 'Philippines' }, parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' } },
}

const STEPS = [
  { n: '01', t: 'Discovery & Vision', p: 'We start at your space, not a showroom. A site visit to measure properly — around bulkheads, uneven walls and real ceiling heights — and a conversation about how you cook, store and live. We are clear about scope and fees before design begins.' },
  { n: '02', t: 'Design Development', p: 'You see the layout in drawings and design references, with the real materials and hardware on the table — what each choice means for maintenance, durability and everyday use, not only how it looks. We revise until it is right before anything is ordered.' },
  { n: '03', t: 'Production & Crafting', p: 'Your cabinetry is cut and finished on shared European production lines — multi-layer plywood carcases with aluminium kickboards, quartz surfaces, PUR and laser-sealed edges, and calibrated soft-close hardware. Made to the drawings you approved, then checked before it leaves.' },
  { n: '04', t: 'Installation & Completion', p: 'One team installs: levelled, aligned, reveals kept consistent, hardware calibrated by hand. The site is cleaned, and everything is checked against our turnover standard before we hand it over.' },
]

export default function HowWeWork() {
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
        <div className="masthead"><span><a href="/" className="crumb">Berco</a> · How we work</span><span>Philippines</span></div>
        <span className="eyebrow">How we work</span>
        <h1>The process is the proof.</h1>
        <p className="lead">Berco is a new brand — we don&rsquo;t have a decade of photographed projects to point to. So instead of a slideshow, we show you exactly how your cabinetry is designed, made and installed, and we tell you the truth about your space before anything is built.</p>
      </div></section>

      <section className="prec band"><div className="shell">
        <div className="sh reveal"><h2>The honest part.</h2><span className="eyebrow">Our promise</span></div>
        <div className="pledge stag">
          <div className="col yes">
            <h3>What we&rsquo;ll always tell you</h3>
            <ul>
              <li>Realistic lead times, and what actually drives them.</li>
              <li>What a material or finish can and can&rsquo;t do.</li>
              <li>Where a layout won&rsquo;t work — before you pay for it.</li>
              <li>Design fees and project stages, explained up front.</li>
            </ul>
          </div>
          <div className="col no">
            <h3>What we won&rsquo;t do</h3>
            <ul>
              <li>Present a render as a finished project.</li>
              <li>Hide fees or timelines to keep you engaged.</li>
              <li>Promise a tolerance or result we can&rsquo;t stand behind.</li>
              <li>Borrow another brand&rsquo;s track record as our own.</li>
            </ul>
          </div>
        </div>
      </div></section>

      <section id="process" className="band"><div className="shell">
        <div className="sh reveal"><h2>From first visit to handover.</h2><span className="eyebrow">The four stages</span></div>
        <div className="proc stag">
          {STEPS.map((s) => (
            <div className="procstep" key={s.n}>
              <div className="pn">{s.n}</div>
              <div><h3>{s.t}</h3><p>{s.p}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>Checked before turnover.</h2><span className="eyebrow">The Berco standard</span></div>
        <p className="lead-txt reveal">Nothing is handed over until it clears the same check, every time.</p>
        <div className="chips reveal">
          <span className="chip">Leveling</span><span className="chip">Alignment</span><span className="chip">Reveal consistency</span>
          <span className="chip">Hardware calibration</span><span className="chip">Cleanliness</span><span className="chip">Final check</span>
        </div>
      </div></section>

      <section className="jbc band"><div className="shell in">
        <h2 className="reveal">The backing behind a new brand.</h2>
        <p className="reveal">Berco is a brand under JBC UNLTD CORP, operating in the Philippines since 2017 — with real experience coordinating, importing and installing premium home products. Offered as provenance, not as Berco&rsquo;s own cabinetry portfolio.</p>
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
            <a href="/collections/kitchens">Kitchens</a><a href="/collections/wardrobes">Wardrobes</a>
            <a href="/collections/living">Living &amp; Media</a><a href="/collections/bedrooms">Bedrooms</a>
            <a href="/collections/bathrooms">Bathrooms</a><a href="/collections/dining">Dining</a>
            <a href="/collections/interior-systems">Interior Systems</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
