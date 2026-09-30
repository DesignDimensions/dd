import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ExplorationMobile.css'

/**
 * Figma 2715:10895 "5".
 *
 * Content from EXPLORATION (content/settings.js), whose `mobile` holds
 * the frame's own tags and CTA wording.
 */
export default function ExplorationMobile({ cta, heading, tags }) {
  return (
    <section className="explorationMobile_section">
      <p className="explorationMobile_heading">{heading}</p>
      <div className="explorationMobile_tags">
        {tags.map((tag) => (
          <Tag key={tag.label} size="mobile" variant={tag.variant}>
            {tag.label}
          </Tag>
        ))}
      </div>
      <Cta size="mobile">{cta}</Cta>
    </section>
  )
}
