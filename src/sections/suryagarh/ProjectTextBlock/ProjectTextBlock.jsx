import { cn } from '@/lib/cn'

import './ProjectTextBlock.css'

/**
 * Figma 2955:12679 / 12708 / 12738 — a fixed "Title" + lede column beside
 * a 528px content column that differs per use (a serif pull quote plus a
 * paragraph, two paragraphs, or one). The left column's copy is Figma's
 * own placeholder text, identical across all three frames, so it is
 * hardcoded here rather than passed in three times over.
 *
 * `showLeft` toggles that column per instance — Suryagarh.jsx currently
 * shows it only on the middle use.
 *
 * `media` is an optional full-width block of images below the text row,
 * inside the same white card — the first instance absorbs what used to
 * be GalleryTrio's top two rows this way (see Suryagarh.jsx).
 */
export default function ProjectTextBlock({ children, media, showLeft = false, spacious = false }) {
  return (
    <section className={cn('projectTextBlock_section', spacious && 'projectTextBlock_spacious')}>
      <div className="projectTextBlock_row">
        <div className="projectTextBlock_left">
          {showLeft ? (
            <>
              <p className="projectTextBlock_title">A name with a memory</p>
            </>
          ) : null}
        </div>
        <div className="projectTextBlock_right">{children}</div>
      </div>
      {media ? <div className="projectTextBlock_media">{media}</div> : null}
    </section>
  )
}
