import { createContext, useContext, useLayoutEffect } from 'react'

/** SiteHeader's setter for hiding itself — see useHideHeader. */
export const HeaderHiddenContext = createContext(() => {})

/** Hides the site header while the calling page is mounted (the 404 has
    none) — set before paint, so it never flashes in. */
export function useHideHeader() {
  const setHidden = useContext(HeaderHiddenContext)
  useLayoutEffect(() => {
    setHidden(true)
    return () => setHidden(false)
  }, [setHidden])
}
