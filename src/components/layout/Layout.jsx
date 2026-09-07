import { Outlet } from 'react-router-dom'

import ScrollToTop from './ScrollToTop.jsx'
import './Layout.css'

/**
 * Shell wrapped around every route.
 *
 * Header and Footer come from Figma like any other section, so they are
 * built inside the frames that define them rather than here.
 */
export default function Layout() {
  return (
    <div className="layout_layout">
      <ScrollToTop />
      <main className="layout_main">
        <Outlet />
      </main>
    </div>
  )
}
