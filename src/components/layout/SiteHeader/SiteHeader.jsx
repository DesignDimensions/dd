import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '@/components/layout/Header/Header.jsx'
import HeaderMobile from '@/components/layout/HeaderMobile/HeaderMobile.jsx'
import { useIsMobile } from '@/hooks/useIsMobile'

import { HeaderHiddenContext } from './headerVisibility'

/**
 * The floating header, mounted once for the whole site (Layout) rather
 * than inside each page's hero.
 *
 * - Home on a phone gets HeaderMobile (Figma 4840:9211); every other page,
 *   at every width, gets Header — as the pages rendered them before.
 * - Keyed by the path, so it remounts on navigation just as it did when
 *   it lived in each page: an open menu or search never carries over.
 * - A page can opt out with useHideHeader() (headerVisibility.js).
 */
export default function SiteHeader({ children }) {
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const isMobile = useIsMobile()

  let header = null
  if (!hidden)
    header =
      isMobile && pathname === '/' ? (
        <HeaderMobile key={pathname} />
      ) : (
        <Header key={pathname} />
      )

  return (
    <HeaderHiddenContext.Provider value={setHidden}>
      {header}
      {children}
    </HeaderHiddenContext.Provider>
  )
}
