import {bodyBlockProblems, editorialImageProblems, sourceQuoteProblems} from '../lib/validation.ts'
import assert from 'node:assert/strict'
import test from 'node:test'

test('placeholder images must say so in alt or caption', () => {
  const problems = editorialImageProblems({
    externalUrl: 'https://example.com/photo.jpg',
    alt: 'Factory gates at dawn',
    provenanceStatus: 'placeholder',
  })
  assert.ok(problems.some((problem) => /placeholder/i.test(problem)))
})

test('verified images require credit or source', () => {
  const problems = editorialImageProblems({
    externalUrl: 'https://example.com/photo.jpg',
    alt: 'Workers leaving a factory',
    provenanceStatus: 'verified',
  })
  assert.ok(problems.some((problem) => /credit or a source/i.test(problem)))
})

test('a complete placeholder body image is valid', () => {
  const problems = editorialImageProblems({
    externalUrl: 'https://images.unsplash.com/photo-1569167419666-e94167ac991d',
    alt: 'PLACEHOLDER IMAGE — industrial scene, editorial demo',
    caption: 'PLACEHOLDER IMAGE · EXAMPLE CAPTION · editorial demo only',
    provenanceStatus: 'placeholder',
    rights: 'placeholder',
  })
  assert.deepEqual(problems, [])
})

test('empty optional images are allowed', () => {
  assert.deepEqual(editorialImageProblems(undefined, {required: false}), [])
})

test('source quotes require text, attribution, and source', () => {
  const problems = sourceQuoteProblems({text: 'Hello'})
  assert.equal(problems.length, 2)
})

test('features may use cinematic blocks', () => {
  assert.deepEqual(bodyBlockProblems([{_type: 'fullImage'}, {_type: 'epigraph'}], 'feature'), [])
})

test('essays reject full image, gallery, video, and epigraph', () => {
  const problems = bodyBlockProblems(
    [{_type: 'block'}, {_type: 'fullImage'}, {_type: 'epigraph'}],
    'essay',
  )
  assert.ok(problems.some((problem) => /Full Image/.test(problem)))
  assert.ok(problems.some((problem) => /Epigraph/.test(problem)))
})

test('field notes reject wide image and gallery', () => {
  const problems = bodyBlockProblems(
    [{_type: 'wideImage'}, {_type: 'gallery'}, {_type: 'bodyImage'}],
    'fieldNote',
  )
  assert.ok(problems.some((problem) => /Wide Image/.test(problem)))
  assert.ok(problems.some((problem) => /Gallery/.test(problem)))
  assert.equal(
    problems.some((problem) => /Body Image/.test(problem)),
    false,
  )
})
