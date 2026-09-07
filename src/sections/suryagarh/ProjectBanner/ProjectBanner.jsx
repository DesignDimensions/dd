import heroBanner from '@/assets/suryagarh/hero-banner.png'
import Header from '@/components/layout/Header/Header.jsx'

import './ProjectBanner.css'

/**
 * Figma 2955:12645 — 740px band, full-bleed image, header pinned to top.
 *
 * `hero-banner.png` is a direct render of node 3211:5192 (`get_screenshot`),
 * not the raw uploaded source. The raw source (`download_assets` /
 * `imgMg9861E1`) is a 4096x1573 photo with ~170px of solid black letterboxed
 * onto its top and bottom — Figma's canvas crops that out via a manual
 * percentage-position transform, but `object-fit: cover` on the raw file
 * doesn't reproduce that crop (this image's aspect ratio makes cover
 * height-constrained, so the full source height — black bands included —
 * shows through, just scaled down). Rendering the node directly sidesteps
 * reproducing that transform by hand.
 *
 * Figma also centres a "Blosssom_Logo" wordmark over the photo — a
 * leftover from the "Blossom" case-study template this frame appears to
 * be duplicated from, never swapped for Suryagarh's own mark. Dropped
 * rather than shipped, since a mismatched brand mark isn't a rendering
 * quirk worth preserving.
 */
export default function ProjectBanner() {
  return (
    <section className="projectBanner_hero">
      <img alt="" className="projectBanner_image" src={heroBanner} />
      <Header />
    </section>
  )
}
