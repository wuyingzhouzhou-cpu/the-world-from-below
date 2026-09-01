export const PROVENANCE_STATUSES = ['verified', 'placeholder', 'unverified'] as const

export type ProvenanceStatus = (typeof PROVENANCE_STATUSES)[number]

export const STORY_TYPES = ['feature', 'essay', 'fieldNote'] as const

export type StoryType = (typeof STORY_TYPES)[number]

export const STORY_TYPE_LABELS: Record<StoryType, string> = {
  feature: 'Feature',
  essay: 'Essay',
  fieldNote: 'Field Note',
}

export type EditorialImageValue = {
  image?: {asset?: {_ref?: string}} | null
  externalUrl?: string | null
  alt?: string | null
  caption?: string | null
  credit?: string | null
  source?: string | null
  rights?: string | null
  rightsHolder?: string | null
  provenanceStatus?: string | null
  provenanceNote?: string | null
}

function hasAsset(image: EditorialImageValue['image']): boolean {
  return Boolean(image?.asset?._ref)
}

function mentionsPlaceholder(text: string | null | undefined): boolean {
  return Boolean(text && /placeholder/i.test(text))
}

function isEmpty(value: EditorialImageValue | undefined): boolean {
  if (!value) return true
  return !(
    hasAsset(value.image) ||
    value.externalUrl?.trim() ||
    value.alt?.trim() ||
    value.caption?.trim() ||
    value.credit?.trim() ||
    value.source?.trim() ||
    value.provenanceNote?.trim()
  )
}

/** Returns human-readable problems. Empty array means the image is valid. */
export function editorialImageProblems(
  value: EditorialImageValue | undefined,
  options: {required?: boolean} = {required: true},
): string[] {
  if (isEmpty(value) || !value) {
    return options.required ? ['Add an image (upload or external URL), alt text, and provenance.'] : []
  }

  const problems: string[] = []
  const hasImage = hasAsset(value.image) || Boolean(value.externalUrl?.trim())

  if (!hasImage) {
    problems.push('Provide an uploaded image or an external image URL.')
  }

  if (!value.alt?.trim()) {
    problems.push('Alt text is required.')
  }

  if (!value.provenanceStatus) {
    problems.push('Provenance status is required (Verified, Placeholder, or Unverified).')
  }

  if (value.provenanceStatus === 'verified') {
    if (!value.credit?.trim() && !value.source?.trim()) {
      problems.push('Verified images need a photographer/maker credit or a source.')
    }
  }

  if (value.provenanceStatus === 'placeholder') {
    if (!mentionsPlaceholder(value.alt) && !mentionsPlaceholder(value.caption)) {
      problems.push('Placeholder images must say so in the alt text or caption.')
    }
  }

  if (value.provenanceStatus === 'unverified' && !value.provenanceNote?.trim()) {
    problems.push('Unverified images need a note explaining what is unknown.')
  }

  return problems
}

export function sourceQuoteProblems(value: {text?: string; attribution?: string; source?: string} | undefined): string[] {
  if (!value) return ['A source quote needs the quotation, who said it, and where it comes from.']
  const problems: string[] = []
  if (!value.text?.trim()) problems.push('Quote text is required.')
  if (!value.attribution?.trim()) problems.push('Attribution is required — who is speaking.')
  if (!value.source?.trim()) problems.push('Source is required — the work, interview, or document.')
  return problems
}

const BLOCK_TITLES: Record<string, string> = {
  bodyImage: 'Body Image',
  wideImage: 'Wide Image',
  fullImage: 'Full Image',
  portraitImage: 'Portrait Image',
  imagePair: 'Image Pair',
  gallery: 'Gallery',
  pullQuote: 'Pull Quote',
  sourceQuote: 'Source Quote',
  epigraph: 'Epigraph',
  aside: 'Aside / Context',
  videoEmbed: 'Video',
  divider: 'Divider',
  sourceNote: 'Source Note',
}

/** Shared insert menu; Feature may use every editorial block. */
export const FEATURE_BODY_BLOCKS = [
  'block',
  'bodyImage',
  'wideImage',
  'fullImage',
  'portraitImage',
  'imagePair',
  'gallery',
  'pullQuote',
  'sourceQuote',
  'epigraph',
  'aside',
  'videoEmbed',
  'divider',
  'sourceNote',
] as const

export const ESSAY_BODY_BLOCKS = [
  'block',
  'bodyImage',
  'wideImage',
  'portraitImage',
  'pullQuote',
  'sourceQuote',
  'aside',
  'divider',
  'sourceNote',
] as const

export const FIELD_NOTE_BODY_BLOCKS = [
  'block',
  'bodyImage',
  'pullQuote',
  'sourceQuote',
  'divider',
  'sourceNote',
] as const

export const BODY_BLOCKS_BY_STORY_TYPE: Record<StoryType, readonly string[]> = {
  feature: FEATURE_BODY_BLOCKS,
  essay: ESSAY_BODY_BLOCKS,
  fieldNote: FIELD_NOTE_BODY_BLOCKS,
}

export function isStoryType(value: unknown): value is StoryType {
  return STORY_TYPES.includes(value as StoryType)
}

/** Semantic body-block rules by storyType. Insert menu stays shared. */
export function bodyBlockProblems(
  body: {_type?: string}[] | undefined,
  storyType: unknown,
): string[] {
  if (!isStoryType(storyType) || !body?.length) return []

  const allowed = new Set(BODY_BLOCKS_BY_STORY_TYPE[storyType])
  const label = STORY_TYPE_LABELS[storyType]
  const seen = new Set<string>()
  const problems: string[] = []

  for (const block of body) {
    const type = block._type
    if (!type || type === 'block' || allowed.has(type) || seen.has(type)) continue
    seen.add(type)
    const title = BLOCK_TITLES[type] || type
    problems.push(
      `${title} is not used in ${label}s. Remove the block, or change the story type.`,
    )
  }

  return problems
}
