import { useState } from 'react'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import { WORK_HIGHLIGHTS } from '@/lib/workHighlights'

import './WorkPreview.css'

/**
 * The "Recommended" column of the header's expanded menu — one Work
 * diary project at a time, paged with the same arrow glyph the
 * homepage carousel uses.
 */
export default function WorkPreview() {
  const [index, setIndex] = useState(0)
  const item = WORK_HIGHLIGHTS[index]

  function step(direction) {
    setIndex(
      (current) => (current + direction + WORK_HIGHLIGHTS.length) % WORK_HIGHLIGHTS.length,
    )
  }

  return (
    <div className="workPreview_preview">
      <div className="workPreview_card">
        <img alt="" className="workPreview_image" key={item.title} src={item.image} />
        <div className="workPreview_caption">
          <p className="workPreview_tag">{item.tag}</p>
          <p className="workPreview_title">{item.title}</p>
        </div>
      </div>

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
    </div>
  )
}
