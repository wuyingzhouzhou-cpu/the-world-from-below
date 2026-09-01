import {readFile} from 'node:fs/promises'
import {spawnSync} from 'node:child_process'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const sanityRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(sanityRoot, '..', 'docs/phase-1-cms')
const envFile = await readFile(join(sanityRoot, '.env.local'), 'utf8')
const token = envFile.match(/^SANITY_AUTH_TOKEN="?([^"\n]+)"?/m)?.[1]
if (!token) throw new Error('missing token')
const claim = encodeURIComponent('https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY')
const auth = `token=${encodeURIComponent(token)}&claim=${claim}`

function shot(pathAndHash, file, extra = []) {
  const url = `http://localhost:3333${pathAndHash}${pathAndHash.includes('#') ? '&' : '#'}${auth}`
  const result = spawnSync(
    'npx',
    ['--yes', 'playwright@1.62.1', 'screenshot', '--full-page', '--timeout', '30000', ...extra, url, join(outDir, file)],
    {encoding: 'utf8'},
  )
  if (result.status !== 0) {
    console.error(result.stderr || 'failed')
    process.exit(result.status || 1)
  }
  console.log(`wrote ${file}`)
}

shot(
  '/intent/edit/id=feature.when-the-factory-closed;type=feature',
  '02-feature-editor.png',
  ['--wait-for-selector', 'text=Dek', '--wait-for-timeout', '1500'],
)
shot(
  '/structure/feature',
  '02b-features-list.png',
  ['--wait-for-selector', 'text=When the Factory Closed', '--wait-for-timeout', '1000'],
)
