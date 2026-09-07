import moreApag from '@/assets/suryagarh/more-apag.jpg'
import moreBangla from '@/assets/suryagarh/more-bangla-123.jpg'
import moreNupur from '@/assets/suryagarh/more-nupur-kanoi.jpg'
import Carousel from '@/components/ui/Carousel/Carousel.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'

import './MoreProjects.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2955:12771 – 12791 — the frame repeats the first two cards to fill
 * five slots; carried over as-is rather than inventing two more projects. */
const CARDS = [
  { background: '#859396', eyebrow: 'Branding', image: moreNupur, title: ['Nupur Kanoi'] },
  { background: '#fff27a', eyebrow: 'Merchandise', image: moreApag, title: ['APAG'] },
  { background: '#b0c3b4', eyebrow: 'Branding', image: moreBangla, title: ['Bangla 123'] },
  { background: '#859396', eyebrow: 'Branding', image: moreNupur, title: ['Nupur Kanoi'] },
  { background: '#fff27a', eyebrow: 'Merchandise', image: moreApag, title: ['APAG'] },
]

/** Figma 2955:12765 — "You may also like to see" rail. */
export default function MoreProjects() {
  return (
    <section className="moreProjects_section">
      <div className="moreProjects_textStack">
        <p className="moreProjects_eyebrow">You may also like to see</p>
        <p className="moreProjects_heading">More projects</p>
      </div>

      <div className="moreProjects_content">
        <Carousel label="projects">
          {CARDS.map((card, index) => (
            <ProjectCard body={BODY_COPY} key={`${card.title[0]}-${index}`} {...card} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
