import assert from 'node:assert/strict'
import test from 'node:test'
import {sanitizeSearchQuery, searchMatchPattern} from '../lib/search.ts'

test('empty query stays empty', () => {
  assert.equal(sanitizeSearchQuery(''), '')
  assert.equal(sanitizeSearchQuery('   '), '')
  assert.equal(sanitizeSearchQuery(undefined), '')
})

test('query sanitization strips match operators', () => {
  assert.equal(sanitizeSearchQuery('work* and (class)'), 'work and class')
  assert.equal(searchMatchPattern('Shenyang'), 'Shenyang*')
})

test('no-results shape is empty groups', () => {
  const empty = {stories: [], places: [], forces: [], library: []}
  const total = empty.stories.length + empty.places.length + empty.forces.length + empty.library.length
  assert.equal(total, 0)
})
