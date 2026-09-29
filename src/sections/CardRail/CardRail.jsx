import ZoomCarousel from '@/components/ui/ZoomCarousel/ZoomCarousel.jsx'
import { useIsMobile } from '@/hooks/useIsMobile'

import './CardRail.css'

/**
 * A white box holding an eyebrow, a heading and a rail of cards:
 * Suryagarh's "More projects" (Figma 2955:12765) and the Design dialogue
 * page's "Finish what you started" (Figma 2719:24362). The cards are
 * passed in as children.
 *
 * The rail is Home's Design Dialogue carousel, so every card slider on
 * the site moves the same way: the centred zoom on desktop, the swipeable
 * deck on mobile, both looping on their own.
 */
export default function CardRail({ children, eyebrow, heading, label }) {
  const isMobile = useIsMobile()

  return (
    <section className="cardRail_section">
      <div className="cardRail_textStack">
        <p className="cardRail_eyebrow">{eyebrow}</p>
        <p className="cardRail_heading">{heading}</p>
      </div>

      <div className="cardRail_content">
        <ZoomCarousel effect={isMobile ? 'cards' : 'zoom'} label={label}>
          {children}
        </ZoomCarousel>
      </div>
    </section>
  )
}
