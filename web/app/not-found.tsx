import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'

export default function NotFound() {
  return (
    <PaperSheet width="site">
      <main className="index-header">
        <p className="index-kicker">Not found</p>
        <h1>This page is not in the publication.</h1>
        <p>The story, place, force, or library item may be unpublished or the address may be wrong.</p>
        <p style={{marginTop: 24}}>
          <Link href="/" className="read-link">
            ← Back to the homepage
          </Link>
        </p>
      </main>
    </PaperSheet>
  )
}
