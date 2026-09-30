import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ExplorationDesktop.css'

/**
 * Figma 2714:8846
 *
 * The heading, tags (with their fill states) and CTA come from content
 * (EXPLORATION in content/settings.js).
 */
export default function ExplorationDesktop({ cta, heading, tags }) {
  return (
    <section className="explorationDesktop_section">
      <div className="explorationDesktop_textStack">
        <div className="explorationDesktop_stack24">
          <div className="explorationDesktop_stack16">
            <div className="explorationDesktop_headingRow">
              <p className="explorationDesktop_heading">{heading}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="explorationDesktop_tagsWrap">
        <div className="explorationDesktop_tags">
          {tags.map((tag) => (
            <Tag key={tag.label} variant={tag.variant}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      <Cta>{cta}</Cta>
    </section>
  )
}
