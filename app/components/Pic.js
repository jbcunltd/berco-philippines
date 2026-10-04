// One image component for the whole site.
//
// Serves a pre-built WebP (about 64% lighter than the JPEG) plus narrower steps
// at 800px and 1200px, so a phone stops downloading desktop-sized pictures. The
// original JPEG stays as the <img> fallback, so an old browser still gets a photo.
//
// Deliberately NOT next/image: these are static files that rarely change, and Vercel's
// runtime optimizer is metered. Pre-building costs nothing to serve, has no cold-start
// on first request, and keeps working if the site ever moves off Vercel.
// Variants are produced by scripts/build-webp.py.
//
// THE LADDER, AND WHY IT IS ONLY EVER EXTENDED DOWNWARDS
// It used to be 800w plus the full file. A 3x phone asking for a 352px card slot
// needs ~1,056 real pixels, so it skipped the 800 and took the 1,600px desktop
// file: 86 KB painted at 1,056 px. The 1200 step closes that gap and loses
// nothing, because 1,200 is still more than the slot is painted at.
//
// The largest tier is never reduced. A tall box with object-fit:cover ENLARGES a
// photo, so the homepage hero is painted at ~3,400 device px on a 3x phone from a
// 1,760px file and is already upscaled. Capping the ladder at 1,200 was shipped on
// 2026-09-17 and reverted the same hour for visible softness (trap 4 in
// website-speed-protocol.md).
//
// `sizes` MUST DESCRIBE THE PAINTED WIDTH, NOT THE BOX
// For a slot that enlarges, the honest value is the covered width, not 100vw. The
// homepage hero's box is 354 CSS px wide on a 390px phone but its photo is painted
// 824 CSS px wide, so it declares 824px. Pass the real figure; a lie in either
// direction costs either bytes or sharpness.
//
// Measured 2026-10-04 on a 390x844 DPR3 phone at 150ms/1.6Mbps/4x CPU: the home
// hero paints 824 CSS px (2,472 device px) and the collection hero 905 CSS px
// (2,715 device px). Both declared MORE than they paint (1093px and 960px). The
// over-declaration was harmless on a phone - at DPR3 either figure lands far above
// 1,200, so the full file is chosen - but it hid the fact that a 1x desktop was
// also being sent the full file for an 1,136 px slot.
//
// So the heroes now offer the 1200 rung as well, and the honest `sizes` is what
// makes that safe. Rendered at the painted width, high-frequency detail from the
// 1200 file against the full file measures:
//     desktop 1,136-1,145 px slot   94-95%  - indistinguishable side by side
//     phone   2,472-2,715 px slot   66-71%  - the September softening, exactly
// A truthful `sizes` keeps the phone on the full file and lets the desktop take
// the smaller one: 99,259 -> 53,976 bytes on home, 76,621 -> 50,794 on kitchens.
// Lower the declared width and the phone falls into the 66% case. Do not.

const TIERS = [800, 1200]

export default function Pic({
  src,                 // "/img/....jpg" - the JPEG that already exists
  alt,
  width,               // natural width; drives the srcset width descriptor
  height,
  className,
  sizes = '100vw',
  tiers = TIERS,       // narrow candidates to offer below the full file
  loading = 'lazy',
  fetchPriority,
  ...rest
}) {
  // src may carry a cache-buster (?v=2); build the webp paths from the clean path
  const [path, query] = (src || '').split('?')
  if (!path || !path.endsWith('.jpg')) {
    return <img src={src} alt={alt} width={width} height={height} className={className} loading={loading} {...rest} />
  }

  const q = query ? `?${query}` : ''
  const base = path.slice(0, -4)
  const w = Number(width) || 0
  // catalogue scans have no narrow variant on purpose - they get zoomed, so keep full resolution
  const steps = path.includes('/catalogue/') ? [] : tiers.filter((t) => t < w)
  const srcSet = steps.length
    ? [...steps.map((t) => `${base}-${t}.webp${q} ${t}w`), `${base}.webp${q} ${w}w`].join(', ')
    : `${base}.webp${q}`

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={steps.length ? sizes : undefined} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        {...rest}
      />
    </picture>
  )
}
