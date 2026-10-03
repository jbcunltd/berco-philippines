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
// 1,093 CSS px wide, so it declares 1093px and the browser correctly keeps taking
// the full file. Pass the real figure; a lie in either direction costs either
// bytes or sharpness.

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
