import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import { cn } from '@/lib/cn'

import './ExplorationDesktop.css'

/**
 * Figma 2714:8846
 *
 * Tag fill states are taken exactly from the frame — "Packaging design"
 * and "Web design" are the two filled chips.
 */
const TAGS = [
  { label: 'Packaging design', variant: 'filled' },
  { label: 'Identity design', variant: 'outline' },
  { label: 'Web design', variant: 'filled' },
  { label: 'Installation design', variant: 'outline' },
  { label: 'Communication design', variant: 'outline' },
  { label: 'Social media', variant: 'outline' },
  { label: 'Brand films', variant: 'outline' },
  { label: 'Corporate gifting', variant: 'outline' },
]

export default function ExplorationDesktop({ variant = 'transparent' }) {
  return (
    <section
      className={cn('explorationDesktop_section', `explorationDesktop_${variant}`)}
    >
      <div className="explorationDesktop_textStack">
        <div className="explorationDesktop_stack24">
          <div className="explorationDesktop_stack16">
            <div className="explorationDesktop_headingRow">
              <p className="explorationDesktop_heading">Let’s do a quick exploration!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="explorationDesktop_tagsWrap">
        <div className="explorationDesktop_tags">
          {TAGS.map((tag) => (
            <Tag key={tag.label} variant={tag.variant}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      <Cta>Search Now</Cta>
    </section>
  )
}
