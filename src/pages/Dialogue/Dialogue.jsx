import Articles from '@/sections/dialogue/Articles/Articles.jsx'
import FinishReading from '@/sections/dialogue/FinishReading/FinishReading.jsx'
import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import HeaderBand from '@/sections/HeaderBand/HeaderBand.jsx'

import './Dialogue.css'

/**
 * Figma 2719:24274 — "DD/Design Dialogue/Desktop", desktop only.
 *
 * Presentation follows Home, Work diary and Suryagarh: the header band
 * runs flush to the viewport, the article grid and the reading rail are
 * white boxes on the page ground, Featured Story runs between them, and
 * the page closes on the shared footer band.
 */
export default function Dialogue() {
  return (
    <div className="dialogue_page">
      <HeaderBand />
      <Articles />
      <FeaturedStory />
      <FinishReading />
      <FooterZone />
    </div>
  )
}
