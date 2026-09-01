const LIBRARY_SECTIONS = [
  {key: 'whyICame', label: 'Why I Came to This Work', n: 'I'},
  {key: 'whoseWorld', label: 'Whose World Does It Open?', n: 'II'},
  {key: 'largerForces', label: 'The Larger Forces', n: 'III'},
  {key: 'whatChoicesRemain', label: 'What Choices Remain?', n: 'IV'},
  {key: 'oneQuestion', label: 'One Question I Kept Thinking About', n: 'V'},
  {key: 'readWatchNext', label: 'Read / Watch Next', n: 'VI'},
] as const

export const LIBRARY_MEDIA = ['book', 'film', 'photography', 'documentary', 'essay', 'other'] as const
export type LibraryMedium = (typeof LIBRARY_MEDIA)[number]

export const LIBRARY_MEDIUM_LABELS: Record<LibraryMedium, string> = {
  book: 'Book',
  film: 'Film',
  photography: 'Photography',
  documentary: 'Documentary',
  essay: 'Essay',
  other: 'Other',
}

export function isLibraryMedium(value: unknown): value is LibraryMedium {
  return LIBRARY_MEDIA.includes(value as LibraryMedium)
}

export function libraryMediumLabel(value?: string) {
  if (!value) return undefined
  if (isLibraryMedium(value)) return LIBRARY_MEDIUM_LABELS[value]
  return value
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export type LibraryItemView = {
  id: string
  title: string
  slug?: string
  creator?: string
  year?: number
  medium?: string
  cover?: Record<string, unknown>
  places: {id: string; name: string; slug?: string}[]
  forces: {id: string; name: string; slug?: string}[]
  sections: {key: string; label: string; n: string; body: string}[]
}

export function toLibraryItemView(raw: Record<string, unknown> | null | undefined): LibraryItemView | null {
  if (!raw) return null
  const title = text(raw.title)
  if (!title) return null
  const sections = LIBRARY_SECTIONS.flatMap((section) => {
    const body = text(raw[section.key])
    return body ? [{key: section.key, label: section.label, n: section.n, body}] : []
  })
  return {
    id: String(raw._id || raw.id || title),
    title,
    slug: text(raw.slug),
    creator: text(raw.creator),
    year: typeof raw.year === 'number' ? raw.year : undefined,
    medium: text(raw.medium),
    cover: raw.cover && typeof raw.cover === 'object' ? (raw.cover as Record<string, unknown>) : undefined,
    places: Array.isArray(raw.places)
      ? raw.places.flatMap((place) => {
          if (!place || typeof place !== 'object') return []
          const row = place as {_id?: string; name?: string; slug?: string}
          return row.name ? [{id: String(row._id || row.name), name: row.name, slug: row.slug}] : []
        })
      : [],
    forces: Array.isArray(raw.forces)
      ? raw.forces.flatMap((force) => {
          if (!force || typeof force !== 'object') return []
          const row = force as {_id?: string; name?: string; slug?: string}
          return row.name ? [{id: String(row._id || row.name), name: row.name, slug: row.slug}] : []
        })
      : [],
    sections,
  }
}
