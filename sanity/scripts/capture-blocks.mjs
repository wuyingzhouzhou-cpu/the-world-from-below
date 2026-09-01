import {chromium} from 'playwright'
import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const sanityRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(sanityRoot, '..', 'docs/phase-1-cms')
const envFile = await readFile(join(sanityRoot, '.env.local'), 'utf8')
const token = envFile.match(/^SANITY_AUTH_TOKEN="?([^"\n]+)"?/m)?.[1]
const claim = 'https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY'
const editorUrl = `http://localhost:3333/intent/edit/id=feature.when-the-factory-closed;type=feature#token=${encodeURIComponent(token)}&claim=${encodeURIComponent(claim)}`

const browser = await chromium.launch({headless: true})
const page = await browser.newPage({viewport: {width: 1440, height: 900}})
page.setDefaultTimeout(15000)
await page.goto(editorUrl, {waitUntil: 'domcontentloaded'})
await page.getByTestId('field-dek').waitFor()
const later = page.getByRole('button', {name: /remind me later/i})
if (await later.count()) await later.first().click().catch(() => {})

await page.getByRole('tab', {name: 'Body'}).click()
await page.waitForTimeout(800)

const bodyImagePreview = page.locator('text=Body Image · placeholder').first()
await bodyImagePreview.click({force: true})
await page.waitForTimeout(400)
await page.locator('text=Body Image · placeholder').first().dblclick({force: true}).catch(() => {})
await page.waitForTimeout(1000)
const editButton = page.getByRole('button', {name: /^edit$/i}).first()
if (await editButton.count()) await editButton.click().catch(() => {})
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '04-image-block-editor.png'), fullPage: true})

await page.keyboard.press('Escape')
await page.waitForTimeout(400)
const pull = page.locator('[data-testid="field-body"]').getByText('Pull Quote').first()
await pull.click({force: true})
await page.waitForTimeout(400)
await pull.dblclick({force: true}).catch(() => {})
await page.waitForTimeout(800)
if (await editButton.count()) await editButton.click().catch(() => {})
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '05-quote-block-editor.png'), fullPage: true})

await page.getByRole('button', {name: 'Preview'}).click({force: true}).catch(() => {})
await page.waitForTimeout(3000)
await page.screenshot({path: join(outDir, '06b-studio-preview-pane.png'), fullPage: true})

await browser.close()
console.log('done')
