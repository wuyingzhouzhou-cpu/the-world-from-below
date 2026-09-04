import {buildRssXml} from '@/lib/rss'
import {siteOrigin} from '@/lib/siteUrl'
import {client} from '@/sanity/client'
import {rssStoriesQuery, siteSettingsQuery} from '@/sanity/queries'
import {toSiteSettings} from '@/sanity/home'

export const revalidate = 60

export async function GET() {
  if (!siteOrigin()) {
    return new Response('Site URL is not configured', {status: 503})
  }
  const [settingsRaw, stories] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(rssStoriesQuery),
  ])
  const settings = toSiteSettings(settingsRaw)
  const xml = buildRssXml(stories || [], {
    title: settings.title,
    description: settings.question || settings.tagline,
  })
  if (!xml) {
    return new Response('Site URL is not configured', {status: 503})
  }
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
