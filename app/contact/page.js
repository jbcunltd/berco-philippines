import { CATS, ORDER } from '../collections/data'
import InquiryForm from '../components/InquiryForm'

const SITE = 'https://berco-philippines.vercel.app'

export const metadata = {
  title: 'Contact Berco | Custom Cabinetry Inquiries, Philippines',
  description:
    'Send a cabinetry inquiry to Berco. Tell us the room, the timeline and what is not working now — we reply within one working day.',
  keywords: ['contact Berco', 'cabinetry inquiry Philippines', 'custom kitchen quote Cebu', 'book a design consultation'],
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: `${SITE}/contact`,
    siteName: 'Berco',
    title: 'Contact Berco | Custom Cabinetry Inquiries',
    description: 'Tell us about your space. We reply within one working day.',
    images: [{ url: `${SITE}/img/custom-kitchen-cabinetry-philippines.jpg`, alt: 'Berco custom cabinetry' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact Berco', description: 'Tell us about your space. We reply within one working day.' },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Berco',
  url: `${SITE}/contact`,
  mainEntity: {
    '@type': 'HomeAndConstructionBusiness',
    name: 'Berco',
    url: SITE,
    email: 'sales@bercohome.com',
    telephone: '+639178000730',
    areaServed: { '@type': 'Country', name: 'Philippines' },
    parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@bercohome.com',
      telephone: '+639178000730',
      availableLanguage: ['en', 'fil'],
    },
  },
}

export default function Contact() {
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

      <section className="band contact-top"><div className="shell">
        <div className="masthead"><span>Contact</span><span>Philippines</span></div>
        <div className="contact-head">
          <span className="eyebrow">Start here</span>
          <h1>Tell us about your space.</h1>
          <p className="lead">A few details are enough to begin. We will come back within one working
            day with the next step — no obligation, and no pressure to decide anything yet.</p>
        </div>
      </div></section>

      <section className="band"><div className="shell contact-grid">
        <div className="contact-form">
          <noscript>
            <div className="formfail">
              <p><strong>This form needs JavaScript.</strong> Email us instead and we will pick it up the same way.</p>
              <a className="btn" href="mailto:sales@bercohome.com?subject=Cabinetry%20inquiry">Email sales@bercohome.com →</a>
            </div>
          </noscript>
          <InquiryForm />
        </div>

        <aside className="contact-side">
          <div className="cside">
            <h2>Reach us directly</h2>
            <p className="cside-item">
              <span className="cside-k">Email</span>
              <a href="mailto:sales@bercohome.com">sales@bercohome.com</a>
            </p>
            <p className="cside-item">
              <span className="cside-k">Mobile</span>
              <a href="tel:+639178000730">0917 800 0730</a>
            </p>
            <p className="cside-item">
              <span className="cside-k">Hours</span>
              <span>Monday to Saturday, 9am – 6pm PHT</span>
            </p>
            <p className="cside-item">
              <span className="cside-k">Company</span>
              <span>Berco, a brand under JBC UNLTD CORP — Philippines, established 2017</span>
            </p>
          </div>

          <div className="cside">
            <h2>What happens next</h2>
            <ol className="cside-steps">
              <li><strong>We reply.</strong> One working day, usually sooner, from a designer rather than an auto-responder.</li>
              <li><strong>We talk through the space.</strong> Room, layout, how you actually use it, what your budget needs to cover.</li>
              <li><strong>We visit and measure.</strong> Nothing is quoted off a guess.</li>
              <li><strong>You get a design and a written quotation</strong> within 7 working days of an agreed scope.</li>
            </ol>
            <p className="cside-note">A design engagement fee secures the design phase, and it is deductible
              from the project. We will tell you what it is before you commit to anything.</p>
          </div>

          <div className="cside">
            <h2>Working with a designer or architect?</h2>
            <p className="cside-body">There is a separate route for trade specification, with drawings,
              material schedules and lead times.</p>
            <a className="link" href="/for-designers">For designers →</a>
          </div>
        </aside>
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
            {ORDER.map((s) => <a href={`/collections/${s}`} key={s}>{CATS[s].name}</a>)}
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
