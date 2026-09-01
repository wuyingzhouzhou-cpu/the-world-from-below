import {spawnSync} from 'node:child_process'
import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const sanityRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(sanityRoot, '..', 'docs/phase-1-cms')
const envFile = await readFile(join(sanityRoot, '.env.local'), 'utf8')
const token = envFile.match(/^SANITY_AUTH_TOKEN="?([^"\n]+)"?/m)?.[1]
if (!token) throw new Error('missing token')
const claim = 'https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY'
const studioUrl = `http://localhost:3333/#token=${encodeURIComponent(token)}&claim=${encodeURIComponent(claim)}`

function shot(url, file, extra = []) {
  const result = spawnSync(
    'npx',
    ['--yes', 'playwright@1.62.1', 'screenshot', '--full-page', '--wait-for-timeout', '6000', ...extra, url, join(outDir, file)],
    {encoding: 'utf8'},
  )
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || 'screenshot failed')
    process.exit(result.status || 1)
  }
  console.log(`wrote ${file}`)
}

shot(studioUrl, '01-studio-navigation.png')
const editorUrl = `http://localhost:3333/structure/feature;feature.when-the-factory-closed#token=${encodeURIComponent(token)}&claim=${encodeURIComponent(claim)}`
shot(editorUrl, '02-feature-editor.png')
