import assert from 'node:assert/strict'
import test from 'node:test'
import {imagePublicationState, presentationFromBlockType} from '../sanity/imagePolicy.ts'

test('block types map to semantic presentations', () => {
  assert.equal(presentationFromBlockType('bodyImage'), 'body')
  assert.equal(presentationFromBlockType('wideImage'), 'wide')
  assert.equal(presentationFromBlockType('fullImage'), 'full')
  assert.equal(presentationFromBlockType('portraitImage'), 'portrait')
})

test('unknown rights are withheld from publication', () => {
  const state = imagePublicationState({rights: 'unknown', provenanceStatus: 'unverified'})
  assert.equal(state.withheld, true)
  assert.equal(state.previewSafe, true)
})

test('placeholder provenance is labeled, not treated as verified documentary', () => {
  const state = imagePublicationState({rights: 'placeholder', provenanceStatus: 'placeholder'})
  assert.equal(state.placeholder, true)
  assert.equal(state.withheld, false)
})
