// Jumbo's private answers board: the questions Claude needs answered, and the
// decisions Claude has locked from those answers. Data lives in Supabase
// (jbc-ops), schema berco_answers, reached through a dedicated login role that
// can only SELECT the table and UPDATE three columns. No other table is visible
// to it, so a leaked env var exposes this board and nothing else.
//
// The key travels in a request header, never in the URL: the page reads it from
// the #fragment, which browsers do not send to servers or analytics.
// 96-bit random key, compared in constant time.
import postgres from 'postgres'
import { timingSafeEqual } from 'node:crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KEY = process.env.BERCO_ANSWERS_KEY
const DB = process.env.BERCO_ANSWERS_DB_URL
let sql
const db = () => (sql ||= postgres(DB, { prepare: false, max: 1, ssl: 'require', idle_timeout: 5 }))

function authorised(req) {
  const got = Buffer.from(req.headers.get('x-answers-key') || '')
  const want = Buffer.from(KEY || '')
  return want.length > 0 && got.length === want.length && timingSafeEqual(got, want)
}
const deny = () => Response.json({ error: 'not_found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } })

export async function GET(req) {
  if (!KEY || !DB) return Response.json({ error: 'not_configured' }, { status: 503 })
  if (!authorised(req)) return deny()
  const rows = await db()`select id, section, ord, question, context, answer, answered_at, locked, locked_at, status
                          from berco_answers.items order by ord`
  return Response.json({ items: rows }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req) {
  if (!KEY || !DB) return Response.json({ error: 'not_configured' }, { status: 503 })
  if (!authorised(req)) return deny()
  let b
  try { b = await req.json() } catch { return Response.json({ error: 'bad_json' }, { status: 400 }) }
  const id = String(b.id || '').slice(0, 80)
  const answer = String(b.answer == null ? '' : b.answer).trim().slice(0, 4000)
  const rows = await db()`update berco_answers.items
      set answer = ${answer || null}, answered_at = ${answer ? new Date() : null},
          status = case when status = 'locked' then 'locked' when ${answer} = '' then 'open' else 'answered' end
      where id = ${id} returning id, answer, answered_at, status`
  if (!rows.length) return Response.json({ error: 'unknown_id' }, { status: 404 })
  return Response.json({ item: rows[0] }, { headers: { 'Cache-Control': 'no-store' } })
}
