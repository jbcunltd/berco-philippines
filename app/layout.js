import './globals.css'
import { Libre_Bodoni, Jost } from 'next/font/google'
// Vercel Web Analytics. Cookieless - it is the half of the measurement stack
// that needs no consent banner. Flipping the toggle in the Vercel dashboard is
// not enough on Next.js: without this component the dashboard stays at zero.
import { Analytics } from '@vercel/analytics/next'
import Consent from './components/Consent'

const serif = Libre_Bodoni({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' })
const sans = Jost({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })

const SITE = 'https://www.bercohome.com'
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
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

const reveal = "(function(){var R=window.matchMedia('(prefers-reduced-motion:reduce)').matches;var nav=document.querySelector('nav');function ns(){if(nav){if(window.scrollY>12){nav.classList.add('shrunk')}else{nav.classList.remove('shrunk')}}}ns();window.addEventListener('scroll',ns,{passive:true});var tg=document.querySelector('.navtoggle');if(tg&&nav){tg.addEventListener('click',function(){var o=nav.classList.toggle('open');tg.setAttribute('aria-expanded',o?'true':'false');});Array.prototype.forEach.call(nav.querySelectorAll('.navlinks a'),function(a){a.addEventListener('click',function(){nav.classList.remove('open');tg.setAttribute('aria-expanded','false');});});}var els=document.querySelectorAll('.reveal,.stag');if(R){els.forEach(function(e){e.classList.add('in')});return;}var TALL=function(e){return e.getBoundingClientRect().height>window.innerHeight*0.9};var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:0.01,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){if(TALL(e)){e.classList.add('in');}else{io.observe(e);}});var pars=[].slice.call(document.querySelectorAll('.cover-img,.feature-img'));var vh=window.innerHeight,tick=false;function par(){tick=false;pars.forEach(function(el){var host=el.parentElement,r=host.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var prog=(r.top+r.height)/(vh+r.height);var shift=(prog-0.5)*2*(0.014*r.height);el.style.transform='translate3d(0,'+shift.toFixed(1)+'px,0)';});}function onScroll(){if(!tick){tick=true;requestAnimationFrame(par);}}window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',function(){vh=window.innerHeight;par();},{passive:true});par();var vw=document.querySelector('[data-views]');if(vw){var mainImg=document.getElementById('refmain');var thumbs=vw.querySelectorAll('.viewthumb');thumbs.forEach(function(b){b.addEventListener('click',function(){var s=b.getAttribute('data-view');if(!s||!mainImg)return;mainImg.src=s;for(var i=0;i<thumbs.length;i++){thumbs[i].setAttribute('aria-current',thumbs[i]===b?'true':'false');}});});}document.querySelectorAll('[data-carousel]').forEach(function(car){var tr=car.querySelector('.pcar-track');var sl=car.querySelectorAll('.pslide');var dt=car.querySelectorAll('.pcar-dots span');var pv=car.querySelector('.prev');var nx=car.querySelector('.next');function st(){return sl[0]?sl[0].getBoundingClientRect().width+16:300;}if(pv)pv.addEventListener('click',function(){tr.scrollBy({left:-st(),behavior:'smooth'});});if(nx)nx.addEventListener('click',function(){tr.scrollBy({left:st(),behavior:'smooth'});});function up(){var mx=tr.scrollWidth-tr.clientWidth;var i=mx>2?Math.round(tr.scrollLeft/mx*(dt.length-1)):0;if(i<0)i=0;if(i>dt.length-1)i=dt.length-1;for(var j=0;j<dt.length;j++){dt[j].classList.toggle('on',j===i);}}tr.addEventListener('scroll',function(){requestAnimationFrame(up);},{passive:true});up();});})();"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* Without JS the reveal observer never runs, so every .reveal/.stag would
            stay at opacity 0 and the page would render blank. Undo it up front. */}
        <noscript><style dangerouslySetInnerHTML={{ __html:
          '.reveal,.stag,.stag>*{opacity:1!important;transform:none!important;transition:none!important}' }} /></noscript>
        <div className="wrap">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script dangerouslySetInnerHTML={{ __html: reveal }} />
        <Analytics />
        <Consent />
      </body>
    </html>
  )
}
