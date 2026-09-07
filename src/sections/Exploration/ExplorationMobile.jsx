import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ExplorationMobile.css'

/**
 * Figma 2715:10895 "5".
 *
 * Seven tags here against desktop's eight — mobile drops "Corporate
 * gifting" — and several differ in capitalisation. Kept as the frame
 * states them, and the CTA reads "Search now" rather than "Search Now".
 */
const TAGS = [
  { label: 'Packaging design', variant: 'filled' },
  { label: 'Identity design', variant: 'outline' },
  { label: 'Web design', variant: 'filled' },
  { label: 'Installation design', variant: 'outline' },
  { label: 'Communication design', variant: 'outline' },
  { label: 'Social Media', variant: 'outline' },
  { label: 'Brand Films', variant: 'outline' },
]

export default function ExplorationMobile() {
  return (
    <section className="explorationMobile_section">
      <p className="explorationMobile_heading">Let’s do a quick exploration!</p>
      <div className="explorationMobile_tags">
        {TAGS.map((tag) => (
          <Tag key={tag.label} size="mobile" variant={tag.variant}>
            {tag.label}
          </Tag>
        ))}
      </div>
      <Cta size="mobile">Search now</Cta>
    </section>
  )
}
