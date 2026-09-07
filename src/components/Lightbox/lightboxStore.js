/**
 * Tiny pub-sub so any component can open the lightbox without threading
 * props down to it — split out of Lightbox.jsx so that file exports only
 * the component (Fast Refresh needs a component file to export nothing
 * else).
 */
const listeners = new Set()

/** Opens the lightbox for `src`, animating out from `originEl`'s rect. */
export function openLightbox(originEl, src) {
  if (!originEl || !src) return
  const rect = originEl.getBoundingClientRect()
  listeners.forEach((fn) => fn({ src, rect }))
}

export function subscribeLightbox(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
