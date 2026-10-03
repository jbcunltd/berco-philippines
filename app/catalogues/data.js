// Web-viewable catalogues. Each PDF is also readable page-by-page so a visitor never has to
// download it just to look. Page images are rendered from the PDF itself, so they cannot drift
// from the document. The PDFs themselves are owned by the catalogue workstream.
//
// `size` is the real file size, stated on every download link and in the card meta. These run
// 5 to 19 MB, which on a Philippine mobile connection is a decision, not a click, and the
// comment this replaced still said "3-6MB". Re-measure it whenever a PDF is replaced:
//   ls -l public/*.pdf   (bytes / 1048576, one decimal)
// And a replaced PDF needs a NEW FILENAME now that /public PDFs are served immutable for a
// year. See the cache block in next.config.mjs.

export const CAT_ORDER = ['2026-catalogue', 'interior-systems', 'materials-finishes', 'technical-specification']

export const CATALOGUES = {
  '2026-catalogue': {
    name: 'Berco Catalogue 2026',
    eyebrow: 'The catalogue',
    hero: 'The 2026 Catalogue.',
    lead: 'Collections, materials, how a Berco kitchen is actually made, and the standard we hand a project over on.',
    pdf: '/berco-catalogue-2026.pdf',
    pages: 48,
    pageDir: '/img/catalogue/2026',
    prefix: 'bc',
    cover: '/img/covers/catalogue-2026-cover.jpg',
    size: '18.8 MB',
    meta: 'PDF · 48pp · 18.8 MB',
    seoTitle: '2026 Catalogue | Berco',
    seoDesc: 'Read the Berco 2026 Catalogue, all 48 pages: the collections, the materials, how a Berco kitchen is made, and the standard we hand a project over on.',
    keywords: ['Berco catalogue', 'Berco 2026 catalogue', 'cabinetry catalogue Philippines', 'custom kitchen catalogue Philippines'],
  },
  'interior-systems': {
    name: 'Interior Systems Catalogue',
    eyebrow: 'Specification catalogue',
    hero: 'Interior Systems.',
    lead: 'The complete fitted-storage, organization and sink range: drawer organization, larders, corner solutions, worktop integration, sinks and taps, with codes, sizes and cabinet fits.',
    pdf: '/berco-interior-systems-catalogue.pdf',
    pages: 32,
    pageDir: '/img/catalogue/interior-systems',
    prefix: 'is',
    cover: '/img/covers/interior-systems-cover.jpg',
    size: '11 MB',
    meta: 'PDF · 32pp · 11 MB',
    seoTitle: 'Interior Systems Catalogue: Fitted Storage & Sinks | Berco',
    seoDesc: 'The full Berco Interior Systems range: drawer organization, larders, corner solutions, worktop integration, sinks and taps, with codes, sizes and cabinet fits.',
    keywords: ['interior systems catalogue', 'fitted storage Philippines', 'kitchen organizers Philippines', 'workstation sink Philippines'],
  },
  'materials-finishes': {
    name: 'Materials & Finishes 2026',
    eyebrow: 'The finishes library',
    hero: 'Materials & Finishes.',
    lead: 'Two complete schemes and the four ways a door edge can be finished, then Part One, the selection, a working palette to put in front of a client. Part Two is the complete range, grouped by the material each finish is made from, every swatch carrying its material code so it can be scheduled directly. Each family is shown in a room and then as cabinetry.',
    pdf: '/berco-materials-finishes-2026.pdf',
    pages: 48,
    pageDir: '/img/catalogue/materials-finishes',
    prefix: 'mf',
    cover: '/img/covers/materials-finishes-cover.jpg',
    size: '15.5 MB',
    meta: 'PDF · 48pp · 15.5 MB',
    seoTitle: 'Materials & Finishes 2026: The Full Library | Berco',
    seoDesc: 'The Berco finishes library: melamine, film, lacquer, high-gloss UV, powder-coat, PET, veneer, leather, quartz and sintered stone, each with its code.',
    keywords: ['cabinetry finishes Philippines', 'melamine finishes', 'quartz worktop Philippines', 'material codes cabinetry', 'Berco finishes'],
  },
  'technical-specification': {
    name: 'Technical Specification',
    eyebrow: 'For architects & designers',
    hero: 'Materials & Construction.',
    lead: 'Carcase and board, the nine door-front types, edging, countertops, hardware and production. Every material named, with the codes and figures you specify against.',
    pdf: '/berco-technical-specification.pdf',
    pages: 10,
    pageDir: '/img/catalogue/technical-specification',
    prefix: 'ts',
    cover: '/img/covers/technical-spec-cover.jpg',
    size: '5 MB',
    meta: 'PDF · 10pp · 5 MB',
    seoTitle: 'Technical Specification: Materials & Construction | Berco',
    seoDesc: 'Berco technical specification: carcase and board, door fronts, edging, countertops, hardware, production and service detail for architects and designers.',
    keywords: ['cabinetry technical specification', 'carcase board spec', 'edge banding specification', 'Berco specification'],
  },
}
