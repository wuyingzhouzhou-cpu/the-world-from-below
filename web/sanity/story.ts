export const STORY_TYPES = ['feature', 'essay', 'fieldNote'] as const
export type StoryType = (typeof STORY_TYPES)[number]

export const VISUAL_MOODS = ['documentary', 'quiet', 'archive', 'cinematic', 'minimal'] as const
export type VisualMood = (typeof VISUAL_MOODS)[number]

export const STORY_TYPE_LABELS: Record<StoryType, string> = {
  feature: 'Feature',
  essay: 'Essay',
  fieldNote: 'Field Note',
}

export type AuthorView = {
  id: string
  name: string
}

export type PlaceView = {
  id: string
  name: string
  slug?: string
  country?: string
  region?: string
}

export type ForceView = {
  id: string
  name: string
  slug?: string
}

export type RelatedStoryView = {
  id: string
  title: string
  slug?: string
  storyType?: StoryType
}

export type RelatedLibraryItemView = {
  id: string
  title: string
  creator?: string
  medium?: string
  slug?: string
}

export type SourceView = {
  citation: string
  url?: string
  note?: string
}

export type StoryViewModel = {
  id: string
  title: string
  slug: string
  dek?: string
  storyType: StoryType
  visualMood: VisualMood
  noteNumber?: string
  authors: AuthorView[]
  hero?: Record<string, unknown>
  body: unknown[]
  places: PlaceView[]
  forces: ForceView[]
  publishedAt?: string
  sources: SourceView[]
  relatedStories: RelatedStoryView[]
  relatedLibraryItems: RelatedLibraryItemView[]
}

function isStoryType(value: unknown): value is StoryType {
  return STORY_TYPES.includes(value as StoryType)
}

function isVisualMood(value: unknown): value is VisualMood {
  return VISUAL_MOODS.includes(value as VisualMood)
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function displayableAuthorName(value?: string): string | undefined {
  const name = text(value)
  if (!name) return undefined
  if (/^\[[^\]]+\]$/.test(name)) return undefined
  if (/^author name$/i.test(name)) return undefined
  return name
}

export function toStoryViewModel(raw: Record<string, unknown>): StoryViewModel {
  const storyType = isStoryType(raw.storyType) ? raw.storyType : 'feature'
  const visualMood = isVisualMood(raw.visualMood) ? raw.visualMood : 'documentary'

  return {
    id: String(raw._id || raw.id || ''),
    title: text(raw.title) || 'Untitled',
    slug: text(raw.slug) || '',
    dek: text(raw.dek),
    storyType,
    visualMood,
    noteNumber: text(raw.noteNumber),
    authors: Array.isArray(raw.authors)
      ? raw.authors.flatMap((author) => {
          if (!author || typeof author !== 'object') return []
          const row = author as {_id?: string; name?: string}
          return displayableAuthorName(row.name)
            ? [{id: String(row._id || row.name), name: displayableAuthorName(row.name) as string}]
            : []
        })
      : [],
    hero: raw.hero && typeof raw.hero === 'object' ? (raw.hero as Record<string, unknown>) : undefined,
    body: Array.isArray(raw.body) ? raw.body : [],
    places: Array.isArray(raw.places)
      ? raw.places.flatMap((place) => {
          if (!place || typeof place !== 'object') return []
          const row = place as PlaceView & {_id?: string}
          return row.name
            ? [{id: String(row._id || row.id), name: row.name, slug: row.slug, country: row.country, region: row.region}]
            : []
        })
      : [],
    forces: Array.isArray(raw.forces)
      ? raw.forces.flatMap((force) => {
          if (!force || typeof force !== 'object') return []
          const row = force as ForceView & {_id?: string}
          return row.name ? [{id: String(row._id || row.id), name: row.name, slug: row.slug}] : []
        })
      : [],
    publishedAt: text(raw.publishedAt),
    sources: Array.isArray(raw.sources)
      ? raw.sources.flatMap((source) => {
          if (!source || typeof source !== 'object') return []
          const row = source as SourceView
          return row.citation ? [{citation: row.citation, url: row.url, note: row.note}] : []
        })
      : [],
    relatedStories: Array.isArray(raw.relatedStories)
      ? raw.relatedStories.flatMap((story) => {
          if (!story || typeof story !== 'object') return []
          const row = story as RelatedStoryView & {_id?: string}
          return row.title
            ? [
                {
                  id: String(row._id || row.id),
                  title: row.title,
                  slug: row.slug,
                  storyType: isStoryType(row.storyType) ? row.storyType : undefined,
                },
              ]
            : []
        })
      : [],
    relatedLibraryItems: Array.isArray(raw.relatedLibraryItems)
      ? raw.relatedLibraryItems.flatMap((item) => {
          if (!item || typeof item !== 'object') return []
          const row = item as RelatedLibraryItemView & {_id?: string}
          return row.title
            ? [
                {
                  id: String(row._id || row.id),
                  title: row.title,
                  creator: row.creator,
                  medium: row.medium,
                  slug: row.slug,
                },
              ]
            : []
        })
      : [],
  }
}
