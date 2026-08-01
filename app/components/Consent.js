'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Cookie choice + the trackers it gates.
//
// The two live together on purpose. If the banner and the scripts were separate,
// nothing would stop a later edit from loading a tracker outside the gate - the
// banner would still appear, still say "only if you accept", and quietly be a lie.
// Keeping them in one file means you cannot add a cookie-setting tool here
// without seeing the condition it has to sit behind.
//
// Vercel Web Analytics is deliberately NOT here: it sets no cookies and does not
// identify anyone, so it runs regardless and needs no consent. It stays in layout.
//
// The pixel ID must match the source pixel of the "Berco - All Website Visitors
// (180d)" audience (120251893973480418). If they drift, the audience fills with
// nothing and the failure is invisible until a campaign fails to deliver.

const KEY = 'berco-consent'
const GA_ID = 'G-RQPHPK53ZP'
const FB_PIXEL_ID = '1096315622827696'

export default function Consent() {
  // undefined = not read yet. The server renders nothing and the first client
  // paint renders nothing, so there is no hydration mismatch and no flash of a
  // banner for someone who already answered.
  const [choice, setChoice] = useState(undefined)

  useEffect(() => {
    let stored = null
    try { stored = localStorage.getItem(KEY) } catch { /* private mode: ask again */ }
    setChoice(stored === 'granted' || stored === 'declined' ? stored : null)
  }, [])

  function decide(value) {
    try { localStorage.setItem(KEY, value) } catch { /* choice holds for this page at least */ }
    setChoice(value)
  }

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
            `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
            `gtag('js',new Date());gtag('config','${GA_ID}');` }} />
          <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
            `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
            `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;` +
            `n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;` +
            `t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}` +
            `(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');` +
            `fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');` }} />
        </>
      )}

      {choice === null && (
        <div className="consent" role="region" aria-label="Cookie choice">
          <p className="consent-txt">
            We use cookies to measure how this site is used and to show our ads to people who
            visited. <a href="/privacy-policy">Privacy</a>
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
