import assert from 'node:assert/strict'
import test from 'node:test'
import {toStoryViewModel} from '../sanity/story.ts'

const rawFeature = {
  _id: 'story.when-the-factory-closed',
  _type: 'story',
  storyType: 'feature',
  visualMood: 'documentary',
  title: 'When the Factory Closed',
  dek: 'In the industrial northeast of China, the collapse of the state-owned work unit meant more than unemployment.',
  slug: 'when-the-factory-closed',
  publishedAt: '2026-09-01T12:00:00.000Z',
  authors: [{_id: 'author.unassigned', name: '[Author Name]'}],
  places: [{_id: 'place.shenyang', name: 'Shenyang', slug: 'shenyang', country: 'China', region: 'Northeast'}],
  forces: [{_id: 'force.work', name: 'Work', slug: 'work'}],
  relatedStories: [{_id: 'story.editorial-demo-essay', title: 'Editorial Demo Essay', slug: 'editorial-demo-essay', storyType: 'essay'}],
  relatedLibraryItems: [{_id: 'library.factory-girls', title: 'Factory Girls', creator: 'Leslie T. Chang', medium: 'book'}],
  sources: [{citation: 'Leslie T. Chang, Factory Girls (2008)', note: 'Secondary source'}],
  body: [{_type: 'block', _key: 'p1'}],
}

test('stored storyType remains storyType', () => {
  const story = toStoryViewModel(rawFeature)
  assert.equal(story.storyType, 'feature')
  assert.equal(story.id, 'story.when-the-factory-closed')
})

test('visualMood is preserved', () => {
  assert.equal(toStoryViewModel(rawFeature).visualMood, 'documentary')
})

test('relatedStories are mapped', () => {
  const story = toStoryViewModel(rawFeature)
  assert.equal(story.relatedStories.length, 1)
  assert.equal(story.relatedStories[0].slug, 'editorial-demo-essay')
  assert.equal(story.relatedStories[0].storyType, 'essay')
})

test('relatedLibraryItems are mapped', () => {
  const story = toStoryViewModel(rawFeature)
  assert.equal(story.relatedLibraryItems[0].title, 'Factory Girls')
  assert.equal(story.relatedLibraryItems[0].creator, 'Leslie T. Chang')
})

test('sources use CMS citation fields only', () => {
  const story = toStoryViewModel(rawFeature)
  assert.equal(story.sources[0].citation, 'Leslie T. Chang, Factory Girls (2008)')
  assert.equal(story.sources[0].note, 'Secondary source')
  assert.equal('publisher' in story.sources[0], false)
})
