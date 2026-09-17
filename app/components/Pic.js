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
//
// The 1200px tier is for 3x phone screens (every iPhone). A 390px-wide hero needs
// ~1170 real pixels; without this tier the browser jumped from the 800 file straight
// to the full desktop one. It is offered ONLY when the file exists on disk, so a
// width prop that doesn't match the real image can never put a 404 into srcset.
// This component renders on the server (at build time), so the check is free.

import fs from 'fs'
import path from 'path'

const MID_W = 1200

function hasFile(publicPath) {
  try { return fs.existsSync(path.join(process.cwd(), 'public', publicPath)) } catch { return false }
}

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
  const [imgPath, query] = (src || '').split('?')
  if (!imgPath || !imgPath.endsWith('.jpg')) {
    return <img src={src} alt={alt} width={width} height={height} className={className} loading={loading} {...rest} />
  }

  const q = query ? `?${query}` : ''
  const base = imgPath.slice(0, -4)
  const w = Number(width) || 0
  // catalogue scans have no phone variant on purpose - they get zoomed, so keep full resolution
  const hasSmall = w > 800 && !imgPath.includes('/catalogue/')
  const hasMid = hasSmall && w > MID_W && hasFile(`${base}-${MID_W}.webp`)
  const srcSet = hasSmall
    ? `${base}-800.webp${q} 800w, ${hasMid ? `${base}-${MID_W}.webp${q} ${MID_W}w, ` : ''}${base}.webp${q} ${w}w`
    : `${base}.webp${q}`

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
