import type {Metadata} from 'next'
import {canonicalUrl} from '@/lib/siteUrl'
import {editorialImageSrc, imagePublicationState, type EditorialImageFields} from '@/sanity/image'

type SeoInput = {
  title: string
  description?: string
  path?: string
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  socialImage?: EditorialImageFields | {asset?: unknown} | undefined
  robots?: Metadata['robots']
  openGraphType?: 'website' | 'article'
}

export function pageMetadata(input: SeoInput): Metadata {
  const title = input.metaTitle || input.title
  const description = input.metaDescription || input.description
  const canonical = canonicalUrl(input.path, input.canonicalUrl)
  const social = input.socialImage as EditorialImageFields | undefined
  const socialState = imagePublicationState(social)
  const image =
    social && !socialState.placeholder && !socialState.withheld
      ? editorialImageSrc(social, 1200)
      : undefined

  return {
    title,
    description,
    alternates: canonical ? {canonical} : undefined,
    robots: input.robots,
    openGraph: {
      title,
      description,
      url: canonical,
      type: input.openGraphType || 'website',
      images: image ? [{url: image}] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
