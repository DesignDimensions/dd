/**
 * Shared registry of "gravity zones" — split out of GravityCursor.jsx so
 * that file exports only the component (Fast Refresh needs a component
 * file to export nothing else).
 */
const zones = new Set()

/**
 * Registers `el` as a gravity zone. `getLabel` is read on every tick
 * while hovered, so it can be a closure over live React state (e.g. a
 * play/pause flag) rather than a fixed string.
 *
 * Returns an unregister function — call it from a cleanup effect.
 */
export function registerGravityZone(el, getLabel) {
  if (!el) return () => {}
  const entry = { el, getLabel }
  zones.add(entry)
  return () => zones.delete(entry)
}

export function hoveredZone() {
  for (const zone of zones) {
    if (zone.el.matches(':hover')) return zone
  }
  return null
}
