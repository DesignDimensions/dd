import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ProjectOverview.css'

/** Figma 2955:12671 – 12673 */
const TAGS = ['Branding', 'Packaging']

/**
 * Figma 2955:12659 — pull quote plus the client/project/tags meta row.
 */
export default function ProjectOverview() {
  return (
    <section className="projectOverview_section">
      <div className="projectOverview_quoteRow">
        <p className="projectOverview_quote">
          Pappadmalji : Reframing the Familiar
        </p>
      </div>

      <div className="projectOverview_meta">
        <div className="projectOverview_metaLeft">
          <div className="projectOverview_textStack">
            <p className="projectOverview_label">Client</p>
            <p className="projectOverview_heading">Pappadmalji</p>
          </div>
          <div className="projectOverview_textStack">
            <p className="projectOverview_label">Project</p>
            <p className="projectOverview_heading">Branding & Packaging</p>
          </div>
        </div>

        <div className="projectOverview_spacer" />

        <div className="projectOverview_metaRight">
          {TAGS.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          <button
            aria-label="Play"
            className="projectOverview_iconButton"
            onClick={(event) => event.stopPropagation()}
            type="button"
          >
            <ArrowCircle glyph="play" />
          </button>
          <button
            aria-label="Share"
            className="projectOverview_iconButton"
            onClick={(event) => event.stopPropagation()}
            type="button"
          >
            <ArrowCircle glyph="share" />
          </button>
        </div>
      </div>
    </section>
  )
}
