import Carousel from '@/components/ui/Carousel/Carousel.jsx'

import './CardRail.css'

/**
 * A white box holding an eyebrow, a heading and a scrolling rail of cards:
 * Suryagarh's "More projects" (Figma 2955:12765) and the Design dialogue
 * page's "Finish what you started" (Figma 2719:24362). The cards are
 * passed in as children.
 */
export default function CardRail({ children, eyebrow, heading, label }) {
  return (
    <section className="cardRail_section">
      <div className="cardRail_textStack">
        <p className="cardRail_eyebrow">{eyebrow}</p>
        <p className="cardRail_heading">{heading}</p>
      </div>

      <div className="cardRail_content">
        <Carousel label={label}>{children}</Carousel>
      </div>
    </section>
  )
}
