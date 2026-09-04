import assert from 'node:assert/strict'
import test from 'node:test'
import {asPlace} from '../sanity/home.ts'
import {toRelatedLibraryItems} from '../sanity/library.ts'

test('place view mapping keeps stored identity', () => {
  const place = asPlace({
    _id: 'place.shenyang',
    name: 'Shenyang',
    slug: 'shenyang',
    country: 'China',
    region: 'Northeast',
    summary: 'Once the iron heart of Chinese socialist industry.',
    forces: [{_id: 'force.work', name: 'Work', slug: 'work'}],
  })
  assert.equal(place?.name, 'Shenyang')
  assert.equal(place?.forces[0].name, 'Work')
})

test('place mapping ignores nameless records', () => {
  assert.equal(asPlace({_id: 'x'}), undefined)
})

test('place related library mapping keeps stored works', () => {
  const items = toRelatedLibraryItems([
    {_id: 'library.factory-girls', title: 'Factory Girls', slug: 'factory-girls', creator: 'Leslie T. Chang'},
    {_id: 'empty'},
  ])
  assert.equal(items.length, 1)
  assert.equal(items[0].slug, 'factory-girls')
  assert.equal(items[0].creator, 'Leslie T. Chang')
})

test('place related library is omitted when none match', () => {
  assert.deepEqual(toRelatedLibraryItems([]), [])
  assert.deepEqual(toRelatedLibraryItems(undefined), [])
})
