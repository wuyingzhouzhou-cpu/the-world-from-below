import {PaperSheet} from '@/components/layout/PaperSheet'
import {ForcesExplorer} from '@/components/forces/ForcesExplorer'
import {pageMetadata} from '@/lib/metadata'
import {asForce} from '@/sanity/home'
import {client} from '@/sanity/client'
import {allForcesQuery} from '@/sanity/queries'

export async function generateMetadata() {
  return pageMetadata({
    title: 'Forces — The World From Below',
    description: 'Lenses for understanding what shapes ordinary life.',
  })
}

export default async function ForcesIndexPage() {
  const raw = await client.fetch(allForcesQuery)
  const forces = (raw || []).flatMap((item: unknown) => asForce(item) || [])

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Forces</p>
          <div className="index-header-grid">
            <h1>The Larger Forces</h1>
            <p>These are not topics. They are lenses. Ways of understanding what shapes ordinary life from the outside.</p>
          </div>
        </header>
        <div className="band-inner">
          <ForcesExplorer forces={forces} />
        </div>
      </main>
    </PaperSheet>
  )
}
