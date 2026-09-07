import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import Carousel from '@/components/ui/Carousel/Carousel.jsx'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'

import './DesignDialogueDesktop.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2714:8806 */
export default function DesignDialogueDesktop() {
  return (
    <section className="designDialogueDesktop_section">
      <div className="designDialogueDesktop_head">
        <div className="designDialogueDesktop_textStack">
          <div className="designDialogueDesktop_stack24">
            <div className="designDialogueDesktop_stack16">
              <p className="designDialogueDesktop_eyebrow">We dig deep</p>
              <div className="designDialogueDesktop_headingRow">
                <p className="designDialogueDesktop_heading">Design Dialogue</p>
              </div>
            </div>
          </div>
        </div>

        <div className="designDialogueDesktop_headRight">
          <div className="designDialogueDesktop_stack12">
            <div className="designDialogueDesktop_stack8">
              <p className="designDialogueDesktop_intro">{BODY_COPY}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="designDialogueDesktop_content">
        <Carousel label="stories">
          <ProjectCard
            background="#dcf6f8"
            body={BODY_COPY}
            eyebrow="Article"
            image={storyAi}
            title={['AI is not the designer,', 'you are!']}
          />
          <ProjectCard
            background="#ff694f"
            body={BODY_COPY}
            eyebrow="Article"
            image={storyGradients}
            title={['Gradients are not ', 'dependable']}
          />
          <ProjectCard
            background="#c79275"
            body={BODY_COPY}
            eyebrow="Article"
            image={story3d}
            title={['3D slaying the design', 'industry']}
          />
        </Carousel>
      </div>

      <Cta>View All Stories</Cta>
    </section>
  )
}
