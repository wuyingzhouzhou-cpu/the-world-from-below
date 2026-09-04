import {imagePublicationState} from '../sanity/imagePolicy.ts'

type ImageFields = {
  rights?: string
  provenanceStatus?: string
}

export type ArticleJsonLdInput = {
  headline: string
  description?: string
  datePublished?: string
  url?: string
  authors?: {name: string}[]
  imageUrl?: string
  image?: ImageFields
}

export function articleJsonLd(input: ArticleJsonLdInput): Record<string, unknown> | undefined {
  const headline = input.headline.trim()
  if (!headline || !input.url) return undefined

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
  }
  if (input.description?.trim()) data.description = input.description.trim()
  if (input.datePublished?.trim()) {
    const date = new Date(input.datePublished)
    if (!Number.isNaN(date.getTime())) data.datePublished = input.datePublished.trim()
  }
  data.url = input.url
  if (input.authors?.length) {
    data.author = input.authors.map((author) => ({'@type': 'Person', name: author.name}))
  }
  const imageState = imagePublicationState(input.image)
  const imageUrl = imageState.placeholder || imageState.withheld ? undefined : input.imageUrl
  if (imageUrl) data.image = imageUrl
  return data
}

export function websiteJsonLd(input: {name: string; url?: string; description?: string}): Record<string, unknown> | undefined {
  if (!input.url) return undefined
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    url: input.url,
  }
  if (input.description?.trim()) data.description = input.description.trim()
  return data
}
