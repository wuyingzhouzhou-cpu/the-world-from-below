export const PORTABLE_TEXT_BLOCK_MAP = {
  pullQuote: 'PullQuote',
  sourceQuote: 'SourceQuote',
  epigraph: 'Epigraph',
  bodyImage: 'BodyImage',
  wideImage: 'WideImage',
  fullImage: 'FullImage',
  portraitImage: 'PortraitImage',
  imagePair: 'ImagePair',
  gallery: 'EditorialGallery',
  aside: 'EditorialAside',
  videoEmbed: 'EditorialVideo',
  divider: 'EditorialDivider',
  sourceNote: 'SourceNote',
} as const

export type PortableTextBlockName = (typeof PORTABLE_TEXT_BLOCK_MAP)[keyof typeof PORTABLE_TEXT_BLOCK_MAP]

export function componentForBlockType(type: string | undefined): PortableTextBlockName | null {
  if (!type) return null
  return (PORTABLE_TEXT_BLOCK_MAP as Record<string, PortableTextBlockName>)[type] ?? null
}
