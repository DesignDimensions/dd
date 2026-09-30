import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'

import './Articles.css'

/**
 * Figma 2719:24305 — heading and intro, then every article: one featured
 * across the full row, a row of three, and a wide card beside a single.
 *
 * Cards use the site's "has-frame" recipe (ProjectCard): the colour frames
 * the whole card with the image inset. The featured card keeps Figma's
 * side-by-side layout rather than stacking, since it spans the full row
 * and a stacked card would be a 1080px-wide image.
 *
 * Everything shown comes from content (content/pages/designDialogue.js).
 */
export default function Articles({ cards, eyebrow, featured, heading, intro }) {
  return (
    <section className="section_box section_clip articles_section">
      {/* Figma 2719:24306 */}
      <div className="articles_head">
        <div className="articles_textStack">
          <p className="text_eyebrow articles_eyebrow">{eyebrow}</p>
          <p className="text_heading articles_heading">{heading}</p>
        </div>
        <p className="articles_intro">{intro}</p>
      </div>

      <div className="projectCard_rows articles_grid">
        {/* Figma 2719:24315 */}
        <div
          className="articles_featured"
          style={{ backgroundColor: featured.background }}
        >
          <div className="articles_featuredMedia">
            <img
              alt=""
              className="articles_featuredImage"
              src={featured.image}
            />
          </div>
          <div className="articles_featuredBody">
            <div className="articles_featuredRow">
              <div className="articles_featuredText">
                <p className="articles_cardEyebrow">{featured.eyebrow}</p>
                <p className="articles_featuredTitle">{featured.title}</p>
                <p className="articles_featuredCopy">{featured.body}</p>
              </div>
              <IconButton />
            </div>
          </div>
        </div>

        {/* Figma 2719:24326 / 2719:24342 */}
        {cards.map((card, index) => (
          <ProjectCard fluid={!card.wide} key={index} {...card} />
        ))}
      </div>
    </section>
  )
}
