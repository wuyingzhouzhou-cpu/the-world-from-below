import {chromium} from 'playwright'
import {mkdir, readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const sanityRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(sanityRoot, '..', 'docs/phase-1-cms')
await mkdir(outDir, {recursive: true})

const envFile = await readFile(join(sanityRoot, '.env.local'), 'utf8')
const token = envFile.match(/^SANITY_AUTH_TOKEN="?([^"\n]+)"?/m)?.[1]
if (!token) throw new Error('missing token')
const claim = 'https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY'
const editorUrl = `http://localhost:3333/intent/edit/id=feature.when-the-factory-closed;type=feature#token=${encodeURIComponent(token)}&claim=${encodeURIComponent(claim)}`

const browser = await chromium.launch({headless: true})
const page = await browser.newPage({viewport: {width: 1440, height: 900}})
page.setDefaultTimeout(20000)

await page.goto(editorUrl, {waitUntil: 'domcontentloaded'})
await page.getByTestId('field-dek').waitFor()

const dismiss = page.getByRole('button', {name: /remind me later/i})
if (await dismiss.count()) await dismiss.first().click().catch(() => {})

await page.getByRole('tab', {name: 'Body'}).click()
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '02c-feature-body.png'), fullPage: true})

const editor = page.locator('[data-testid="field-body"] [contenteditable="true"], [data-testid="field-body"] [role="textbox"]').first()
if (await editor.count()) {
  await editor.click()
  await page.waitForTimeout(400)
}

const insertMenu = page.locator('[data-testid="insert-menu-button"], button[aria-label="Insert"]').first()
if (await insertMenu.count() && (await insertMenu.isEnabled().catch(() => false))) {
  await insertMenu.click()
} else {
  const bodyInsert = page.getByTestId('bodyImage-insert-menu-button')
  await page.locator('[data-testid="field-body"]').click({position: {x: 40, y: 40}})
  await page.waitForTimeout(400)
  const enabledInsert = page.locator('button[aria-label^="Insert"]:not([data-disabled="true"])').first()
  if (await enabledInsert.count()) await enabledInsert.click()
  else if (await bodyInsert.count()) await bodyInsert.click({force: true})
}
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '03-portable-text-insert-menu.png')})

await page.keyboard.press('Escape')
await page.getByText('Body Image', {exact: true}).first().click()
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '04-image-block-editor.png'), fullPage: true})

await page.getByText('Pull Quote', {exact: true}).first().click()
await page.waitForTimeout(800)
await page.screenshot({path: join(outDir, '05-quote-block-editor.png'), fullPage: true})

await page.getByRole('button', {name: 'Preview'}).click().catch(async () => {
  await page.getByText('Preview', {exact: true}).nth(1).click()
})
await page.waitForTimeout(2500)
await page.screenshot({path: join(outDir, '06b-studio-preview-pane.png'), fullPage: true})

await browser.close()
console.log('captured editor, insert menu, image, quote, preview')
