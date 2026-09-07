import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import logoGroup1 from '@/assets/mobile/logo-group-1.svg'
import logoGroup2 from '@/assets/mobile/logo-group-2.svg'
import searchIcon from '@/assets/mobile/search.svg'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from '@/lib/navigation'

import './HeaderMobile.css'

/**
 * Figma 4840:9211 "Header mobile", reshaped to match wepresent.wetransfer.com's
 * floating nav pill — the same layout the desktop Header now uses.
 *
 * Figma's frame doesn't show the drop-down's open state, so the nav list
 * revealed here mirrors the desktop menu rather than inventing content.
 */
export default function HeaderMobile() {
  const { containerRef, isOpen, setIsOpen } = useDismissableMenu()
  const menuInnerRef = useRef(null)
  const [menuHeight, setMenuHeight] = useState(0)

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
      <div className={cn('headerMobile_pill', isOpen && 'headerMobile_pillOpen')} ref={containerRef}>
        <div className="headerMobile_pillSurface">
          <div className="headerMobile_bar">
            <button aria-label="Search" className="headerMobile_iconButton" type="button">
              <img alt="" className="headerMobile_iconImage" src={searchIcon} />
            </button>

            <div className="headerMobile_logo">
              <div className="headerMobile_logoGroup1">
                <img alt="" className="headerMobile_logoImage" src={logoGroup1} />
              </div>
              <div className="headerMobile_logoGroup2">
                <img alt="" className="headerMobile_logoImage" src={logoGroup2} />
              </div>
            </div>

            <button
              aria-controls="header-nav-mobile"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="headerMobile_iconButton"
              onClick={() => setIsOpen((open) => !open)}
              type="button"
            >
              <span className={cn('headerMobile_menuIcon', isOpen && 'headerMobile_menuIconOpen')}>
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
            <nav className="headerMobile_menuInner" ref={menuInnerRef}>
              <p className="headerMobile_menuEyebrow">Explore</p>

              <div className="headerMobile_navList">
                {NAV_ITEMS.map((item) =>
                  item.to ? (
                    <Link
                      className="headerMobile_navItem"
                      key={item.label}
                      onClick={() => setIsOpen(false)}
                      to={item.to}
                    >
                      <p className="headerMobile_navText">{item.label}</p>
                      <span aria-hidden="true" className="headerMobile_navArrow">
                        →
                      </span>
                    </Link>
                  ) : (
                    <div className={cn('headerMobile_navItem', 'headerMobile_navItemDisabled')} key={item.label}>
                      <p className="headerMobile_navText">{item.label}</p>
                    </div>
                  ),
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
