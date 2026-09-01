import {PaperSheet} from '@/components/layout/PaperSheet'
import {EditorialQuestion, HomeCover} from '@/components/home/HomeCover'
import {HomeSections} from '@/components/home/HomeSections'
import {isCoverMode} from '@/lib/cover'
import {client} from '@/sanity/client'
import {toHomepageView} from '@/sanity/home'
import {homepageQuery} from '@/sanity/queries'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{cover: string}>}

export default async function HomeCoverPreviewPage({params}: PageProps) {
  const {cover} = await params
  if (!isCoverMode(cover)) notFound()
  const raw = await client.fetch(homepageQuery)
  const home = toHomepageView(raw || {}, cover)
  return (
    <PaperSheet width="site">
      <main className="site-main">
        <EditorialQuestion home={home} />
        <HomeCover home={home} />
        <HomeSections home={home} />
      </main>
    </PaperSheet>
  )
}
