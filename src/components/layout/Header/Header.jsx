import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import logoGroup1 from '@/assets/icons/logo-header-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-header-group-2.svg'
import searchIcon from '@/assets/icons/search.svg'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from '@/lib/navigation'

import './Header.css'
import WorkPreview from './WorkPreview.jsx'

// Verbatim from Mission.jsx — the studio's own mission copy, reused
// rather than inventing new blurb text for the menu's third column.
const STUDIO_BLURB =
  'At Design Dimensions, our mission is to provide meticulously tailored and conceptually fitting design solutions to our clients. We offer a comprehensive suite of services aimed at fortifying brands with clarity, elegance, and pride.'

/**
 * Figma 2714:8735 — sits absolutely at the top of the hero frame.
 *
 * Reshaped to match wepresent.wetransfer.com's floating nav pill: a
 * search button and a menu button flank a centred logo, and the menu
 * button expands the pill into a three-column panel — nav, a Work
 * diary preview, a studio blurb — instead of a plain dropdown.
 */
export default function Header() {
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
    <header className="header_header">
      <div className={cn('header_pill', isOpen && 'header_pillOpen')} ref={containerRef}>
        <div className="header_pillSurface">
          <div className="header_bar">
            <button aria-label="Search" className="header_iconButton" type="button">
              <img alt="" className="header_iconImage" src={searchIcon} />
            </button>

            <div className="header_logo">
              <div className="header_logoGroup1">
                <img alt="" className="header_logoImage" src={logoGroup1} />
              </div>
              <div className="header_logoGroup2">
                <img alt="" className="header_logoImage" src={logoGroup2} />
              </div>
            </div>

            <button
              aria-controls="header-nav"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="header_iconButton"
              onClick={() => setIsOpen((open) => !open)}
              type="button"
            >
              <span className={cn('header_menuIcon', isOpen && 'header_menuIconOpen')}>
                <span className="header_menuBar" />
                <span className="header_menuBar" />
              </span>
            </button>
          </div>

          <div
            className="header_menuWrap"
            data-open={isOpen || undefined}
            id="header-nav"
            style={{ height: isOpen ? menuHeight : 0 }}
          >
            <div className="header_menuInner" ref={menuInnerRef}>
              <div className="header_menuColumn">
                <p className="header_menuEyebrow">Explore</p>

                <nav className="header_navList">
                  {NAV_ITEMS.map((item) =>
                    item.to ? (
                      <Link
                        className="header_navItem"
                        key={item.label}
                        onClick={() => setIsOpen(false)}
                        to={item.to}
                      >
                        <p className="header_navText">{item.label}</p>
                        <span aria-hidden="true" className="header_navArrow">
                          →
                        </span>
                      </Link>
                    ) : (
                      <div className={cn('header_navItem', 'header_navItemDisabled')} key={item.label}>
                        <p className="header_navText">{item.label}</p>
                      </div>
                    ),
                  )}
                </nav>
              </div>

              <div className="header_menuColumn">
                <p className="header_menuEyebrow">Recommended</p>
                <WorkPreview />
              </div>

              <div className="header_menuColumn">
                <p className="header_menuEyebrow">Design Dimensions</p>
                <p className="header_menuBlurb">{STUDIO_BLURB}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
