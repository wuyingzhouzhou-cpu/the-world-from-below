import assert from 'node:assert/strict'
import test from 'node:test'
import {isLibraryMedium, libraryMediumLabel, toLibraryItemView} from '../sanity/library.ts'

test('library medium mapping accepts stored values', () => {
  assert.equal(isLibraryMedium('book'), true)
  assert.equal(isLibraryMedium('album'), false)
  assert.equal(libraryMediumLabel('book'), 'Book')
})

test('optional structured sections are omitted when empty', () => {
  const item = toLibraryItemView({
    _id: 'library.factory-girls',
    title: 'Factory Girls',
    creator: 'Leslie T. Chang',
    medium: 'book',
    year: 2008,
    whyICame: 'A documented account of factory labour in China.',
  })
  assert.equal(item?.sections.length, 1)
  assert.equal(item?.sections[0].key, 'whyICame')
  assert.equal(item?.sections.some((section) => section.key === 'whoseWorld'), false)
})
