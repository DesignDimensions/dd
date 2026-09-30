import { useMemo } from 'react'

import { select } from './select'
import { ContentContext } from './useContent'

/** Hands a content document to the whole site (read it with useContent). */
export function ContentProvider({ children, document }) {
  const content = useMemo(() => select(document), [document])
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}
