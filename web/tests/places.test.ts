import assert from 'node:assert/strict'
import test from 'node:test'
import {asPlace} from '../sanity/home.ts'

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
