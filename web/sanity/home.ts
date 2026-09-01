import {resolveCoverMode, type CoverMode} from '../lib/cover.ts'
import {toStoryViewModel, type StoryViewModel} from './story.ts'

export type SiteSettingsView = {
  title: string
  question?: string
  tagline?: string
  newsletterName?: string
  newsletterDescription?: string
  homepageCover?: CoverMode
}

export type PlaceCard = {
  id: string
  name: string
  slug?: string
  country?: string
  region?: string
  summary?: string
  image?: Record<string, unknown>
  forces: {id: string; name: string; slug?: string}[]
}

export type ForceCard = {
  id: string
  name: string
  slug?: string
  question?: string
  description?: string
  places: {id: string; name: string; slug?: string}[]
  storyCount?: number
}

export type LibraryCard = {
  id: string
  title: string
  slug?: string
  creator?: string
  year?: number
  medium?: string
  whyICame?: string
  cover?: Record<string, unknown>
  forces: {id: string; name: string; slug?: string}[]
}

export type HomepageView = {
  settings: SiteSettingsView
  coverMode: CoverMode
  lead?: StoryViewModel
  featuredStory?: StoryViewModel
  fieldNotes: StoryViewModel[]
  featuredFieldNote?: StoryViewModel
  featuredLibrary?: LibraryCard
  supportingLibrary: LibraryCard[]
  featuredPlace?: PlaceCard
  otherPlaces: PlaceCard[]
  forces: ForceCard[]
  featuredForce?: ForceCard
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export function toSiteSettings(raw: Record<string, unknown> | null | undefined): SiteSettingsView {
  return {
    title: text(raw?.title) || 'The World From Below',
    question: text(raw?.question),
    tagline: text(raw?.tagline),
    newsletterName: text(raw?.newsletterName),
    newsletterDescription: text(raw?.newsletterDescription),
    homepageCover: undefined,
  }
}

function asStory(raw: unknown): StoryViewModel | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const story = toStoryViewModel(raw as Record<string, unknown>)
  return story.slug ? story : undefined
}

function asPlace(raw: unknown): PlaceCard | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const row = raw as Record<string, unknown>
  const name = text(row.name)
  if (!name) return undefined
  return {
    id: String(row._id || row.id || name),
    name,
    slug: text(row.slug),
    country: text(row.country),
    region: text(row.region),
    summary: text(row.summary),
    image: row.image && typeof row.image === 'object' ? (row.image as Record<string, unknown>) : undefined,
    forces: Array.isArray(row.forces)
      ? row.forces.flatMap((force) => {
          if (!force || typeof force !== 'object') return []
          const item = force as { _id?: string; name?: string; slug?: string}
          return item.name ? [{id: String(item._id || item.name), name: item.name, slug: item.slug}] : []
        })
      : [],
  }
}

function asForce(raw: unknown): ForceCard | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const row = raw as Record<string, unknown>
  const name = text(row.name)
  if (!name) return undefined
  return {
    id: String(row._id || row.id || name),
    name,
    slug: text(row.slug),
    question: text(row.question),
    description: text(row.description),
    places: Array.isArray(row.places)
      ? row.places.flatMap((place) => {
          if (!place || typeof place !== 'object') return []
          const item = place as {_id?: string; name?: string; slug?: string}
          return item.name ? [{id: String(item._id || item.name), name: item.name, slug: item.slug}] : []
        })
      : [],
  }
}

function asLibrary(raw: unknown): LibraryCard | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const row = raw as Record<string, unknown>
  const title = text(row.title)
  if (!title) return undefined
  return {
    id: String(row._id || row.id || title),
    title,
    slug: text(row.slug),
    creator: text(row.creator),
    year: typeof row.year === 'number' ? row.year : undefined,
    medium: text(row.medium),
    whyICame: text(row.whyICame),
    cover: row.cover && typeof row.cover === 'object' ? (row.cover as Record<string, unknown>) : undefined,
    forces: Array.isArray(row.forces)
      ? row.forces.flatMap((force) => {
          if (!force || typeof force !== 'object') return []
          const item = force as {_id?: string; name?: string; slug?: string}
          return item.name ? [{id: String(item._id || item.name), name: item.name, slug: item.slug}] : []
        })
      : [],
  }
}

export function toHomepageView(raw: Record<string, unknown>, coverOverride?: CoverMode): HomepageView {
  const settingsRaw = (raw.settings as Record<string, unknown>) || {}
  const settings = toSiteSettings(settingsRaw)
  const stories = Array.isArray(raw.stories) ? raw.stories.flatMap((item) => asStory(item) || []) : []
  const places = Array.isArray(raw.places) ? raw.places.flatMap((item) => asPlace(item) || []) : []
  const forces = Array.isArray(raw.forces) ? raw.forces.flatMap((item) => asForce(item) || []) : []
  const library = Array.isArray(raw.library) ? raw.library.flatMap((item) => asLibrary(item) || []) : []

  const lead = stories.find((story) => story.storyType === 'feature') || stories[0]
  const fieldNotes = stories.filter((story) => story.storyType === 'fieldNote')
  const featuredForceId = lead?.forces[0]?.id
  const featuredForce = forces.find((force) => force.id === featuredForceId) || forces[0]
  const hasLeadImage = Boolean(lead?.hero)

  return {
    settings: {
      ...settings,
      homepageCover: resolveCoverMode(settingsRaw.homepageCover, hasLeadImage),
    },
    coverMode: coverOverride || resolveCoverMode(settingsRaw.homepageCover, hasLeadImage),
    lead,
    featuredStory: stories.find((story) => story.id !== lead?.id),
    fieldNotes,
    featuredFieldNote: fieldNotes[0],
    featuredLibrary: library[0],
    supportingLibrary: library.slice(1, 3),
    featuredPlace: places[0],
    otherPlaces: places.slice(1),
    forces,
    featuredForce,
  }
}

export {asPlace, asForce, asLibrary}
