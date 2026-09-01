import {createClient} from 'next-sanity'
import {
  allStoriesQuery,
  storiesByForceQuery,
  storiesByPlaceQuery,
  storiesByStoryTypeQuery,
  storyBySlugQuery,
} from './queries.ts'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-06-23',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const feature = await client.fetch(storyBySlugQuery, {slug: 'when-the-factory-closed'})
assert(feature?._id === 'story.when-the-factory-closed', 'seeded Feature missing')
assert(feature._type === 'story', 'Feature is not a story document')
assert(feature.storyType === 'feature', 'storyType is not a stored feature value')
assert(feature.visualMood === 'documentary', 'visualMood mismatch')
assert(feature.title === 'When the Factory Closed', 'Feature title mismatch')
assert(
  Array.isArray(feature.places) && feature.places.some((place: {name?: string}) => place.name === 'Shenyang'),
  'stories related to Place missing',
)
assert(
  Array.isArray(feature.forces) && feature.forces.some((force: {name?: string}) => force.name === 'Work'),
  'stories related to Force missing',
)
assert(
  Array.isArray(feature.relatedLibraryItems) &&
    feature.relatedLibraryItems.some((item: {title?: string}) => item.title === 'Factory Girls'),
  'relatedLibraryItems missing',
)
assert(
  Array.isArray(feature.relatedStories) &&
    feature.relatedStories.some(
      (story: {slug?: string; storyType?: string}) =>
        story.slug === 'editorial-demo-essay' && story.storyType === 'essay',
    ),
  'relatedStories missing',
)

const allStories = await client.fetch(allStoriesQuery)
assert(
  allStories.some((story: {_id?: string}) => story._id === 'story.when-the-factory-closed'),
  'all stories query missing Feature',
)
assert(
  allStories.some((story: {_id?: string}) => story._id === 'story.editorial-demo-essay'),
  'all stories query missing Essay',
)

const features = await client.fetch(storiesByStoryTypeQuery, {storyType: 'feature'})
assert(
  features.every((story: {storyType?: string}) => story.storyType === 'feature'),
  'feature filter leaked other types',
)
assert(
  features.some((story: {slug?: string}) => story.slug === 'when-the-factory-closed'),
  'feature filter missed seeded Feature',
)

const essays = await client.fetch(storiesByStoryTypeQuery, {storyType: 'essay'})
assert(
  essays.every((story: {storyType?: string}) => story.storyType === 'essay'),
  'essay filter leaked other types',
)
assert(
  essays.some((story: {slug?: string}) => story.slug === 'editorial-demo-essay'),
  'essay filter missed seeded Essay',
)

const fieldNotes = await client.fetch(storiesByStoryTypeQuery, {storyType: 'fieldNote'})
assert(
  Array.isArray(fieldNotes) && fieldNotes.every((story: {storyType?: string}) => story.storyType === 'fieldNote'),
  'fieldNote filter leaked other types',
)

const byPlace = await client.fetch(storiesByPlaceQuery, {placeId: 'place.shenyang'})
assert(
  byPlace.some((story: {_id?: string}) => story._id === 'story.when-the-factory-closed'),
  'Place relation query missed Feature',
)

const byForce = await client.fetch(storiesByForceQuery, {forceId: 'force.work'})
assert(
  byForce.some((story: {_id?: string}) => story._id === 'story.when-the-factory-closed'),
  'Force relation query missed Feature',
)

console.log(
  JSON.stringify(
    {
      feature: feature.title,
      id: feature._id,
      type: feature._type,
      storyType: feature.storyType,
      visualMood: feature.visualMood,
      places: feature.places.map((place: {name?: string}) => place.name),
      forces: feature.forces.map((force: {name?: string}) => force.name),
      relatedLibraryItems: feature.relatedLibraryItems.map((item: {title?: string}) => item.title),
      relatedStories: feature.relatedStories.map((story: {_id?: string; storyType?: string}) => ({
        id: story._id,
        storyType: story.storyType,
      })),
      counts: {
        all: allStories.length,
        feature: features.length,
        essay: essays.length,
        fieldNote: fieldNotes.length,
      },
    },
    null,
    2,
  ),
)
