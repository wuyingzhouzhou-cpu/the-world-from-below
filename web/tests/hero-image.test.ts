import assert from 'node:assert/strict'
import test from 'node:test'
import {COVER_IMAGE_WIDTHS, srcsetFromUrl} from '../lib/coverImage.ts'

test('story hero widths include launch breakpoints', () => {
  const srcset = srcsetFromUrl('https://cdn.example/hero.jpg?w=1600', [...COVER_IMAGE_WIDTHS])
  assert.match(String(srcset), /390w/)
  assert.match(String(srcset), /768w/)
  assert.match(String(srcset), /1024w/)
  assert.match(String(srcset), /1440w/)
})
