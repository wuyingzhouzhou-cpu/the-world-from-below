import assert from 'node:assert/strict'
import test from 'node:test'
import {asForce} from '../sanity/home.ts'

test('force view mapping keeps question and places', () => {
  const force = asForce({
    _id: 'force.work',
    name: 'Work',
    slug: 'work',
    question: 'What does labour do to a life?',
    description: 'Work organizes time.',
    places: [{_id: 'place.shenyang', name: 'Shenyang', slug: 'shenyang'}],
  })
  assert.equal(force?.name, 'Work')
  assert.equal(force?.places[0].slug, 'shenyang')
})
