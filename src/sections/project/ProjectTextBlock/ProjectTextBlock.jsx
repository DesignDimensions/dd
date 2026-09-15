import { cn } from '@/lib/cn'

import './ProjectTextBlock.css'

/**
 * Figma 2955:12679 / 12708 / 12738 — a fixed left column (a title and a
 * small lede) beside a 528px content column that differs per use (a serif
 * pull quote plus a paragraph, two paragraphs, or one).
 *
 * `title` and `lede` fill the left column; left out, it stays empty but
 * keeps its width, as on two of Suryagarh's three uses.
 *
 * `media` is an optional full-width block of images below the text row,
 * inside the same white card — the first Suryagarh instance absorbs what
 * used to be GalleryTrio's top two rows this way (see Suryagarh.jsx).
 */
export default function ProjectTextBlock({ children, lede, media, spacious = false, title }) {
  return (
    <section className={cn('projectTextBlock_section', spacious && 'projectTextBlock_spacious')}>
      <div className="projectTextBlock_row">
        <div className="projectTextBlock_left">
          {title ? <p className="projectTextBlock_title">{title}</p> : null}
          {lede ? <p className="projectTextBlock_lede">{lede}</p> : null}
        </div>
        <div className="projectTextBlock_right">{children}</div>
      </div>
      {media ? <div className="projectTextBlock_media">{media}</div> : null}
    </section>
  )
}
