'use client'
import { useEffect, useState } from 'react'

const fmt = (t) => t ? new Date(t).toLocaleString('en-PH', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''

function Item({ it, keyStr, onSaved }) {
  const [val, setVal] = useState(it.answer || '')
  const [state, setState] = useState('')
  const dirty = val !== (it.answer || '')
  async function save() {
    setState('Saving…')
    try {
      const r = await fetch('/api/answers', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-answers-key': keyStr }, body: JSON.stringify({ id: it.id, answer: val }) })
      if (!r.ok) throw new Error(String(r.status))
      const j = await r.json(); onSaved(j.item); setState('Saved')
    } catch (e) { setState('Not saved. Check your signal and try again.') }
  }
  return (
    <li className="ab-item">
      <p className="ab-q">{it.question}</p>
      {it.context && <p className="ab-ctx">{it.context}</p>}
      {it.locked && <div className="ab-lock"><span className="ab-tag">Locked</span><p>{it.locked}</p><span className="ab-when">{fmt(it.locked_at)}</span></div>}
      <textarea className="ab-in" rows={it.locked ? 2 : 3} value={val} onChange={(e) => { setVal(e.target.value); setState('') }}
        placeholder={it.locked ? 'Want to change this? Write it here.' : 'Your answer'} />
      <div className="ab-row">
        <button className="ab-btn" onClick={save} disabled={!dirty}>Save</button>
        <span className="ab-state">{state || (it.answered_at ? 'Answered ' + fmt(it.answered_at) : '')}</span>
      </div>
    </li>
  )
}

export default function Answers() {
  const [keyStr, setKey] = useState('')
  const [items, setItems] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    const k = (location.hash.match(/k=([A-Za-z0-9]+)/) || [])[1] || ''
    setKey(k)
    if (!k) { setErr('This page needs its private link.'); return }
    fetch('/api/answers', { headers: { 'x-answers-key': k }, cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
      .then((j) => setItems(j.items))
      .catch(() => setErr('This link is not valid.'))
  }, [])
  const saved = (row) => setItems((xs) => xs.map((x) => (x.id === row.id ? { ...x, ...row } : x)))
  const groups = []
  for (const it of items || []) {
    let g = groups.find((x) => x.name === it.section)
    if (!g) groups.push((g = { name: it.section, items: [] }))
    g.items.push(it)
  }
  // Sections with something still to answer come first; fully locked ones sink.
  groups.sort((a, b) => Number(a.items.every((x) => x.status === 'locked')) - Number(b.items.every((x) => x.status === 'locked')))
  const open = (items || []).filter((x) => x.status === 'open').length
  return (
    <main className="ab">
      <style>{`
        .ab{max-width:680px;margin:0 auto;padding:28px 16px 80px;font-family:var(--sans);color:var(--ink);background:var(--ground);min-height:100vh}
        .ab h1{font-family:var(--sans);font-size:26px;font-weight:600;margin:0 0 4px}
        .ab-sub{color:var(--ink-soft);margin:0 0 22px;font-size:15px}
        .ab h2{font-family:var(--sans);font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--champ-ink);margin:30px 0 10px;font-weight:600}
        .ab ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
        .ab-item{background:#fff;border:1px solid var(--hair);border-radius:12px;padding:14px}
        .ab-q{font-weight:600;margin:0 0 4px;font-size:16px}
        .ab-ctx{color:var(--ink-faint);margin:0 0 10px;font-size:14px}
        .ab-lock{background:var(--panel);border-radius:8px;padding:10px 12px;margin:0 0 10px}
        .ab-lock p{margin:4px 0;font-size:15px}
        .ab-tag{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--champ-ink);font-weight:600}
        .ab-when{font-size:12px;color:var(--ink-faint)}
        .ab-in{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px;border:1px solid var(--hair);border-radius:8px;background:var(--ground);resize:vertical}
        .ab-row{display:flex;align-items:center;gap:12px;margin-top:8px}
        .ab-btn{font:inherit;font-weight:600;font-size:15px;padding:10px 20px;min-height:44px;border:0;border-radius:999px;background:var(--ink);color:#fff}
        .ab-btn:disabled{opacity:.35}
        .ab-state{font-size:13px;color:var(--ink-faint)}
      `}</style>
      <h1>Answers board</h1>
      <p className="ab-sub">{items ? `${open} open. Answer what you can, any time. Locked items are decided; write below one to change it.` : (err || 'Loading…')}</p>
      {groups.map((g) => (
        <section key={g.name}>
          <h2>{g.name}</h2>
          <ul>{g.items.map((it) => <Item key={it.id} it={it} keyStr={keyStr} onSaved={saved} />)}</ul>
        </section>
      ))}
    </main>
  )
}
