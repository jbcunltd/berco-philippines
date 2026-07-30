import { ORDER } from './collections/data'

const SITE = 'https://berco-philippines.vercel.app'

export default function sitemap() {
  const now = new Date()
  return [
    { url: SITE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/2026-catalogue`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/for-designers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/collections`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...ORDER.map((s) => ({
      url: `${SITE}/collections/${s}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
