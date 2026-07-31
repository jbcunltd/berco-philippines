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
    sameAs: ['https://www.facebook.com/bercophilippines'],
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
            {/* Messenger is where Berco's conversations actually happen — the inbox carries
                hundreds of them against zero from the website. It goes first, and it keeps
                the Facebook mark so the channel is recognisable without a saturated blue
                slab landing in a cream page. */}
            <a className="fbbtn" href="https://m.me/bercophilippines" target="_blank" rel="noopener noreferrer">
              <svg className="fbmark" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" focusable="false">
                <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"/>
              </svg>
              <span>Message us on Facebook</span>
            </a>
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
            {/* "Where are you located?" was the third most-asked question in the Berco inbox
                and the site had no answer anywhere. These are offices with a product
                showcase — never described as showrooms. */}
            <h2>Where we are</h2>
            <p className="cside-item">
              <span className="cside-k">Metro Manila</span>
              <span>Mandaluyong — office and product showcase</span>
            </p>
            <p className="cside-item">
              <span className="cside-k">Visayas</span>
              <span>Cebu — office and product showcase</span>
            </p>
            <p className="cside-note">You are welcome to come and see the materials, hardware and
              finishes in person. Visits are by appointment so a designer is free to walk you
              through it — tell us above which is easier for you and we will send the address
              with a time.</p>
          </div>

        </aside>
      </div></section>

      {/* These two used to sit in the sidebar, which made it ~700px taller than the form and
          left the left column dead-ending into empty space on desktop. As a full-width band
          the four steps get the room to read as the sequence they actually are. */}
      <section className="band"><div className="shell">
        <div className="sh reveal"><h2>What happens next.</h2><span className="eyebrow">After you send</span></div>
        <ol className="nextgrid stag">
          <li><span className="nextnum">01</span><h3>We reply</h3>
            <p>Within one working day, usually sooner, from a designer rather than an auto-responder.</p></li>
          <li><span className="nextnum">02</span><h3>We talk through the space</h3>
            <p>The room, the layout, how you actually use it, and what your budget needs to cover.</p></li>
          <li><span className="nextnum">03</span><h3>We visit and measure</h3>
            <p>Nothing is quoted off a guess. We come to the space and take it down properly.</p></li>
          <li><span className="nextnum">04</span><h3>You get a design and a quotation</h3>
            <p>In writing, within 7 working days of an agreed scope.</p></li>
        </ol>
        <p className="nextnote reveal">A design engagement fee secures the design phase, and it is deductible
          from the project. We will tell you what it is before you commit to anything.</p>
      </div></section>

      <section className="band"><div className="shell tradeband reveal">
        <div className="tradeband-txt">
          <span className="eyebrow">Trade</span>
          <h2>Working with a designer or architect?</h2>
          <p>There is a separate route for trade specification — drawings, material schedules and lead times.</p>
        </div>
        <a className="btn" href="/for-designers">For designers →</a>
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
