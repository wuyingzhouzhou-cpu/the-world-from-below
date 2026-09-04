import type {MetadataRoute} from 'next'
import {absoluteUrl, siteOrigin} from '@/lib/siteUrl'
import {PUBLIC_INDEX_PATHS} from '@/lib/seoRoutes'
import {client} from '@/sanity/client'
import {sitemapDocumentsQuery} from '@/sanity/queries'

export const revalidate = 60

type SitemapDoc = {slug?: string; publishedAt?: string; _updatedAt?: string}

function lastModified(value?: string): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function entry(path: string, updatedAt?: string): MetadataRoute.Sitemap[number] | undefined {
  const url = absoluteUrl(path)
  if (!url) return undefined
  const modified = lastModified(updatedAt)
  return modified ? {url, lastModified: modified} : {url}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteOrigin()) return []

  const docs = (await client.fetch(sitemapDocumentsQuery)) as {
    stories?: SitemapDoc[]
    places?: SitemapDoc[]
    forces?: SitemapDoc[]
    library?: SitemapDoc[]
  } | null

  const staticEntries = PUBLIC_INDEX_PATHS.map((path) => entry(path)).filter(Boolean)
  const stories = (docs?.stories || []).map((doc) => entry(`/stories/${doc.slug}`, doc.publishedAt || doc._updatedAt))
  const places = (docs?.places || []).map((doc) => entry(`/places/${doc.slug}`, doc._updatedAt))
  const forces = (docs?.forces || []).map((doc) => entry(`/forces/${doc.slug}`, doc._updatedAt))
  const library = (docs?.library || []).map((doc) => entry(`/library/${doc.slug}`, doc._updatedAt))

  return [...staticEntries, ...stories, ...places, ...forces, ...library].filter(
    (item): item is MetadataRoute.Sitemap[number] => Boolean(item),
  )
}
