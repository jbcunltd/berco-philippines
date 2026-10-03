'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Cookie choice + the trackers it gates.
//
// HOW THIS IS BUILT (changed 2026-10-03)
//
// 1. Google Consent Mode v2 defaults are set in the page HTML itself, in
//    app/layout.js, before any tag is requested. All four signals start DENIED:
//    analytics_storage, ad_storage, ad_user_data, ad_personalization. That is why
//    a visitor who has answered nothing carries no _ga and no _fbp.
// 2. Google Analytics loads for everyone, but under those denied defaults it sets
//    no cookie and identifies nobody; it sends cookieless pings Google uses to
//    model the gap. Accepting sends a consent UPDATE and real measurement starts.
// 3. The Meta pixel is NOT injected until the visitor accepts. Meta has no
//    equivalent of consent mode, so there is no denied state to load it in: it
//    either sets _fbp or it is not on the page.
// 4. Declining keeps everything denied and clears any _ga/_fbp already there.
//
// WHAT CHANGED, AND WHAT IT COSTS. Before this, trackers loaded for everyone who
// had not explicitly declined (an opt-out gate, set 2026-08-25 because an opt-in
// gate silences the pixel for every visitor who ignores the banner, which is most
// ad click-throughs). The pixel is now opt-in again, so the retargeting audience,
// landing-page-view optimisation and the form's Lead event only see visitors who
// pressed Accept. That is a real trade and it is Jumbo's call to keep or reverse;
// the change was made to stop cookies being set before the banner is answered.
//
// Both tags load with strategy="lazyOnload", after the page has finished. On a
// 3x phone over slow 4G, gtag.js (174 KB) and fbevents.js (110 KB) used to start
// downloading at ~2.2 s, which is exactly while the hero photo is still arriving.
// Nothing here needs to run before the page is painted.
//
// The banner and the scripts still live together on purpose. If they were
// separate, nothing would stop a later edit from loading a tracker outside the
// gate - the banner would still appear and quietly be a lie. Keeping them in
// one file means you cannot add a cookie-setting tool here without seeing the
// condition it has to sit behind.
//
// Vercel Web Analytics is deliberately NOT here: it sets no cookies and does not
// identify anyone, so it runs regardless and needs no consent. It stays in layout.
//
// The pixel ID must match the source pixel of the "Berco - All Website Visitors
// (180d)" audience (120251893973480418). If they drift, the audience fills with
// nothing and the failure is invisible until a campaign fails to deliver.

const KEY = 'berco-consent'
export const GA_ID = 'G-RQPHPK53ZP'
const FB_PIXEL_ID = '1096315622827696'

// Declining has to remove cookies that are already there, not just stop new ones.
// Anyone who visited before this gate existed - or who accepts and later clears
// their choice - is still carrying _ga / _fbp. Without this, "Decline" would be
// true only for first-time visitors and quietly meaningless for everyone else.
// Cookies are cleared on both the bare host and the dot-prefixed domain because
// Google and Meta set them on the latter; expiring only one leaves the other.
function clearTrackingCookies() {
  try {
    const doomed = /^(_ga|_gid|_gat|_fbp|_fbc)/
    const hosts = [location.hostname, '.' + location.hostname, '.' + location.hostname.replace(/^www\./, '')]
    for (const raw of document.cookie.split(';')) {
      const name = raw.split('=')[0].trim()
      if (!doomed.test(name)) continue
      for (const d of hosts) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    }
  } catch { /* clearing is best-effort; the gate above is what actually matters */ }
}

// gtag() is defined by the defaults block in layout.js, which is in the HTML, so
// it exists before any React code runs. Guarded anyway: a blocked inline script
// should cost us a measurement signal, not a broken page.
function consent(state) {
  try {
    if (typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
      ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state,
    })
  } catch { /* nothing to do */ }
}

export default function Consent() {
  // undefined = not read yet. The server renders nothing and the first client
  // paint renders nothing, so there is no hydration mismatch and no flash of a
  // banner for someone who already answered.
  const [choice, setChoice] = useState(undefined)

  useEffect(() => {
    let stored = null
    try { stored = localStorage.getItem(KEY) } catch { /* private mode: ask again */ }
    const value = stored === 'granted' || stored === 'declined' ? stored : null
    setChoice(value)
    if (value === 'granted') consent('granted')
  }, [])

  function decide(value) {
    try { localStorage.setItem(KEY, value) } catch { /* choice holds for this page at least */ }
    if (value === 'declined') clearTrackingCookies()
    consent(value === 'granted' ? 'granted' : 'denied')
    setChoice(value)
  }

  return (
    <>
      {/* GA4 runs for everyone, under the denied defaults set in layout.js. It
          writes no cookie and names nobody until consent is updated to granted. */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />

      {/* The Meta pixel has no denied state. It is not on the page until Accept. */}
      {choice === 'granted' && (
        <Script id="fb-pixel" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html:
          `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
          `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;` +
          `n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;` +
          `t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}` +
          `(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');` +
          `fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');` }} />
      )}

      {choice === null && (
        <div className="consent" role="region" aria-label="Cookie choice">
          <p className="consent-txt">
            We use cookies to measure how this site is used and to show our ads to people who
            visited. Nothing is set until you accept. <a href="/privacy-policy">Privacy</a>
          </p>
          <div className="consent-acts">
            <button type="button" className="consent-no" onClick={() => decide('declined')}>Decline</button>
            <button type="button" className="consent-yes" onClick={() => decide('granted')}>Accept</button>
          </div>
        </div>
      )}
    </>
  )
}
