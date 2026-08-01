import PolicyPage from '../components/PolicyPage'
import { POLICIES } from '../policies/data'

const SITE = 'https://www.bercohome.com'
const p = POLICIES['privacy-policy']

export const metadata = {
  title: p.seoTitle,
  description: p.seoDesc,
  keywords: p.keywords,
  alternates: { canonical: '/privacy-policy' },
  openGraph: { type: 'website', url: `${SITE}/privacy-policy`, siteName: 'Berco', title: p.seoTitle, description: p.seoDesc },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <PolicyPage slug="privacy-policy" />
}
