import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import storyCircles from '@/assets/mobile/story-1.jpg'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'

import './Articles.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/**
 * Figma 2719:24305 — heading and intro, then every article: one featured
 * across the full row, a row of three, and a wide card beside a single.
 *
 * Cards use the site's "has-frame" recipe (ProjectCard): the colour frames
 * the whole card with the image inset. The featured card keeps Figma's
 * side-by-side layout rather than stacking, since it spans the full row
 * and a stacked card would be a 1080px-wide image.
 *
 * Titles and images repeat across cards in the frame; kept verbatim.
 * The third card's image is the one the mobile Design Dialogue already
 * uses (byte-identical to the frame's).
 */
export default function Articles() {
  return (
    <section className="articles_section">
      {/* Figma 2719:24306 */}
      <div className="articles_head">
        <div className="articles_textStack">
          <p className="articles_eyebrow">We have more for you</p>
          <p className="articles_heading">Design Dialogue</p>
        </div>
        <p className="articles_intro">{BODY_COPY}</p>
      </div>

      <div className="articles_grid">
        {/* Figma 2719:24315 */}
        <div className="articles_featured">
          <div className="articles_featuredMedia">
            <img alt="" className="articles_featuredImage" src={storyAi} />
          </div>
          <div className="articles_featuredBody">
            <div className="articles_featuredRow">
              <div className="articles_featuredText">
                <p className="articles_cardEyebrow">Article</p>
                <p className="articles_featuredTitle">AI is not the designer, you are!</p>
                <p className="articles_featuredCopy">{BODY_COPY}</p>
              </div>
              <IconButton />
            </div>
          </div>
        </div>

        {/* Figma 2719:24326 */}
        <ProjectCard
          background="#ff694f"
          body={BODY_COPY}
          eyebrow="Article"
          fluid
          image={storyGradients}
          title={['Gradients are not ', 'dependable']}
        />
        <ProjectCard
          background="#c79275"
          body={BODY_COPY}
          eyebrow="Article"
          fluid
          image={story3d}
          title={['3D slaying the design', 'industry']}
        />
        <ProjectCard
          background="#d5dab5"
          body={BODY_COPY}
          eyebrow="Article"
          fluid
          image={storyCircles}
          title={['3D slaying the design', 'industry']}
        />

        {/* Figma 2719:24342 */}
        <ProjectCard
          background="#d5dab5"
          body={BODY_COPY}
          eyebrow="Article"
          image={story3d}
          title={['3D slaying the design industry']}
          wide
        />
        <ProjectCard
          background="#ff694f"
          body={BODY_COPY}
          eyebrow="Article"
          fluid
          image={storyGradients}
          title={['Gradients are not ', 'dependable']}
        />
      </div>
    </section>
  )
}
