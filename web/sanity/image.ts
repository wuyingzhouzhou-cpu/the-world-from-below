import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {dataset, projectId} from './client'

export type {ImagePresentation} from './imagePolicy'
export {imagePublicationState, presentationFromBlockType} from './imagePolicy'

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
  return value.externalUrl || undefined
}

export function srcsetFor(value: EditorialImageFields | undefined, widths: number[]): string | undefined {
  if (!value?.image) return undefined
  const parts = widths
    .map((width) => {
      const url = sanityImageUrl(value.image as SanityImageSource, width)
      return url ? `${url} ${width}w` : undefined
    })
    .filter(Boolean)
  return parts.length ? parts.join(', ') : undefined
}
