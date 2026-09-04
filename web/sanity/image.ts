import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {dataset, projectId} from './client'
import {withRequestedWidth} from '../lib/coverImage.ts'

export type {ImagePresentation} from './imagePolicy'
export {imagePublicationState, presentationFromBlockType} from './imagePolicy'
export {COVER_IMAGE_WIDTHS, coverImageSizes} from '../lib/coverImage.ts'

export type EditorialImageFields = {
  alt?: string
  caption?: string
  credit?: string
  source?: string
  rights?: string
  rightsHolder?: string
  provenanceStatus?: string
  provenanceNote?: string
  location?: string
  recordedAt?: string
  externalUrl?: string
  image?: SanityImageSource | {asset?: {_ref?: string; _id?: string}}
}

const builder =
  projectId && dataset ? createImageUrlBuilder({projectId, dataset}) : undefined

export function sanityImageUrl(
  source: SanityImageSource | undefined,
  width: number,
): string | undefined {
  if (!source || !builder) return undefined
  try {
    return builder.image(source).width(width).fit('max').auto('format').url()
  } catch {
    return undefined
  }
}

export function editorialImageSrc(
  value: EditorialImageFields | undefined,
  width: number,
): string | undefined {
  if (!value) return undefined
  const fromAsset = sanityImageUrl(value.image as SanityImageSource | undefined, width)
  if (fromAsset) return fromAsset
  return value.externalUrl ? withRequestedWidth(value.externalUrl, width) : undefined
}

export function srcsetFor(value: EditorialImageFields | undefined, widths: number[]): string | undefined {
  if (!value) return undefined
  const parts = widths
    .map((width) => {
      const url = editorialImageSrc(value, width)
      return url ? `${url} ${width}w` : undefined
    })
    .filter(Boolean)
  return parts.length ? parts.join(', ') : undefined
}
