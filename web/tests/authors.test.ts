import assert from 'node:assert/strict'
import test from 'node:test'
import {toStoryViewModel} from '../sanity/story.ts'

test('placeholder author names are omitted', () => {
  const story = toStoryViewModel({
    _id: 's1',
    title: 'Demo',
    slug: 'demo',
    storyType: 'feature',
    authors: [{_id: 'a1', name: '[Author Name]'}],
    body: [],
  })
  assert.equal(story.authors.length, 0)
})
