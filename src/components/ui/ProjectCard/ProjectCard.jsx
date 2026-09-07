import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import { cn } from '@/lib/cn'

import './ProjectCard.css'

/**
 * The card used in "Work diary" and "Design Dialogue".
 *
 * Matches wepresent's own .card-wrapper "has-frame" recipe: the whole
 * card is the coloured frame (padding + background), with the image
 * inset inside it at a smaller radius, rather than the image running
 * edge-to-edge with only the caption panel coloured.
 *
 * `title` is an array because Figma hard-breaks some titles onto two
 * lines rather than letting them wrap.
 *
 * `fluid` fills the card's container instead of keeping Figma's fixed
 * 352px rail width — for a card sitting in a responsive grid
 * (WorkDiaryDesktop) rather than Carousel's fixed-width scroll rail.
 */
export default function ProjectCard({
  image,
  eyebrow,
  title,
  body,
  background,
  fluid = false,
}) {
  return (
    <div
      className={cn('projectCard_card', fluid && 'projectCard_fluid')}
      style={{ backgroundColor: background }}
    >
      <div className="projectCard_media">
        <img alt="" className="projectCard_image" src={image} />
      </div>
      <div className="projectCard_footer">
        <div className="projectCard_textStack">
          <div className="projectCard_stack12">
            <div className="projectCard_stack8">
              <p className="projectCard_eyebrow">{eyebrow}</p>
              <div className="projectCard_headingRow">
                <div className="projectCard_title">
                  {title.map((line) => (
                    <p className="projectCard_titleLine" key={line}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <p className="projectCard_body">{body}</p>
            </div>
          </div>
        </div>
        <IconButton />
      </div>
    </div>
  )
}
