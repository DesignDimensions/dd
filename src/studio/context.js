import { createContext, useContext } from 'react'

/**
 * What every panel and field in the studio can reach: the draft (`doc`,
 * `set`, `change`), the media library (`pickMedia`), notes (`toast`),
 * and where things can link to (`routes`).
 */
export const StudioContext = createContext(null)

export function useStudio() {
  return useContext(StudioContext)
}
