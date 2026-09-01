import {chromium} from 'playwright'
import {mkdir, readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, '..', 'docs/phase-1-cms')
await mkdir(outDir, {recursive: true})

const envFile = await readFile(join(root, '.env.local'), 'utf8')
const token = envFile.match(/^SANITY_AUTH_TOKEN="?([^"\n]+)"?/m)?.[1]
if (!token) throw new Error('SANITY_AUTH_TOKEN is required')
const claim = 'https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY'
const studioUrl = `http://localhost:3333/#token=${token}&claim=${encodeURIComponent(claim)}`

const browser = await chromium.launch({headless: true})
const page = await browser.newPage({viewport: {width: 1440, height: 900}})

await page.goto(studioUrl, {waitUntil: 'networkidle'})
await page.waitForTimeout(4000)
await page.screenshot({path: join(outDir, '01-studio-navigation.png'), fullPage: true})

const stories = page.getByText('Stories', {exact: true}).first()
if (await stories.count()) await stories.click()
await page.waitForTimeout(500)

const features = page.getByText('Features', {exact: true}).first()
if (await features.count()) await features.click()
await page.waitForTimeout(1500)

const article = page.getByText('When the Factory Closed').first()
if (await article.count()) await article.click()
await page.waitForTimeout(2500)
await page.screenshot({path: join(outDir, '02-feature-editor.png'), fullPage: true})

const insert = page.getByRole('button', {name: /insert/i}).first()
if (await insert.count()) {
  await insert.click()
  await page.waitForTimeout(800)
} else {
  const plus = page.locator('[data-testid="insert-menu-button"], button[aria-label*="Insert"]').first()
  if (await plus.count()) {
    await plus.click()
    await page.waitForTimeout(800)
  }
}
await page.screenshot({path: join(outDir, '03-portable-text-insert-menu.png')})

const bodyImage = page.getByText('Body Image').first()
if (await bodyImage.count()) {
  await bodyImage.click()
  await page.waitForTimeout(1200)
}
await page.screenshot({path: join(outDir, '04-image-block-editor.png'), fullPage: true})

const pullQuote = page.getByText('Pull Quote').first()
if (await pullQuote.count()) {
  await pullQuote.click()
  await page.waitForTimeout(1200)
}
await page.screenshot({path: join(outDir, '05-quote-block-editor.png'), fullPage: true})

await page.goto('http://localhost:3000/preview/when-the-factory-closed', {waitUntil: 'networkidle'})
await page.waitForTimeout(1500)
await page.screenshot({path: join(outDir, '06-article-preview.png'), fullPage: true})

await browser.close()
console.log(`Screenshots written to ${outDir}`)
