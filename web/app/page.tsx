import {PaperSheet} from '@/components/layout/PaperSheet'
import {EditorialQuestion, HomeCover} from '@/components/home/HomeCover'
import {HomeSections} from '@/components/home/HomeSections'
import {pageMetadata} from '@/lib/metadata'
import {client} from '@/sanity/client'
import {toHomepageView} from '@/sanity/home'
import {homepageQuery} from '@/sanity/queries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const raw = await client.fetch(homepageQuery)
  const home = toHomepageView(raw || {})
  return pageMetadata({
    title: home.settings.title,
    description: home.settings.question || home.settings.tagline,
  })
}

export default async function HomePage() {
  const raw = await client.fetch(homepageQuery)
  const home = toHomepageView(raw || {})
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
