import {chromium} from 'playwright'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const outDir = path.join(root, 'docs/phase-2')
const base = process.env.BASE_URL || 'http://localhost:3000'

const shots = [
  {file: '01-home-photo-1440.png', url: '/', width: 1440, height: 900},
  {file: '02-home-photo-390.png', url: '/', width: 390, height: 844},
  {file: '03-home-typographic-1440.png', url: '/preview/home/typographic', width: 1440, height: 900},
  {file: '04-home-split-1440.png', url: '/preview/home/split', width: 1440, height: 900},
  {file: '05-story-feature-1440.png', url: '/stories/when-the-factory-closed', width: 1440, height: 900},
  {file: '06-story-feature-390.png', url: '/stories/when-the-factory-closed', width: 390, height: 844},
  {file: '07-story-essay-1440.png', url: '/stories/editorial-demo-essay', width: 1440, height: 900},
  {file: '08-story-field-note-390.png', url: '/stories?type=fieldNote', width: 390, height: 844},
  {file: '09-stories-index-1440.png', url: '/stories', width: 1440, height: 900},
  {file: '10-places-index-1440.png', url: '/places', width: 1440, height: 900},
  {file: '11-place-detail-1440.png', url: '/places/shenyang', width: 1440, height: 900},
  {file: '12-forces-index-1440.png', url: '/forces', width: 1440, height: 900},
  {file: '13-force-detail-1440.png', url: '/forces/work', width: 1440, height: 900},
  {file: '14-library-index-1440.png', url: '/library', width: 1440, height: 900},
  {file: '15-library-detail-1440.png', url: '/library/factory-girls', width: 1440, height: 900},
  {file: '16-about-1440.png', url: '/about', width: 1440, height: 900},
  {file: '17-search-results-1440.png', url: '/search?q=factory', width: 1440, height: 900},
  {file: '18-search-results-390.png', url: '/search?q=factory', width: 390, height: 844},
]

const extraViewports = [768, 1024]

await mkdir(outDir, {recursive: true})

async function launchBrowser() {
  try {
    return await chromium.launch({channel: 'chrome', headless: true})
  } catch {
    return await chromium.launch({headless: true})
  }
}

const browser = await launchBrowser()
const report = {overflow: [], console: [], placeholders: [], status: []}

async function capture(page, {file, url, width, height}) {
  await page.setViewportSize({width, height})
  const response = await page.goto(base + url, {waitUntil: 'domcontentloaded', timeout: 45000})
  await page.waitForTimeout(800)
  report.status.push({url, status: response?.status() || 0, file})
  await page.screenshot({path: path.join(outDir, file), fullPage: true})
}

try {
  const page = await browser.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') report.console.push({url: page.url(), text: msg.text()})
  })
  page.on('pageerror', (err) => {
    report.console.push({url: page.url(), text: err.message})
  })

  for (const shot of shots) {
    await capture(page, shot)
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement
      return {width: doc.clientWidth, scrollWidth: doc.scrollWidth, overflow: doc.scrollWidth > doc.clientWidth + 1}
    })
    if (overflow.overflow) report.overflow.push({file: shot.file, ...overflow})
    const body = await page.locator('body').innerText()
    for (const token of ['[AUTHOR NAME]', 'Lorem ipsum', 'COVER MODE', 'ARTICLE MODE', 'Made for serious readers']) {
      if (body.includes(token)) report.placeholders.push({file: shot.file, token})
    }
  }

  for (const width of extraViewports) {
    for (const url of ['/', '/stories/when-the-factory-closed', '/search?q=factory']) {
      await page.setViewportSize({width, height: 900})
      await page.goto(base + url, {waitUntil: 'domcontentloaded', timeout: 45000})
      await page.waitForTimeout(300)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
      if (overflow) report.overflow.push({url, width})
    }
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(report, null, 2))
if (report.overflow.length || report.placeholders.length || report.status.some((row) => row.status >= 400)) {
  process.exitCode = 1
}
