/**
 * Builds the studio into one folder ready to upload to cPanel:
 *
 *   build/studio/
 *     index.html, preview.html, assets/   the studio app (vite.studio.config.js)
 *     api/                                the PHP API (cms/api) + seed.json
 *     uploads/                            media library (+ uploads/seed)
 *     storage/                            drafts, history, login — private
 *
 * Rebuilding keeps storage/ and your uploads, so a local studio can be
 * rebuilt while it's in use. Pass --seed to re-export the starting content.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'build/studio')
const app = path.join(root, 'build/studio-app')
const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' })

run('npx vite build --config vite.studio.config.js --logLevel warn')

fs.mkdirSync(out, { recursive: true })
// The app: replace the previous build's files, keep everything else.
for (const name of ['index.html', 'preview.html', 'favicon.svg', 'assets']) {
  fs.rmSync(path.join(out, name), { recursive: true, force: true })
  fs.cpSync(path.join(app, name), path.join(out, name), { recursive: true })
}
// The API: PHP, its .htaccess; config.php only if not customised yet.
fs.mkdirSync(path.join(out, 'api'), { recursive: true })
for (const name of fs.readdirSync(path.join(root, 'cms/api'))) {
  if (name === 'config.php' && fs.existsSync(path.join(out, 'api/config.php'))) continue
  fs.cpSync(path.join(root, 'cms/api', name), path.join(out, 'api', name), { recursive: true })
}
for (const dir of ['storage', 'uploads']) {
  fs.mkdirSync(path.join(out, dir), { recursive: true })
  fs.copyFileSync(path.join(root, 'cms', dir, '.htaccess'), path.join(out, dir, '.htaccess'))
}
if (process.argv.includes('--seed') || !fs.existsSync(path.join(out, 'api/seed.json'))) {
  run(`node scripts/export-seed.mjs ${JSON.stringify(out)}`)
}
console.log('studio → build/studio')
