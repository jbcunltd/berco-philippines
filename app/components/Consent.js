'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Cookie choice + the trackers it gates.
//
// HOW THIS IS BUILT (Google opt-in, Meta opt-out. Set 2026-10-03, second pass.)
//
// The two tags are deliberately NOT treated the same, because they are not the
// same kind of thing to this business and they do not have the same mechanics.
//
// GOOGLE, OPT-IN. Consent Mode v2 defaults are set in the page HTML itself, in
//   app/layout.js, before any tag is requested. All four signals start DENIED:
//   analytics_storage, ad_storage, ad_user_data, ad_personalization. gtag.js
//   loads for everyone but under denied defaults it sets no cookie and
//   identifies nobody; it sends cookieless pings Google uses to model the gap.
//   Accepting sends a consent UPDATE and real measurement starts. This is what
//   the first pass of 2026-10-03 built and it stays exactly as it was.
//
// META, OPT-OUT. The pixel is injected on arrival for every visitor who has not
//   declined, and a Decline takes it back out and clears its cookies. This is
//   the deliberate decision of 2026-08-25, restored by the owner on 2026-10-03
//   after the first pass of that day had made it opt-in. The reason is specific
//   and measured, not a preference: most ad click-throughs never touch the
//   banner at all, so an opt-in gate does not "reduce" Meta measurement, it
//   starves it. The retargeting audience stops filling, landing-page-view
//   optimisation loses its signal, the form's Lead event fires for a fraction
//   of real leads, and cost-per-message - the number every Berco budget
//   decision is read off - becomes unreadable.
//
//   Meta has no consent-mode equivalent, so there is no denied state to load the
//   pixel in. It either sets _fbp or it is not on the page. That is why this is
//   an injection decision rather than a signal, and why Decline has to actively
//   undo it: see disableMetaPixel below.
//
// ⚠️ Do not "tidy" this into one rule for both tags. The asymmetry IS the
//    decision. If it is ever reversed again, reverse the privacy policy in the
//    same commit - app/policies/data.js says what this file does, in plain
//    words, and a policy that describes code that no longer exists is worse
//    than no policy.
//
// Both tags load with strategy="lazyOnload", after the page has finished. On a
// 3x phone over slow 4G, gtag.js (174 KB) and fbevents.js (110 KB) would
// otherwise start downloading at ~2.2 s, which is exactly while the hero photo
// is still arriving, and all four page types sit under a 2.5 s gate. Nothing
// here needs to run before the page is painted. "On arrival" means no
// interaction is required, not before the pixels of the page.
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
// Under the opt-out pixel this is the ordinary case rather than the edge case:
// every declining visitor is carrying an _fbp by the time they press the button.
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

// Taking a tag that has ALREADY RUN back off the page is not the same job as
// not loading it. Un-rendering the <Script> does nothing: fbevents.js is in the
// JS heap, window.fbq is its real queue function, and the next fbq() call would
// send a request and re-create _fbp. So Decline does four things:
//
//   1. replaces window.fbq (and _fbq) with a no-op, so every later call -
//      including the form's Lead event - goes nowhere. It stays a FUNCTION on
//      purpose: InquiryForm optional-chains it, and a page that throws on a
//      declined visitor would be a worse outcome than a missed event.
//   2. marks it .disabled so this state is checkable from the console and in
//      a verification run, rather than having to prove absence.
//   3. removes the fbevents.js script element, so a later re-render or a
//      bfcache restore does not find a live tag already attached.
//   4. clears _fbp / _fbc, after the no-op is in place. Order matters: clearing
//      first would leave a live fbq free to write the cookie straight back.
function disableMetaPixel() {
  try {
    const noop = function () {}
    noop.queue = []
    noop.loaded = true
    noop.version = '2.0'
    noop.disabled = true
    window.fbq = noop
    window._fbq = noop
    document.querySelectorAll('script[src*="connect.facebook.net"]').forEach((s) => s.remove())
  } catch { /* best effort; the cookie clear below is the part that is visible */ }
  clearTrackingCookies()
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
  // Separate from `choice` because the pixel is NOT a function of the banner
  // answer. It runs for "not answered" and for "accepted", and only a stored
  // decline keeps it off. Starting false and turning it on in the effect means
  // a returning decliner never gets it injected even for one render.
  const [pixel, setPixel] = useState(false)

  useEffect(() => {
    let stored = null
    try { stored = localStorage.getItem(KEY) } catch { /* private mode: ask again */ }
    const value = stored === 'granted' || stored === 'declined' ? stored : null
    setChoice(value)
    if (value === 'granted') consent('granted')
    if (value === 'declined') { disableMetaPixel(); return }
    setPixel(true)
  }, [])

  function decide(value) {
    try { localStorage.setItem(KEY, value) } catch { /* choice holds for this page at least */ }
    if (value === 'declined') { setPixel(false); disableMetaPixel() }
    consent(value === 'granted' ? 'granted' : 'denied')
    setChoice(value)
  }

  return (
    <>
      {/* GA4 runs for everyone, under the denied defaults set in layout.js. It
          writes no cookie and names nobody until consent is updated to granted. */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />

      {/* The Meta pixel runs on arrival unless this visitor has declined. */}
      {pixel && (
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
          {/* This sentence has to match the code above. It previously said
              "Nothing is set until you accept", which is now false: the Meta
              pixel sets a cookie on arrival. Saying so is the point of a banner.

              Cut from 39 words to 21 on 2026-10-03. At 375x812 the sheet ran to
              four lines and 291px tall, which covered the entire hero headline
              on arrival, so the first thing a phone visitor saw was an
              unlabelled photograph. This paragraph is also an LCP candidate at
              about 2.1s, competing with the hero photo for the same moment, so
              the shorter it is the less it costs. Nothing true was dropped: it
              still says the advertising cookie is already set and that Decline
              removes it. */}
          <p className="consent-txt">
            We measure this site and show our ads to past visitors. The advertising cookie is
            already set, and Decline removes it. <a href="/privacy-policy">Privacy</a>
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
