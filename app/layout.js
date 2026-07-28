import './globals.css'
import { Libre_Bodoni, Jost } from 'next/font/google'

const serif = Libre_Bodoni({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' })
const sans = Jost({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })

export const metadata = {
  title: 'Berco — The Heart of Your Home',
  description: 'Berco — custom cabinetry and interiors for Philippine homes. Designed, measured, and installed properly. We guide before we sell.',
  openGraph: { title: 'Berco — The Heart of Your Home', description: 'Custom cabinetry and interiors. We guide before we sell.', type: 'website' },
  icons: { icon: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 fill=%27%23FDFBF7%27/%3E%3Ctext x=%2716%27 y=%2723%27 font-family=%27Georgia,serif%27 font-size=%2722%27 text-anchor=%27middle%27 fill=%27%232B2620%27%3EB%3C/text%3E%3C/svg%3E' },
}

const reveal = "(function(){var r=window.matchMedia('(prefers-reduced-motion:reduce)').matches;if(r){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});return;}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.14});document.querySelectorAll('.reveal').forEach(function(e){io.observe(e)});})();"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="wrap">{children}</div>
        <script dangerouslySetInnerHTML={{ __html: reveal }} />
      </body>
    </html>
  )
}
