import {PaperSheet} from '@/components/layout/PaperSheet'
import {EditorialQuestion, HomeCover} from '@/components/home/HomeCover'
import {HomeSections} from '@/components/home/HomeSections'
import {JsonLd} from '@/components/site/JsonLd'
import {websiteJsonLd} from '@/lib/jsonLd'
import {pageMetadata} from '@/lib/metadata'
import {absoluteUrl} from '@/lib/siteUrl'
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
    path: '/',
  })
}

export default async function HomePage() {
  const raw = await client.fetch(homepageQuery)
  const home = toHomepageView(raw || {})
  return (
    <PaperSheet width="site">
      <JsonLd
        data={websiteJsonLd({
          name: home.settings.title,
          url: absoluteUrl('/'),
          description: home.settings.question || home.settings.tagline,
        })}
      />
      <main className="site-main">
        <EditorialQuestion home={home} />
        <HomeCover home={home} />
        <HomeSections home={home} />
      </main>
    </PaperSheet>
  )
}
