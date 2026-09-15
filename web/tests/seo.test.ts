import assert from 'node:assert/strict'
import test from 'node:test'
import {absoluteUrl, canonicalUrl, siteOrigin} from '../lib/siteUrl.ts'
import {isPreviewAllowed} from '../lib/previewAccess.ts'
import {buildRssXml} from '../lib/rss.ts'
import {articleJsonLd, websiteJsonLd} from '../lib/jsonLd.ts'
import {PUBLIC_INDEX_PATHS, ROBOTS_DISALLOW} from '../lib/seoRoutes.ts'

const local = {NODE_ENV: 'development'}
const prodUnset = {NODE_ENV: 'production'}
const prodConfigured = {NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://example.test'}

test('local origin falls back to localhost', () => {
  assert.equal(siteOrigin(local), 'http://localhost:3000')
  assert.equal(absoluteUrl('/stories/when-the-factory-closed', local), 'http://localhost:3000/stories/when-the-factory-closed')
})

test('production does not invent a publication hostname', () => {
  assert.equal(siteOrigin(prodUnset), undefined)
  assert.equal(absoluteUrl('/', prodUnset), undefined)
})

test('configured site URL is the single canonical origin', () => {
  assert.equal(siteOrigin(prodConfigured), 'https://example.test')
  assert.equal(canonicalUrl('/places/shenyang', undefined, prodConfigured), 'https://example.test/places/shenyang')
  assert.equal(
    canonicalUrl('/stories/x', 'https://example.test/stories/custom', prodConfigured),
    'https://example.test/stories/custom',
  )
})

test('vercel production URL may be used until a custom domain is set', () => {
  assert.equal(
    siteOrigin({NODE_ENV: 'production', VERCEL_URL: 'the-world-from-below.vercel.app'}),
    'https://the-world-from-below.vercel.app',
  )
})

test('preview is open in development and locked in production without a secret', () => {
  assert.equal(isPreviewAllowed({isProduction: false, provided: null}), true)
  assert.equal(isPreviewAllowed({isProduction: true, provided: null}), false)
  assert.equal(isPreviewAllowed({isProduction: true, secret: 'gate', provided: 'gate'}), true)
  assert.equal(isPreviewAllowed({isProduction: true, secret: 'gate', provided: 'nope'}), false)
})

test('RSS lists newest stories first with absolute links', () => {
  const xml = buildRssXml(
    [
      {title: 'Older', slug: 'older', dek: 'A', publishedAt: '2026-01-01T00:00:00.000Z'},
      {title: 'Newer', slug: 'newer', dek: 'B', publishedAt: '2026-09-01T00:00:00.000Z'},
    ],
    {title: 'The World From Below', env: prodConfigured},
  )
  assert.match(String(xml), /<link>https:\/\/example.test\/<\/link>/)
  assert.match(String(xml), /newer[\s\S]*older/)
  assert.doesNotMatch(String(xml), /\/preview\//)
})

test('RSS skips null author joins from Sanity', () => {
  const xml = buildRssXml(
    [
      {
        title: 'Dated',
        slug: 'dated',
        publishedAt: '2026-09-01T00:00:00.000Z',
        authors: [null, {name: 'Yunzhou'}],
      },
    ],
    {title: 'The World From Below', env: prodConfigured},
  )
  assert.match(String(xml), /Yunzhou/)
  assert.match(String(xml), /dated/)
})

test('RSS omits placeholder authors and stories without dates', () => {
  const xml = buildRssXml(
    [
      {title: 'Dated', slug: 'dated', publishedAt: '2026-09-01T00:00:00.000Z', authors: [{name: '[Author Name]'}]},
      {title: 'Undated', slug: 'undated'},
    ],
    {title: 'The World From Below', env: prodConfigured},
  )
  assert.match(String(xml), /dated/)
  assert.doesNotMatch(String(xml), /undated/)
  assert.doesNotMatch(String(xml), /Author Name/)
})

test('article JSON-LD omits placeholder images and requires a canonical URL', () => {
  assert.equal(articleJsonLd({headline: 'A', description: 'B'}), undefined)
  const data = articleJsonLd({
    headline: 'When the Factory Closed',
    url: 'https://example.test/stories/when-the-factory-closed',
    datePublished: '2026-09-01T12:00:00.000Z',
    authors: [{name: 'Leslie T. Chang'}],
    imageUrl: 'https://images.unsplash.com/photo-x',
    image: {provenanceStatus: 'placeholder', rights: 'placeholder'},
  })
  assert.equal(data?.['@type'], 'Article')
  assert.equal(data?.image, undefined)
  assert.deepEqual(data?.author, [{'@type': 'Person', name: 'Leslie T. Chang'}])
})

test('website JSON-LD requires an origin', () => {
  assert.equal(websiteJsonLd({name: 'The World From Below'}), undefined)
  assert.equal(
    websiteJsonLd({name: 'The World From Below', url: 'https://example.test/'})?.['@type'],
    'WebSite',
  )
})

test('sitemap index paths exclude preview and search permutations', () => {
  assert.deepEqual([...PUBLIC_INDEX_PATHS], ['/', '/stories', '/places', '/forces', '/library', '/about'])
  assert.ok(!PUBLIC_INDEX_PATHS.some((path) => path.includes('preview') || path.includes('search')))
  assert.ok(ROBOTS_DISALLOW.some((path) => path.includes('/preview')))
})
