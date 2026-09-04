import assert from 'node:assert/strict'
import test from 'node:test'
import {resolveCoverMode} from '../lib/cover.ts'
import {COVER_IMAGE_WIDTHS, coverImageSizes, srcsetFromUrl} from '../lib/coverImage.ts'
import {toHomepageView} from '../sanity/home.ts'

const feature = {
  _id: 'story.1',
  title: 'When the Factory Closed',
  slug: 'when-the-factory-closed',
  storyType: 'feature',
  visualMood: 'documentary',
  dek: 'Dek long enough to map.',
  hero: {externalUrl: 'https://example.com/a.jpg', alt: 'placeholder'},
  forces: [{_id: 'force.work', name: 'Work', slug: 'work'}],
}

test('stored photo cover mode is used', () => {
  const home = toHomepageView(
    {
      settings: {title: 'The World From Below', homepageCover: 'photo'},
      stories: [feature],
      places: [],
      forces: [{_id: 'force.work', name: 'Work', slug: 'work', question: 'What does labour do?'}],
      library: [],
    },
    undefined,
  )
  assert.equal(home.coverMode, 'photo')
  assert.equal(home.lead?.title, 'When the Factory Closed')
  assert.equal(home.featuredForce?.name, 'Work')
})

test('missing optional image falls back to typographic cover', () => {
  assert.equal(resolveCoverMode(undefined, false), 'typographic')
  assert.equal(resolveCoverMode('split', true), 'split')
})

test('featured story projection excludes the lead', () => {
  const home = toHomepageView({
    settings: {homepageCover: 'photo'},
    stories: [
      feature,
      {_id: 'story.2', title: 'Editorial Demo Essay', slug: 'editorial-demo-essay', storyType: 'essay', dek: 'Placeholder essay used to verify mapping.'},
    ],
  })
  assert.equal(home.featuredStory?.slug, 'editorial-demo-essay')
})

test('homepage cover srcset includes 390 through 1440', () => {
  assert.deepEqual([...COVER_IMAGE_WIDTHS], [390, 768, 1024, 1440, 1920])
  const srcset = srcsetFromUrl(
    'https://images.unsplash.com/photo-x?w=1600&auto=format',
    [...COVER_IMAGE_WIDTHS],
  )
  assert.match(String(srcset), /w=390/)
  assert.match(String(srcset), /390w/)
  assert.match(String(srcset), /768w/)
  assert.match(String(srcset), /1024w/)
  assert.match(String(srcset), /1440w/)
})

test('cover sizes distinguish photo and split layouts', () => {
  assert.match(coverImageSizes('photo'), /100vw/)
  assert.match(coverImageSizes('split'), /767px/)
})
