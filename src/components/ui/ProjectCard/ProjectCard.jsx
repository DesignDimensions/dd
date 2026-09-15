import { Link } from 'react-router-dom'

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
 *
 * `wide` is a fluid card spanning two grid columns, with Figma's 736x360
 * wide media frame in place of the square (Design dialogue page).
 *
 * `glyph` picks the icon button's glyph — see ArrowCircle.
 *
 * `to` makes the whole card a link to that route.
 *
 * `image`, `eyebrow` and `body` may be left out: a project still waiting
 * on its cover keeps an empty, tinted media box rather than a stand-in.
 */
export default function ProjectCard({
  image,
  eyebrow,
  title,
  body,
  background,
  fluid = false,
  wide = false,
  glyph = 'arrow',
  to,
}) {
  const Root = to ? Link : 'div'

  return (
    <Root
      className={cn(
        'projectCard_card',
        (fluid || wide) && 'projectCard_fluid',
        wide && 'projectCard_wide',
      )}
      style={{ backgroundColor: background }}
      {...(to && { to })}
    >
      <div className={cn('projectCard_media', !image && 'projectCard_mediaEmpty')}>
        {image ? <img alt="" className="projectCard_image" src={image} /> : null}
      </div>
      <div className="projectCard_footer">
        <div className="projectCard_textStack">
          <div className="projectCard_stack12">
            <div className="projectCard_stack8">
              {eyebrow ? <p className="projectCard_eyebrow">{eyebrow}</p> : null}
              <div className="projectCard_headingRow">
                <div className="projectCard_title">
                  {title.map((line) => (
                    <p className="projectCard_titleLine" key={line}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              {body ? <p className="projectCard_body">{body}</p> : null}
            </div>
          </div>
        </div>
        <IconButton glyph={glyph} />
      </div>
    </Root>
  )
}
