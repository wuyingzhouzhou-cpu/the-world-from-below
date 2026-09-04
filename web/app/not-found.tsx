import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Page not found — The World From Below',
  robots: {index: false, follow: false},
}

export default function NotFound() {
  return (
    <PaperSheet width="site">
      <main className="index-header">
        <p className="index-kicker">The World From Below</p>
        <h1>Page not found</h1>
        <p>This address is not in the publication.</p>
        <p style={{marginTop: 24}}>
          <Link href="/" className="read-link">
            ← Back to publication
          </Link>
        </p>
      </main>
    </PaperSheet>
  )
}
