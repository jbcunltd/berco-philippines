import PolicyPage from '../components/PolicyPage'
import { POLICIES } from '../policies/data'

const SITE = 'https://berco-philippines.vercel.app'
const p = POLICIES['delivery-policy']

export const metadata = {
  title: p.seoTitle,
  description: p.seoDesc,
  keywords: p.keywords,
  alternates: { canonical: '/delivery-policy' },
  openGraph: { type: 'website', url: `${SITE}/delivery-policy`, siteName: 'Berco', title: p.seoTitle, description: p.seoDesc },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <PolicyPage slug="delivery-policy" />
}
