import './globals.css'
import { Libre_Bodoni, Jost } from 'next/font/google'

const serif = Libre_Bodoni({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' })
const sans = Jost({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })

const SITE = 'https://berco-philippines.vercel.app'
const HERO = SITE + '/img/custom-kitchen-cabinetry-philippines.jpg'

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Custom Cabinetry & Interiors in the Philippines | Berco',
  description: 'Custom cabinetry, kitchens, wardrobes & vanities for Philippine homes — designed, measured, and installed properly, with an honest process before you commit.',
  keywords: ['custom cabinetry Philippines', 'custom kitchen cabinets Philippines', 'kitchen cabinet maker Philippines', 'walk-in wardrobe Philippines', 'built-in storage Philippines', 'custom interiors Philippines', 'Berco'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', url: SITE, siteName: 'Berco',
    title: 'Custom Cabinetry & Interiors in the Philippines | Berco',
    description: 'Custom cabinetry, kitchens, wardrobes & vanities for Philippine homes — designed, measured, and installed properly. We guide before we sell.',
    images: [{ url: HERO, width: 1760, height: 1087, alt: 'Custom kitchen cabinetry in a Philippine home — Berco' }],
  },
  twitter: { card: 'summary_large_image', title: 'Custom Cabinetry & Interiors in the Philippines | Berco', description: 'Custom kitchens, wardrobes & interiors for Philippine homes. We guide before we sell.', images: [HERO] },
  robots: { index: true, follow: true },
  icons: { icon: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 fill=%27%23FDFBF7%27/%3E%3Ctext x=%2716%27 y=%2723%27 font-family=%27Georgia,serif%27 font-size=%2722%27 text-anchor=%27middle%27 fill=%27%232B2620%27%3EB%3C/text%3E%3C/svg%3E' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Berco',
  description: 'Custom cabinetry and interiors — kitchens, wardrobes, vanities, living-room and built-in storage — for Philippine homes.',
  url: SITE,
  image: HERO,
  email: 'sales@bercohome.com',
  telephone: '+639178000730',
  areaServed: { '@type': 'Country', name: 'Philippines' },
  parentOrganization: { '@type': 'Organization', name: 'JBC UNLTD CORP', foundingDate: '2017' },
  slogan: 'The Heart of Your Home.',
  knowsAbout: ['Custom kitchen cabinetry', 'Wardrobes and closets', 'Bathroom vanities', 'Living-room and media cabinetry', 'Built-in storage', 'Dining storage'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom kitchen cabinetry' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Walk-in wardrobes and closets' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom vanities' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Built-in storage and interiors' } },
  ],
}

const reveal = "(function(){var r=window.matchMedia('(prefers-reduced-motion:reduce)').matches;if(r){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});return;}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.14});document.querySelectorAll('.reveal').forEach(function(e){io.observe(e)});})();"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="wrap">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script dangerouslySetInnerHTML={{ __html: reveal }} />
      </body>
    </html>
  )
}
