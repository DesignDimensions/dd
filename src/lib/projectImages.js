/**
 * The project pages' section renders, exported from their Figma frames into
 * src/assets/projects/<slug>/ — `hero` for the banner, and the block's
 * position for everything else. Resolved by name so lib/projectPages.js can
 * stay plain data.
 */
const IMAGES = import.meta.glob('/src/assets/projects/*/*.webp', { eager: true, import: 'default' })

export function projectImage(slug, name) {
  return IMAGES[`/src/assets/projects/${slug}/${name}.webp`]
}
