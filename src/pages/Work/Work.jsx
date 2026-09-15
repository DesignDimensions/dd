import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import HeaderBand from '@/sections/HeaderBand/HeaderBand.jsx'
import WorkDiary from '@/sections/WorkDiary/WorkDiary.jsx'

import './Work.css'

/**
 * Figma 2715:12183 — "DD/Work Diary/Desktop", desktop only.
 *
 * Every section below the header already exists on Home, so this page
 * only composes them. Presentation follows Home and Suryagarh: the header
 * band runs flush to the viewport, the Work diary grid is a white box on
 * the page ground, and the page closes on the shared footer band.
 *
 * The grid lists the projects that have pages (lib/projects.js) rather
 * than the frame's placeholder cards (2715:12234 / 8117:19893).
 * Contact is 7962:17534, the About frame's footer instance; the built
 * Contact stands in for it, as it does on About.
 */
export default function Work() {
  return (
    <div className="work_page">
      <HeaderBand />
      <WorkDiary cta={null} filterLabel="Newest" />
      <FeaturedStory />
      <FooterZone />
    </div>
  )
}
