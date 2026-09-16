'use client'

// The scrubbed hero film.
//
// Apple's method, as measured and shipped on Artifax and then proven on a real
// phone here on 2026-09-13: a plain <video>, muted and preloaded not at all,
// seeked by currentTime against scroll progress. No canvas, no frame
// extraction, no image sequence, no scroll library — the pin is native sticky.
//
// The still underneath is cut from frame 0 of the ENCODED file, so when the
// film goes live there is no jump. If anything at all goes wrong — reduced
// motion, a refused play(), no metadata inside 3 s — the still simply stays,
// and the hero is still a hero.

import { useEffect, useRef } from 'react'

const FPS = 24

export default function ScrollFilm({ name, tiers = ['t', 'm', 'w'], alt, overlay, standfirst }) {
  const trackRef = useRef(null)
  const filmRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const film = filmRef.current
    const v = videoRef.current
    if (!track || !film || !v) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const want = innerWidth <= 819 ? 't' : innerWidth <= 1400 ? 'm' : 'w'
    const tier = tiers.includes(want) ? want : tiers[tiers.length - 1]

    let dur = 0, live = false, idx = 0, target = 0, raf = 0, pending = false
    let requested = false, dead = false, timeout = 0, io = null

    const progress = () => {
      const r = track.getBoundingClientRect()
      const span = track.offsetHeight - innerHeight
      return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
    }
    const lastFrame = () => dur * FPS - 1

    function seekTo(fr) {
      if (v.seeking) { pending = true; return }
      v.currentTime = Math.min(dur - 0.001, (fr + 0.5) / FPS)
    }
    const onSeeked = () => { if (pending) { pending = false; seekTo(idx) } }

    function tick() {
      const d = target - idx
      if (Math.abs(d) < 0.05) { idx = target; seekTo(idx); raf = 0 }
      else { idx += d * 0.25; seekTo(idx); raf = requestAnimationFrame(tick) }
    }
    function onScroll() {
      if (!live) return
      target = progress() * lastFrame()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    function goLive() {
      clearTimeout(timeout)
      live = true
      film.classList.add('live')
      target = progress() * lastFrame(); idx = target; seekTo(idx)
    }
    // iOS will not render a seeked frame until the element has been primed by a
    // play(). In Low Power Mode that play() is refused outright — so we keep the
    // still rather than show a frozen black box.
    function onMeta() {
      if (dead) return
      dur = v.duration
      v.play().then(() => { v.pause(); goLive() }).catch(() => { dead = true })
    }
    function request() {
      v.src = `/film/${name}/${tier}.mp4`
      v.load()
      timeout = setTimeout(() => { if (!live) dead = true }, 3000)
      v.addEventListener('loadedmetadata', onMeta, { once: true })
    }

    // Load on proximity, two ways. IntersectionObserver is the cheap path but it
    // is a single point of failure — some embedded webviews never deliver its
    // callbacks at all — and a film that never requests its source is a dead
    // hero. A plain rect check on scroll backs it up; whichever fires first wins.
    const near = () => {
      const r = track.getBoundingClientRect()
      return r.top < innerHeight * 3 && r.bottom > -innerHeight
    }
    function fire() {
      if (requested) return
      requested = true
      if (io) io.disconnect()
      request()
    }
    function onProximity() { if (!requested && near()) fire() }

    v.addEventListener('seeked', onSeeked)
    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        (es) => { if (es.some((e) => e.isIntersecting)) fire() },
        { rootMargin: '200% 0px 100% 0px' }
      )
      io.observe(track)
    }
    addEventListener('scroll', onProximity, { passive: true })
    addEventListener('resize', onProximity, { passive: true })
    addEventListener('scroll', onScroll, { passive: true })
    onProximity()

    return () => {
      clearTimeout(timeout)
      if (raf) cancelAnimationFrame(raf)
      if (io) io.disconnect()
      v.removeEventListener('seeked', onSeeked)
      v.removeEventListener('loadedmetadata', onMeta)
      removeEventListener('scroll', onProximity)
      removeEventListener('resize', onProximity)
      removeEventListener('scroll', onScroll)
    }
  }, [name, tiers])

  return (
    <div className="film-track" ref={trackRef}>
      <div className="film-pin">
        <div className="shell hero-stage">
          <div className="masthead"><span>Berco — Custom Cabinetry &amp; Interiors</span><span>Philippines</span></div>
          <div className="film-frame">
          <div className="film" ref={filmRef}>
            <picture>
              <source type="image/webp" srcSet={`/film/${name}/t-start.webp`} media="(max-width:819px)" />
              <source type="image/webp" srcSet={`/film/${name}/w-start.webp`} />
              <img src={`/film/${name}/w-start.jpg`} alt={alt} decoding="async" fetchPriority="high" />
            </picture>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video ref={videoRef} muted playsInline preload="none" tabIndex={-1} aria-hidden="true" />
            <div className="scrim" />
          </div>
          {/* Over the film: eyebrow + title only. Everything else reads beneath it
              on cream — measured, the lede and buttons could not clear 4.5:1 over
              a kitchen that changes frame by frame, and a scrim heavy enough to
              fix that would drown the cabinetry the film exists to show. */}
          <div className="hero-copy">{overlay}</div>
          </div>
          <div className="hero-standfirst">{standfirst}</div>
        </div>
      </div>
    </div>
  )
}
