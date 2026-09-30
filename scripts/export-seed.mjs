/**
 * Exports the website's current content as the studio's starting point:
 *
 *   <out>/api/seed.json     the content document (see src/content/document.js)
 *   <out>/uploads/seed/     every image and audio file it uses
 *
 * The studio's "Import the current website" loads seed.json; its file
 * references become "uploads/seed/…" paths, served by the studio like any
 * upload.
 *
 * Usage: node scripts/export-seed.mjs build/studio
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.resolve(root, process.argv[2] ?? 'build/studio')

// Vite only as a module loader: no server listens, nothing opens.
const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, open: false, hmr: false, watch: null },
})

try {
  const { bundledDocument } = await vite.ssrLoadModule('/src/content/document.js')
  const doc = bundledDocument()
  const base = vite.config.base // "/dd/"
  const copied = new Map()

  const seedName = (file) =>
    path
      .relative(path.join(root, 'src/assets'), file)
      .replace(/[\\/]+/g, '-')
      .toLowerCase()

  // Asset imports come back as dev URLs ("/dd/src/assets/…"); swap each
  // for its copy in uploads/seed.
  const toUpload = (value) => {
    if (typeof value === 'string' && value.startsWith(`${base}src/assets/`)) {
      const file = path.join(root, decodeURIComponent(value.slice(base.length)).split('?')[0])
      if (!copied.has(file)) {
        const name = seedName(file)
        fs.mkdirSync(path.join(out, 'uploads/seed'), { recursive: true })
        fs.copyFileSync(file, path.join(out, 'uploads/seed', name))
        copied.set(file, `uploads/seed/${name}`)
      }
      return copied.get(file)
    }
    if (Array.isArray(value)) return value.map(toUpload)
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toUpload(v)]))
    }
    return value
  }

  const seed = toUpload(doc)
  const leftovers = JSON.stringify(seed).match(/"\/dd\/[^"]+"/g)
  if (leftovers) throw new Error(`Unexported assets: ${leftovers.slice(0, 5).join(', ')}`)

  fs.mkdirSync(path.join(out, 'api'), { recursive: true })
  fs.writeFileSync(path.join(out, 'api/seed.json'), JSON.stringify(seed))
  console.log(`seed: ${copied.size} files → ${path.relative(root, out)}/uploads/seed, content → api/seed.json`)
} finally {
  await vite.close()
}
