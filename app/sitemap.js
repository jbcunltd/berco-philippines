import { ORDER, CATS } from './collections/data'
import { CAT_ORDER } from './catalogues/data'
import { POLICY_ORDER } from './policies/data'

const SITE = 'https://www.bercohome.com'

export default function sitemap() {
  const now = new Date()
  const refs = ORDER.flatMap((s) =>
    CATS[s].images.map((im) => ({
      url: `${SITE}/collections/${s}/${im.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  )
  return [
    { url: SITE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/for-designers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/collections`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...POLICY_ORDER.map((s) => ({
      url: `${SITE}/${s}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    })),
    { url: `${SITE}/catalogues`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...CAT_ORDER.map((s) => ({
      url: `${SITE}/catalogues/${s}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...ORDER.map((s) => ({
      url: `${SITE}/collections/${s}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...refs,
  ]
}
