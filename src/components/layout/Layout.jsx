import { Outlet } from 'react-router-dom'

import GravityCursor from '@/components/GravityCursor/GravityCursor.jsx'
import Lightbox from '@/components/Lightbox/Lightbox.jsx'

import ScrollToTop from './ScrollToTop.jsx'
import './Layout.css'

/**
 * Shell wrapped around every route.
 *
 * Header and Footer come from Figma like any other section, so they are
 * built inside the frames that define them rather than here. GravityCursor
 * and Lightbox are mounted once here rather than per-page, since any page
 * can register a gravity zone (useGravityZone) or open an image
 * (useZoomable) without needing its own instance of either.
 */
export default function Layout() {
  return (
    <div className="layout_layout">
      <ScrollToTop />
      <GravityCursor />
      <Lightbox />
      <main className="layout_main">
        <Outlet />
      </main>
    </div>
  )
}
