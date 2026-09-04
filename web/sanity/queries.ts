import {defineQuery} from 'next-sanity'

export const STORY_TYPES = ['feature', 'essay', 'fieldNote'] as const

export type StoryType = (typeof STORY_TYPES)[number]

const imageProjection = `
  ...,
  image {
    ...,
    asset->
  }
`

const storyCardProjection = `
  _id,
  _type,
  storyType,
  visualMood,
  title,
  dek,
  "slug": slug.current,
  publishedAt,
  noteNumber,
  metaTitle,
  metaDescription,
  canonicalUrl,
  authors[]->{_id, name},
  hero { ${imageProjection} },
  places[]->{_id, name, "slug": slug.current, country, region},
  forces[]->{_id, name, "slug": slug.current, question}
`

const storyProjection = `
  ${storyCardProjection},
  socialImage,
  body[]{
    ...,
    image { ..., asset-> },
    _type == "imagePair" => {
      ...,
      left { ..., image { ..., asset-> } },
      right { ..., image { ..., asset-> } }
    },
    _type == "gallery" => {
      ...,
      images[]{ ..., image { ..., asset-> } }
    }
  },
  sources,
  relatedStories[]->{_id, title, storyType, "slug": slug.current},
  relatedLibraryItems[]->{_id, title, creator, medium, "slug": slug.current}
`

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    question,
    tagline,
    newsletterName,
    newsletterDescription,
    homepageCover
  }
`)

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    title,
    lede,
    sections[]{heading, body}
  }
`)

export const homepageQuery = defineQuery(`
  {
    "settings": *[_type == "siteSettings"][0]{
      title,
      question,
      tagline,
      newsletterName,
      newsletterDescription,
      homepageCover
    },
    "stories": *[_type == "story"] | order(coalesce(publishedAt, _updatedAt) desc) {
      ${storyCardProjection}
    },
    "places": *[_type == "place"] | order(name asc) {
      _id, name, "slug": slug.current, country, region, summary,
      image { ${imageProjection} },
      forces[]->{_id, name, "slug": slug.current}
    },
    "forces": *[_type == "force"] | order(name asc) {
      _id, name, "slug": slug.current, question, description,
      places[]->{_id, name, "slug": slug.current}
    },
    "library": *[_type == "libraryItem"] | order(title asc) {
      _id, title, "slug": slug.current, creator, year, medium,
      whyICame,
      cover { ${imageProjection} },
      forces[]->{_id, name, "slug": slug.current},
      places[]->{_id, name, "slug": slug.current}
    }
  }
`)

export const allStoriesQuery = defineQuery(`
  *[_type == "story"] | order(coalesce(publishedAt, _updatedAt) desc) {
    ${storyCardProjection}
  }
`)

export const storiesByStoryTypeQuery = defineQuery(`
  *[_type == "story" && storyType == $storyType] | order(coalesce(publishedAt, _updatedAt) desc) {
    ${storyCardProjection}
  }
`)

export const storyBySlugQuery = defineQuery(`
  *[_type == "story" && slug.current == $slug][0]{
    ${storyProjection}
  }
`)

export const storiesByPlaceQuery = defineQuery(`
  *[_type == "story" && $placeId in places[]._ref] | order(coalesce(publishedAt, _updatedAt) desc) {
    ${storyCardProjection}
  }
`)

export const storiesByForceQuery = defineQuery(`
  *[_type == "story" && $forceId in forces[]._ref] | order(coalesce(publishedAt, _updatedAt) desc) {
    ${storyCardProjection}
  }
`)

export const allPlacesQuery = defineQuery(`
  *[_type == "place"] | order(name asc) {
    _id, name, "slug": slug.current, country, region, summary,
    image { ${imageProjection} },
    forces[]->{_id, name, "slug": slug.current}
  }
`)

export const placeBySlugQuery = defineQuery(`
  *[_type == "place" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, country, region, summary,
    image { ${imageProjection} },
    forces[]->{_id, name, "slug": slug.current, question}
  }
`)

export const allForcesQuery = defineQuery(`
  *[_type == "force"] | order(name asc) {
    _id, name, "slug": slug.current, question, description,
    places[]->{_id, name, "slug": slug.current}
  }
`)

export const forceBySlugQuery = defineQuery(`
  *[_type == "force" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, question, description,
    places[]->{_id, name, "slug": slug.current}
  }
`)

export const libraryItemsByForceQuery = defineQuery(`
  *[_type == "libraryItem" && $forceId in forces[]._ref] | order(title asc) {
    _id, title, "slug": slug.current, creator, year, medium
  }
`)

export const libraryItemsByPlaceQuery = defineQuery(`
  *[_type == "libraryItem" && $placeId in places[]._ref] | order(title asc) {
    _id, title, "slug": slug.current, creator, year, medium
  }
`)

export const allLibraryItemsQuery = defineQuery(`
  *[_type == "libraryItem"] | order(title asc) {
    _id, title, "slug": slug.current, creator, year, medium,
    whyICame,
    cover { ${imageProjection} },
    forces[]->{_id, name, "slug": slug.current},
    places[]->{_id, name, "slug": slug.current}
  }
`)

export const libraryItemBySlugQuery = defineQuery(`
  *[_type == "libraryItem" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, creator, year, medium,
    cover { ${imageProjection} },
    whyICame, whoseWorld, largerForces, whatChoicesRemain, oneQuestion, readWatchNext,
    places[]->{_id, name, "slug": slug.current, country, region},
    forces[]->{_id, name, "slug": slug.current}
  }
`)

export const searchQuery = defineQuery(`
  {
    "stories": *[_type == "story" && (title match $pattern || dek match $pattern)] | order(coalesce(publishedAt, _updatedAt) desc)[0...12] {
      _id, title, dek, storyType, "slug": slug.current
    },
    "places": *[_type == "place" && (name match $pattern || summary match $pattern)] | order(name asc)[0...12] {
      _id, name, summary, "slug": slug.current, country, region
    },
    "forces": *[_type == "force" && (name match $pattern || question match $pattern || description match $pattern)] | order(name asc)[0...12] {
      _id, name, question, "slug": slug.current
    },
    "library": *[_type == "libraryItem" && (title match $pattern || creator match $pattern || whyICame match $pattern)] | order(title asc)[0...12] {
      _id, title, creator, medium, "slug": slug.current
    }
  }
`)
