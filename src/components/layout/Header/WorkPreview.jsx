import { useState } from 'react'
import { Link } from 'react-router-dom'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import { PROJECTS } from '@/lib/projects'

import './WorkPreview.css'

/**
 * The "Recommended" column of the header's expanded menu — one project
 * from lib/projects.js at a time, paged with the same arrow glyph the
 * homepage carousel uses. A project with a built page links to it; the
 * arrows only show once there is more than one project to page through.
 *
 * `onNavigate` lets the menu close itself when the card is followed.
 */
export default function WorkPreview({ onNavigate }) {
  const [index, setIndex] = useState(0)
  const item = PROJECTS[index]

  if (!item) return null

  const Card = item.path ? Link : 'div'

  function step(direction) {
    setIndex((current) => (current + direction + PROJECTS.length) % PROJECTS.length)
  }

  return (
    <div className="workPreview_preview">
      <Card className="workPreview_card" {...(item.path && { onClick: onNavigate, to: item.path })}>
        {item.image ? (
          <img alt="" className="workPreview_image" key={item.slug} src={item.image} />
        ) : null}
        <div className="workPreview_caption">
          {item.category ? <p className="workPreview_tag">{item.category}</p> : null}
          <p className="workPreview_title">{item.title}</p>
        </div>
      </Card>

      {PROJECTS.length > 1 ? (
        <div className="workPreview_controls">
          <button
            aria-label="Previous project"
            className="workPreview_control"
            onClick={() => step(-1)}
            type="button"
          >
            <span className="workPreview_flip">
              <ArrowCircle size={32} />
            </span>
          </button>
          <button
            aria-label="Next project"
            className="workPreview_control"
            onClick={() => step(1)}
            type="button"
          >
            <ArrowCircle size={32} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
