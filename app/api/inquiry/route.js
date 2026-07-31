// Contact-form handler.
//
// Delivery goes through Resend's REST API over plain fetch — deliberately no npm
// dependency, so nothing new has to install at build time. Credentials live only in
// Vercel's environment (RESEND_API_KEY); they are never read into the repo.
//
// If the key is not set yet the route answers 503 with code 'not_configured' and the
// form falls back to a pre-filled mail composer. That matters more than it looks: a
// silent success on an unconfigured route would drop real inquiries on the floor.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TO = process.env.INQUIRY_TO || 'sales@bercohome.com'
const FROM = process.env.INQUIRY_FROM || 'Berco Website <onboarding@resend.dev>'

const PLANS = ['Kitchen', 'Wardrobe', 'Bathroom vanity', 'Living / TV wall', 'Dining',
  'Whole home', 'Interior systems', 'Not sure yet']
const WHENS = ['Within 3 months', '3–6 months', '6–12 months', 'Just exploring']

const clean = (v, max) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

function validate(b) {
  const f = {}
  const name = clean(b.name, 120)
  const email = clean(b.email, 200)
  const phone = clean(b.phone, 40)
  const location = clean(b.location, 120)
  const plan = clean(b.plan, 60)
  const when = clean(b.when, 60)
  const message = clean(b.message, 4000)

  if (name.length < 2) f.name = 'Please tell us your name.'
  // Email is optional: on a mobile-first audience it is the field people abandon on, and we
  // already require a mobile number, which is how Berco actually follows up. Validate only
  // if they chose to give one — permissive, to catch a typo rather than police addresses.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) f.email = 'Please check your email address.'
  if (phone.replace(/\D/g, '').length < 7) f.phone = 'Please enter a number we can reach you on.'
  if (!PLANS.includes(plan)) f.plan = 'Please choose what you are planning.'
  if (!WHENS.includes(when)) f.when = 'Please choose a timeline.'

  return { fields: { name, email, phone, location, plan, when, message }, errors: f }
}

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'Could not read that submission.' }, { status: 400 })
  }

  // Honeypot: a field no human sees. Bots fill it. Answer 200 so they stop retrying.
  if (clean(body.company, 200)) return Response.json({ ok: true })

  const { fields, errors } = validate(body)
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    return Response.json(
      { ok: false, code: 'not_configured', error: 'The form is not connected yet.' },
      { status: 503 }
    )
  }

  const row = (k, v) =>
    v ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6257;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>` : ''

  const html = `<div style="font-family:system-ui,sans-serif;color:#2B2620;line-height:1.5">
    <p style="margin:0 0 14px"><strong>New inquiry from bercohome.com</strong></p>
    <table style="border-collapse:collapse;font-size:14px">
      ${row('Name', fields.name)}${row('Email', fields.email)}${row('Mobile', fields.phone)}
      ${row('Location', fields.location)}${row('Planning', fields.plan)}${row('Timeline', fields.when)}
    </table>
    ${fields.message ? `<p style="margin:18px 0 6px;color:#6b6257;font-size:14px">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${esc(fields.message)}</p>` : ''}
  </div>`

  const text = [
    `New inquiry from bercohome.com`, ``,
    `Name:     ${fields.name}`, `Email:    ${fields.email}`, `Mobile:   ${fields.phone}`,
    fields.location ? `Location: ${fields.location}` : '',
    `Planning: ${fields.plan}`, `Timeline: ${fields.when}`, ``,
    fields.message ? `Message:\n${fields.message}` : '(no message)',
  ].filter(Boolean).join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        ...(fields.email ? { reply_to: fields.email } : {}),
        subject: `Inquiry — ${fields.plan}, ${fields.when} — ${fields.name}`,
        html,
        text,
      }),
    })
    if (!res.ok) {
      // Log the status only. The body can echo the payload, and that is a lead's contact details.
      console.error('inquiry: resend responded', res.status)
      return Response.json({ ok: false, code: 'send_failed', error: 'We could not send that just now.' }, { status: 502 })
    }
  } catch (e) {
    console.error('inquiry: send threw', e && e.name)
    return Response.json({ ok: false, code: 'send_failed', error: 'We could not send that just now.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
