#!/usr/bin/env node
/**
 * Scaffolds a section from a Figma frame.
 *
 *   npm run section Hero
 *   npm run section PricingTable
 *
 * Creates src/sections/<Name>/<Name>.jsx and <Name>.module.css.
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const raw = process.argv[2]

if (!raw) {
  console.error('Usage: npm run section <SectionName>')
  process.exit(1)
}

const name = raw
  .replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
  .replace(/^(.)/, (chr) => chr.toUpperCase())

if (!name) {
  console.error(`Could not derive a component name from "${raw}".`)
  process.exit(1)
}

const dir = join(process.cwd(), 'src', 'sections', name)

try {
  await access(dir)
  console.error(`src/sections/${name} already exists.`)
  process.exit(1)
} catch {
  // does not exist, which is what we want
}

const jsx = `import styles from './${name}.module.css'

/**
 * ${name}
 *
 * Figma: <paste the frame link here>
 */
export default function ${name}() {
  return <section className={styles.${lowerFirst(name)}}></section>
}
`

const css = `/* ${name}
   Every value below is read from the Figma inspector. Nothing rounded,
   nothing approximated. */

.${lowerFirst(name)} {
}
`

await mkdir(dir, { recursive: true })
await writeFile(join(dir, `${name}.jsx`), jsx)
await writeFile(join(dir, `${name}.module.css`), css)

console.log(`Created src/sections/${name}/${name}.jsx`)
console.log(`        src/sections/${name}/${name}.module.css`)

function lowerFirst(value) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}
