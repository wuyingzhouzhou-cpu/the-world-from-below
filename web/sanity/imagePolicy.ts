export type ImagePresentation = 'body' | 'wide' | 'full' | 'portrait' | 'hero'

export type ImagePublicationState = {
  withheld: boolean
  previewSafe: boolean
  placeholder: boolean
}

const BLOCK_PRESENTATION: Record<string, ImagePresentation> = {
  bodyImage: 'body',
  wideImage: 'wide',
  fullImage: 'full',
  portraitImage: 'portrait',
}

export function presentationFromBlockType(type: string | undefined): ImagePresentation | null {
  if (!type) return null
  return BLOCK_PRESENTATION[type] ?? null
}

/** `rights: unknown` is the CMS equivalent of do-not-publish-as-documentary. */
export function imagePublicationState(value: {
  rights?: string
  provenanceStatus?: string
} | undefined): ImagePublicationState {
  const rights = value?.rights
  const provenance = value?.provenanceStatus
  const withheld = rights === 'unknown'
  return {
    withheld,
    previewSafe: withheld,
    placeholder: provenance === 'placeholder' || rights === 'placeholder',
  }
}
