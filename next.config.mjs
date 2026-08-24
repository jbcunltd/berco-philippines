// Redirects exist so the old bercohome.com (WordPress/WooCommerce) URLs keep working
// when the domain is pointed at this site. All 301 (permanent) so search equity carries over.
// Old-site inventory: 315 indexed URLs — 285 /shop/* product pages, 18 /product-category/*,
// plus the store, policy and utility pages. Mapped to the nearest collection, never to a dead end.

const nextConfig = {
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
