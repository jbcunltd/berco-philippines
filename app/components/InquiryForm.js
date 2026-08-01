'use client'

import { useRef, useState } from 'react'

const PLANS = ['Kitchen', 'Wardrobe', 'Bathroom vanity', 'Living / TV wall', 'Dining',
  'Whole home', 'Interior systems', 'Not sure yet']
const WHENS = ['Within 3 months', '3–6 months', '6–12 months', 'Just exploring']

const EMPTY = { name: '', email: '', phone: '', location: '', plan: '', when: '', message: '', company: '' }

// If the route cannot send, we hand the visitor a mail composer already filled in with
// everything they typed. A lead that took two minutes to write should never be lost to
// an outage or a missing key.
function composeFallback(v) {
  const body = [
    `Name: ${v.name}`, `Email: ${v.email}`, `Mobile: ${v.phone}`,
    v.location && `Location: ${v.location}`,
    `Planning: ${v.plan}`, `Timeline: ${v.when}`,
    '', v.message || '',
  ].filter((l) => l !== undefined && l !== false).join('\n')
  return `mailto:sales@bercohome.com?subject=${encodeURIComponent(`Inquiry — ${v.plan || 'Cabinetry'} — ${v.name}`)}&body=${encodeURIComponent(body)}`
}

export default function InquiryForm() {
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [failMsg, setFailMsg] = useState('')
  const doneRef = useRef(null)
  const alertRef = useRef(null)

  const set = (k) => (e) => {
    setV((p) => ({ ...p, [k]: e.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  async function submit(e) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    setErrors({})
    setFailMsg('')

    let res
    try {
      res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      })
    } catch {
      setState('failed')
      setFailMsg('We could not reach the server.')
      requestAnimationFrame(() => alertRef.current && alertRef.current.focus())
      return
    }

    let data = {}
    try { data = await res.json() } catch { /* keep the status-based path below */ }

    if (res.ok && data.ok) {
      setState('sent')
      // Meta Lead event - fired only on a confirmed send, never on submit-click,
      // so the pixel counts real inquiries rather than attempts. Optional-chained
      // because an ad blocker (or the pixel simply not loading) must never break
      // the form: capturing the lead matters more than measuring it.
      window.fbq?.('track', 'Lead')
      requestAnimationFrame(() => doneRef.current && doneRef.current.focus())
      return
    }

    if (res.status === 422 && data.errors) {
      setErrors(data.errors)
      setState('idle')
      const first = document.querySelector('.fld [aria-invalid="true"]')
      if (first) first.focus()
      return
    }

    setState('failed')
    setFailMsg(data.error || 'Something went wrong at our end.')
    requestAnimationFrame(() => alertRef.current && alertRef.current.focus())
  }

  if (state === 'sent') {
    return (
      <div className="formdone" ref={doneRef} tabIndex={-1} role="status">
        <span className="eyebrow">Received</span>
        <h2>Thank you, {v.name.split(' ')[0] || 'and welcome'}.</h2>
        <p>Your inquiry is with our design team. Someone will reply within one working day — usually
          sooner. If it is urgent, call <a href="tel:+639178000730">0917 800 0730</a>.</p>
        <p className="formnext">While you wait, the <a href="/catalogues/2026-catalogue">2026 catalogue</a> shows
          the range, and <a href="/how-we-work">how we work</a> walks through what happens next.</p>
      </div>
    )
  }

  const field = (k) => ({
    id: k,
    name: k,
    value: v[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-err` : undefined,
  })

  const Err = ({ k }) => errors[k]
    ? <span className="fld-err" id={`${k}-err`}>{errors[k]}</span>
    : null

  return (
    <form className="iform" onSubmit={submit} noValidate>
      {state === 'failed' && (
        <div className="formfail" role="alert" tabIndex={-1} ref={alertRef}>
          <p><strong>{failMsg}</strong> Nothing you typed is lost — send it as an email instead
            and it will arrive the same way.</p>
          <a className="btn" href={composeFallback(v)}>Send this as an email →</a>
          <p className="formfail-alt">Or message us on <a href="https://m.me/bercophilippines" rel="noopener">Facebook</a>,
            or call <a href="tel:+639178000730">0917 800 0730</a>.</p>
        </div>
      )}

      {/* Four fields to send, two of them a single tap. This audience is ~90% mobile, so
          anything that is not needed to call someone back sits behind the disclosure
          below rather than in front of them. */}
      <div className="fldrow">
        <p className="fld">
          <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
          <input type="text" autoComplete="name" required {...field('name')} />
          <Err k="name" />
        </p>
        <p className="fld">
          <label htmlFor="phone">Mobile <span aria-hidden="true">*</span></label>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="0917 000 0000" required {...field('phone')} />
          <Err k="phone" />
        </p>
      </div>

      <div className="fldrow">
        <p className="fld">
          <label htmlFor="plan">What are you planning? <span aria-hidden="true">*</span></label>
          <select required {...field('plan')}>
            <option value="">Choose one</option>
            {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <Err k="plan" />
        </p>
        <p className="fld">
          <label htmlFor="when">When do you need it? <span aria-hidden="true">*</span></label>
          <select required {...field('when')}>
            <option value="">Choose one</option>
            {WHENS.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
          <Err k="when" />
        </p>
      </div>

      <details className="fldmore">
        <summary>Add an email or a few details <span className="opt">Optional</span></summary>
        <div className="fldmore-in">
          <div className="fldrow">
            <p className="fld">
              <label htmlFor="email">Email</label>
              <input type="email" autoComplete="email" {...field('email')} />
              <Err k="email" />
            </p>
            <p className="fld">
              <label htmlFor="location">Where is the project?</label>
              <input type="text" autoComplete="address-level2" placeholder="Cebu City" {...field('location')} />
            </p>
          </div>
          <p className="fld">
            <label htmlFor="message">Tell us about the space</label>
            <textarea rows={4} placeholder="The room, roughly how big, what is not working about it now — anything that helps us prepare." {...field('message')} />
          </p>
        </div>
      </details>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <p className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off"
          value={v.company} onChange={set('company')} />
      </p>

      <div className="formacts">
        <button className="btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send inquiry →'}
        </button>
        <p className="formnote">We reply within one working day. Your details are used to answer
          this inquiry and nothing else — we do not sell or share them.</p>
      </div>
    </form>
  )
}
