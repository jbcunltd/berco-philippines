// One image component for the whole site.
//
// Serves a pre-built WebP (about 64% lighter than the JPEG) and, for anything wider
// than 800px, an 800px version so phones stop downloading desktop-sized pictures.
// The original JPEG stays as the <img> fallback, so an old browser still gets a photo.
//
// Deliberately NOT next/image: these are static files that rarely change, and Vercel's
// runtime optimizer is metered. Pre-building costs nothing to serve, has no cold-start
// on first request, and keeps working if the site ever moves off Vercel.
// Variants are produced by scripts/build-webp.py.

export default function Pic({
  src,                 // "/img/....jpg" - the JPEG that already exists
  alt,
  width,               // natural width; drives the srcset width descriptor
  height,
  className,
  sizes = '100vw',     // 100vw is right here: the 800w candidate is chosen only on narrow screens
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
  // catalogue scans have no phone variant on purpose - they get zoomed, so keep full resolution
  const hasSmall = w > 800 && !path.includes('/catalogue/')
  const srcSet = hasSmall ? `${base}-800.webp${q} 800w, ${base}.webp${q} ${w}w` : `${base}.webp${q}`

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={hasSmall ? sizes : undefined} />
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
