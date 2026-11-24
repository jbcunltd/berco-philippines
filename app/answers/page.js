import Answers from './Answers'

// Private working page for Jumbo. Not linked anywhere, kept out of search, and
// useless without the key in the link's #fragment.
export const metadata = {
  title: 'Answers board',
  robots: { index: false, follow: false, nocache: true },
}

export default function Page() {
  return <Answers />
}
