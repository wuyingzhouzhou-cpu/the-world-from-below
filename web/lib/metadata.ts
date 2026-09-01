import type {Metadata} from 'next'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'

type SeoInput = {
  title: string
  description?: string
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  socialImage?: EditorialImageFields | {asset?: unknown} | undefined
}

export function pageMetadata(input: SeoInput): Metadata {
  const title = input.metaTitle || input.title
  const description = input.metaDescription || input.description
  const image = input.socialImage
    ? editorialImageSrc(input.socialImage as EditorialImageFields, 1200)
    : undefined

  return {
    title,
    description,
    alternates: input.canonicalUrl ? {canonical: input.canonicalUrl} : undefined,
    openGraph: {
      title,
      description,
      images: image ? [{url: image}] : undefined,
    },
  }
}
