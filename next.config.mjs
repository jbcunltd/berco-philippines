// Redirects exist so the old bercohome.com (WordPress/WooCommerce) URLs keep working
// when the domain is pointed at this site. All 301 (permanent) so search equity carries over.
// Old-site inventory: 315 indexed URLs — 285 /shop/* product pages, 18 /product-category/*,
// plus the store, policy and utility pages. Mapped to the nearest collection, never to a dead end.

const nextConfig = {
  async redirects() {
    return [
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

      // ── Policy pages: stopgap only, so nothing 404s. The old store had Delivery and Returns
      // policies; this site has no equivalent yet. Decide whether it needs real ones. ──
      { source: '/delivery-policy', destination: '/', permanent: false },
      { source: '/returns-policy', destination: '/', permanent: false },

      // ── Old WordPress blog/feed paths ──
      { source: '/archives/:path*', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/comments/feed', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
