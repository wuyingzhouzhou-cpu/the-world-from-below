import {absoluteUrl, type SiteEnv} from './siteUrl.ts'

export type RssStory = {
  title?: string
  slug?: string
  dek?: string
  publishedAt?: string
  storyType?: string
  authors?: {name?: string}[]
}

function xmlEscape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function displayableAuthor(name?: string): string | undefined {
  const trimmed = name?.trim()
  if (!trimmed) return undefined
  if (/^\[[^\]]+\]$/.test(trimmed)) return undefined
  if (/^author name$/i.test(trimmed)) return undefined
  return trimmed
}

export function rssItemXml(story: RssStory, env: SiteEnv = process.env): string | undefined {
  const title = story.title?.trim()
  const slug = story.slug?.trim()
  const publishedAt = story.publishedAt?.trim()
  if (!title || !slug || !publishedAt) return undefined
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return undefined
  const link = absoluteUrl(`/stories/${slug}`, env)
  if (!link) return undefined
  const authors = (story.authors || [])
    .map((author) => displayableAuthor(author.name))
    .filter((name): name is string => Boolean(name))
  const description = story.dek?.trim()
  const category = story.storyType?.trim()
  return [
    '    <item>',
    `      <title>${xmlEscape(title)}</title>`,
    `      <link>${xmlEscape(link)}</link>`,
    `      <guid isPermaLink="true">${xmlEscape(link)}</guid>`,
    `      <pubDate>${date.toUTCString()}</pubDate>`,
    description ? `      <description>${xmlEscape(description)}</description>` : undefined,
    authors.length ? `      <dc:creator>${xmlEscape(authors.join(', '))}</dc:creator>` : undefined,
    category ? `      <category>${xmlEscape(category)}</category>` : undefined,
    '    </item>',
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildRssXml(
  stories: RssStory[],
  input: {title: string; description?: string; env?: SiteEnv} = {title: 'The World From Below'},
): string | undefined {
  const env = input.env || process.env
  const home = absoluteUrl('/', env)
  if (!home) return undefined
  const items = stories
    .slice()
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map((story) => rssItemXml(story, env))
    .filter(Boolean)
  const desc = input.description?.trim()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${xmlEscape(input.title)}</title>`,
    `    <link>${xmlEscape(home)}</link>`,
    desc ? `    <description>${xmlEscape(desc)}</description>` : undefined,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line) => line !== undefined)
    .join('\n')
}
