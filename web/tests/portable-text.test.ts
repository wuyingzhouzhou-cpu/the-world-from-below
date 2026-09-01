import assert from 'node:assert/strict'
import test from 'node:test'
import {componentForBlockType} from '../components/editorial/blockMap.ts'

test('pullQuote maps to PullQuote renderer', () => {
  assert.equal(componentForBlockType('pullQuote'), 'PullQuote')
})

test('sourceQuote maps to SourceQuote renderer', () => {
  assert.equal(componentForBlockType('sourceQuote'), 'SourceQuote')
})

test('body image maps to BodyImage', () => {
  assert.equal(componentForBlockType('bodyImage'), 'BodyImage')
})

test('wide image maps to WideImage', () => {
  assert.equal(componentForBlockType('wideImage'), 'WideImage')
})

test('full image maps to FullImage', () => {
  assert.equal(componentForBlockType('fullImage'), 'FullImage')
})

test('aside maps to EditorialAside', () => {
  assert.equal(componentForBlockType('aside'), 'EditorialAside')
})

test('unknown block fails gracefully', () => {
  assert.equal(componentForBlockType('notARealBlock'), null)
  assert.doesNotThrow(() => componentForBlockType(undefined))
})
