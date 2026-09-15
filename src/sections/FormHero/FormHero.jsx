import chevron from '@/assets/icons/chevron.svg'
import Header from '@/components/layout/Header/Header.jsx'
import { cn } from '@/lib/cn'

import './FormHero.css'

/**
 * Figma 2719:20398 (Contact us) / 2719:21195 (Careers) — a 736px band: a
 * photo backdrop, an eyebrow and two-line heading on the content column,
 * and a round arrow at each edge. Header pinned to top, as on every
 * banner; the frames' own header bars are dropped.
 *
 * The frames draw the arrows with no second slide to move to, so they
 * render disabled until one exists.
 *
 * `backdrop` picks the frame's image treatment: "ocean" or "building".
 */
export default function FormHero({ backdrop, eyebrow, image, lines }) {
  return (
    <section className={cn('formHero_hero', `formHero_${backdrop}`)}>
      <img alt="" className="formHero_image" src={image} />

      <div className="formHero_text">
        <p className="formHero_eyebrow">{eyebrow}</p>
        <h1 className="formHero_heading">
          {lines.map((line) => (
            <span className="formHero_line" key={line}>
              {line}
            </span>
          ))}
        </h1>
      </div>

      <button aria-label="Previous slide" className={cn('formHero_arrow', 'formHero_prev')} disabled type="button">
        <img alt="" className="formHero_arrowIcon" src={chevron} />
      </button>
      <button aria-label="Next slide" className={cn('formHero_arrow', 'formHero_next')} disabled type="button">
        <img alt="" className="formHero_arrowIcon" src={chevron} />
      </button>

      <Header />
    </section>
  )
}
