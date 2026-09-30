import Cta from '@/components/ui/Cta/Cta.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import ZoomCarousel from '@/components/ui/ZoomCarousel/ZoomCarousel.jsx'

import './DesignDialogueDesktop.css'

/** Figma 2714:8806 */
export default function DesignDialogueDesktop({
  cards,
  cta,
  eyebrow,
  heading,
  intro,
}) {
  return (
    <section className="section_box section_clip designDialogueDesktop_section">
      <div className="designDialogueDesktop_head">
        <div className="designDialogueDesktop_textStack">
          <div className="designDialogueDesktop_stack24">
            <div className="designDialogueDesktop_stack16">
              <p className="text_eyebrow designDialogueDesktop_eyebrow">
                {eyebrow}
              </p>
              <div className="designDialogueDesktop_headingRow">
                <p className="designDialogueDesktop_heading">{heading}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="designDialogueDesktop_headRight">
          <div className="designDialogueDesktop_stack12">
            <div className="designDialogueDesktop_stack8">
              <p className="designDialogueDesktop_intro">{intro}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="designDialogueDesktop_content">
        <ZoomCarousel label="stories">
          {cards.map((card, index) => (
            <ProjectCard key={index} {...card} />
          ))}
        </ZoomCarousel>
      </div>

      <Cta>{cta}</Cta>
    </section>
  )
}
