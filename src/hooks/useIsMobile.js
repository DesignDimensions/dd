import { useSyncExternalStore } from 'react'

import { DESKTOP_MIN_WIDTH } from '@/lib/breakpoints'

const QUERY = `(max-width: ${DESKTOP_MIN_WIDTH - 0.02}px)`

function subscribe(callback) {
  const list = window.matchMedia(QUERY)
  list.addEventListener('change', callback)
  return () => list.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

/**
 * True when the mobile frame should be rendered instead of the desktop one.
 *
 * The two frames differ in content, not just in styling — different copy,
 * different numbers of cards, a slider instead of a grid — so the choice
 * has to happen in JS rather than in CSS alone.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
