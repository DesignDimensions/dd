import { createContext, useContext } from 'react'

export const ContentContext = createContext(null)

/** The site's content — pages, projects, stories, settings, search. See
    ContentProvider and select.js. */
export function useContent() {
  return useContext(ContentContext)
}
