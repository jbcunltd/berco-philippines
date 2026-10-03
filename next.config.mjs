// Redirects exist so the old bercohome.com (WordPress/WooCommerce) URLs keep working
// when the domain is pointed at this site. All 301 (permanent) so search equity carries over.
// Old-site inventory: 315 indexed URLs — 285 /shop/* product pages, 18 /product-category/*,
// plus the store, policy and utility pages. Mapped to the nearest collection, never to a dead end.

// Content-Security-Policy, the one security header the site was still missing.
//
// 'unsafe-inline' is in script-src and it is not an oversight. The page carries
// four inline scripts that have to run as written: the Google Consent Mode
// defaults (which must set DENIED before gtag.js is requested, so it cannot be
// deferred or moved to a file), the nav/reveal/parallax/carousel bundle, the
// Meta pixel loader, and Next's own hydration payload. A nonce needs a
// per-request response, and this site is 180-odd statically prerendered pages
// on the edge. Hashes would have to be regenerated on every copy edit and would
// silently break the pixel the day someone forgot. So the honest position: this
// policy is a allowlist of HOSTS, which is what actually limits where data can
// go, and it does not pretend to stop inline injection.
//
// 'unsafe-eval' is NOT here and must not be added.
//
// The hosts, and why each one: Google Tag Manager and Analytics (GA4), Meta
// (pixel + its noscript tracking image), Vercel Analytics and Vercel Insights,
// Google Fonts (next/font self-hosts the files, but the stylesheet host stays
// for the preconnect), and data: + blob: for images because next/font and the
// inlined review pages use data URIs. frame-ancestors mirrors the SAMEORIGIN
// above, and form-action is 'self' because the inquiry form posts to our own
// /api/inquiry route and nowhere else.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.facebook.com https://connect.facebook.net",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://www.facebook.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig = {
  // Hero-film media. The file name changes whenever the content does, so the
  // browser and the edge may hold these for a year. Without this the scrubbed
  // <video> is re-validated on every visit, which is the one request that must
  // not be slow.
  async headers() {
    return [
      {
        // Security headers, every route. Added 2026-09-30 (ledger §55).
        // SAMEORIGIN not DENY so anything that legitimately embeds our own pages keeps working.
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
      {
        // Unlisted review/preview/brief pages must never be indexed. robots.txt is
        // a crawl hint; this header is the instruction that actually holds.
        source: '/:path(review-.*|preview-.*)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/presentations/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },

      {
        source: '/film/:path*.:ext(mp4|webp|jpg|png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },

      // ── 🚨 IMMUTABLE MEANS A CHANGED PICTURE NEEDS A CHANGED FILENAME ──────
      // Everything under /img and the four catalogue PDFs is now held for a
      // year and never revalidated. Build assets already were; these were still
      // being served `max-age=0, must-revalidate`, so a returning visitor paid a
      // conditional request for every one of them, and the collection pages
      // carry 20-plus images each.
      //
      // THE RULE THAT COMES WITH IT, and it is not optional: once a path is
      // immutable, OVERWRITING A FILE IN PLACE DOES NOT REACH ANYONE who has
      // already seen it. Not after a redeploy, not after a cache purge they
      // never asked for. A browser that holds an immutable response will not
      // even ask. So:
      //   · replacing a picture = a NEW filename, and the reference updated
      //     (hero-kitchen-v2.jpg, not hero-kitchen.jpg overwritten), or
      //   · a `?v=2` query on the src, which the catalogue carousel already
      //     uses (/img/carousel/proc-01.jpg?v=2) and which is enough because
      //     the query is part of the cache key.
      // Replacing a catalogue PDF under the same name is the same trap, and the
      // one most likely to be sprung, because a new catalogue arrives as a file
      // with the old name. Rename it with its year or revision.
      {
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:file(berco-catalogue-2026|berco-interior-systems-catalogue|berco-materials-finishes-2026|berco-technical-specification).pdf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  async redirects() {
    return [
      // ── Stale staging host → the real domain ────────────────────────────────
      // berco-philippines.vercel.app still returns 200, and the team is actively
      // pasting it into DMs (3 messages on 2026-08-12 alone). A second WORKING
      // copy of the site is worse than a dead one: it bypasses analytics and the
      // pixel, so all that traffic is invisible, and it splits search equity.
      // Redirect the host itself so every stale link — old DMs, bookmarks, saved
      // replies, ad copy — is fixed at once, instead of chasing each place it was
      // pasted. Exact host match, so the production domain is unaffected.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'berco-philippines.vercel.app' }],
        destination: 'https://www.bercohome.com/:path*',
        permanent: true,
      },

      // ── The catalogue: the link seeded in Facebook comments + the ManyChat PLAN reply ──
      { source: '/2026-catalogue', destination: '/catalogues/2026-catalogue', permanent: true },
      { source: '/catalog', destination: '/catalogues/2026-catalogue', permanent: true },
      { source: '/catalog/:path*', destination: '/catalogues/2026-catalogue', permanent: true },

      // ── Product pages → nearest collection ──
      { source: '/shop/kitchen-cabinets/:path*', destination: '/collections/kitchens', permanent: true },
      { source: '/shop/bedroom/:path*', destination: '/collections/wardrobes', permanent: true },
      { source: '/shop/bathroom/:path*', destination: '/collections/bathrooms', permanent: true },
      { source: '/shop/furniture/:path*', destination: '/collections/living', permanent: true },
      { source: '/shop/whole-house-solution/:path*', destination: '/collections', permanent: true },
      // Windows & doors are not a Berco line (they belong to Nautilus) — send to the collections index
      // rather than a cabinetry page that would mislead. Revisit if Nautilus gets its own site.
      { source: '/shop/doors-windows/:path*', destination: '/collections', permanent: true },
      { source: '/shop', destination: '/collections', permanent: true },
      { source: '/shop/:path*', destination: '/collections', permanent: true },

      // ── Old WooCommerce taxonomy URLs ──
      { source: '/product-category/kitchen-cabinets/:path*', destination: '/collections/kitchens', permanent: true },
      { source: '/product-category/kitchen-cabinets', destination: '/collections/kitchens', permanent: true },
      { source: '/product-category/bedroom/:path*', destination: '/collections/wardrobes', permanent: true },
      { source: '/product-category/bedroom', destination: '/collections/wardrobes', permanent: true },
      { source: '/product-category/bathroom/:path*', destination: '/collections/bathrooms', permanent: true },
      { source: '/product-category/bathroom', destination: '/collections/bathrooms', permanent: true },
      { source: '/product-category/furniture/:path*', destination: '/collections/living', permanent: true },
      { source: '/product-category/:path*', destination: '/collections', permanent: true },
      { source: '/product-tag/:path*', destination: '/collections', permanent: true },
      { source: '/product/:path*', destination: '/collections', permanent: true },

      // ── Studio pages ──
      { source: '/planner', destination: '/how-we-work', permanent: true },
      { source: '/planner/:path*', destination: '/how-we-work', permanent: true },
      { source: '/contact-us', destination: '/#book', permanent: true },
      { source: '/contact-us/:path*', destination: '/#book', permanent: true },

      // ── Dead store plumbing (no e-commerce on this site) ──
      { source: '/cart', destination: '/', permanent: true },
      { source: '/checkout', destination: '/', permanent: true },
      { source: '/checkout/:path*', destination: '/', permanent: true },
      { source: '/my-account', destination: '/', permanent: true },
      { source: '/my-account/:path*', destination: '/', permanent: true },

      // ── Old WordPress blog/feed paths ──
      { source: '/archives/:path*', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/comments/feed', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
