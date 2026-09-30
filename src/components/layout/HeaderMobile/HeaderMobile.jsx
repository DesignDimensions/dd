import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import logoGroup1 from '@/assets/mobile/logo-group-1.svg'
import logoGroup2 from '@/assets/mobile/logo-group-2.svg'
import searchIcon from '@/assets/mobile/search.svg'
import SearchPanel from '@/components/layout/Search/SearchPanel.jsx'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import { useSearchShortcut } from '@/hooks/useSearchShortcut'
import { cn } from '@/lib/cn'
import { useContent } from '@/content/useContent'

import './HeaderMobile.css'

/**
 * Figma 4840:9211 "Header mobile", reshaped to match wepresent.wetransfer.com's
 * floating nav pill — the same layout the desktop Header now uses.
 *
 * Figma's frame doesn't show the drop-down's open state, so the nav list
 * revealed here mirrors the desktop menu rather than inventing content.
 *
 * The search button opens the pill in search mode instead (SearchPanel),
 * full height, the button turning into an × — as on desktop; the menu
 * button switches a search over to the menu.
 */
export default function HeaderMobile() {
  const { settings } = useContent()
  const { containerRef, isOpen, setIsOpen } = useDismissableMenu()
  const menuInnerRef = useRef(null)
  const [menuHeight, setMenuHeight] = useState(0)
  const [panel, setPanel] = useState('menu')
  // Bumped on every search open, remounting SearchPanel so it starts empty.
  const [searchSession, setSearchSession] = useState(0)
  const searching = isOpen && panel === 'search'
  const menuOpen = isOpen && panel === 'menu'

  const openSearch = useCallback(() => {
    setPanel('search')
    setSearchSession((n) => n + 1)
    setIsOpen(true)
  }, [setIsOpen])

  useSearchShortcut(openSearch)

  // Measured (not guessed) so the open transition can animate to the
  // panel's real height and actually show the bounce easing's overshoot.
  useLayoutEffect(() => {
    const node = menuInnerRef.current
    if (!node) return undefined

    setMenuHeight(node.offsetHeight)

    const observer = new ResizeObserver(() => setMenuHeight(node.offsetHeight))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="headerMobile_header">
      <div
        className={cn(
          'headerMobile_pill',
          isOpen && 'headerMobile_pillOpen',
          searching && 'headerMobile_pillSearch',
        )}
        ref={containerRef}
      >
        <div className="headerMobile_pillSurface">
          <div className="headerMobile_bar">
            <button
              aria-expanded={searching}
              aria-label={searching ? 'Close search' : 'Search'}
              className="headerMobile_iconButton"
              onClick={() => (searching ? setIsOpen(false) : openSearch())}
              type="button"
            >
              {searching ? (
                <span
                  className={cn(
                    'headerMobile_menuIcon',
                    'headerMobile_menuIconOpen',
                  )}
                >
                  <span className="headerMobile_menuBar" />
                  <span className="headerMobile_menuBar" />
                </span>
              ) : (
                <img
                  alt=""
                  className="headerMobile_iconImage"
                  src={searchIcon}
                />
              )}
            </button>

            {/* The logo is the way home, from any page. */}
            <Link
              aria-label="Design Dimensions home"
              className="headerMobile_logo"
              onClick={() => setIsOpen(false)}
              to="/"
            >
              <div className="headerMobile_logoGroup1">
                <img
                  alt=""
                  className="headerMobile_logoImage"
                  src={logoGroup1}
                />
              </div>
              <div className="headerMobile_logoGroup2">
                <img
                  alt=""
                  className="headerMobile_logoImage"
                  src={logoGroup2}
                />
              </div>
            </Link>

            <button
              aria-controls="header-nav-mobile"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="headerMobile_iconButton"
              onClick={() => {
                if (menuOpen) {
                  setIsOpen(false)
                } else {
                  setPanel('menu')
                  setIsOpen(true)
                }
              }}
              type="button"
            >
              <span
                className={cn(
                  'headerMobile_menuIcon',
                  menuOpen && 'headerMobile_menuIconOpen',
                )}
              >
                <span className="headerMobile_menuBar" />
                <span className="headerMobile_menuBar" />
              </span>
            </button>
          </div>

          <div
            className="headerMobile_menuWrap"
            data-open={isOpen || undefined}
            id="header-nav-mobile"
            style={{ height: isOpen ? menuHeight : 0 }}
          >
            <div
              className={cn(
                'headerMobile_menuInner',
                panel === 'search' && 'headerMobile_menuInnerSearch',
              )}
              ref={menuInnerRef}
            >
              {panel === 'search' ? (
                <SearchPanel
                  key={searchSession}
                  onNavigate={() => setIsOpen(false)}
                />
              ) : (
                <nav className="headerMobile_nav">
                  <p className="headerMobile_menuEyebrow">Explore</p>

                  <div className="headerMobile_navList">
                    {settings.nav.map((item) =>
                      item.to ? (
                        <Link
                          className="headerMobile_navItem"
                          key={item.label}
                          onClick={() => setIsOpen(false)}
                          to={item.to}
                        >
                          <p className="headerMobile_navText">{item.label}</p>
                          <span
                            aria-hidden="true"
                            className="headerMobile_navArrow"
                          >
                            →
                          </span>
                        </Link>
                      ) : (
                        <div
                          className={cn(
                            'headerMobile_navItem',
                            'headerMobile_navItemDisabled',
                          )}
                          key={item.label}
                        >
                          <p className="headerMobile_navText">{item.label}</p>
                        </div>
                      ),
                    )}
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
