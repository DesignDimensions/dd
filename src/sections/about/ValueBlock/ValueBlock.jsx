import './ValueBlock.css'

/** The page gradient's own stops, one per card, so the cards read as
    part of the ground they sit over — as Home's cards wear a project's
    colour. */
const FRAMES = [
  'rgb(255, 234, 178)',
  'rgb(255, 198, 201)',
  'rgb(239, 221, 175)',
]

/**
 * Figma 7962:21256 ("Our values") and 7962:21300 ("Design Philosophy").
 *
 * The two frames are structurally identical — heading beside a lede,
 * then three equal columns — so they share one component. Both are
 * white boxes with Home's section head, and each column is a small
 * has-frame card in one of the gradient's colours, numbered, in place
 * of Figma's bare text columns under a rule.
 */
export default function ValueBlock({ heading, lede, columns }) {
  return (
    <section className="valueBlock_section">
      <div className="valueBlock_head">
        <p className="valueBlock_heading">{heading}</p>
        <p className="valueBlock_lede">{lede}</p>
      </div>

      <div className="valueBlock_columns">
        {columns.map((column, i) => (
          <div
            className="valueBlock_card"
            key={column.title}
            style={{ backgroundColor: FRAMES[i % FRAMES.length] }}
          >
            <p className="valueBlock_index">{String(i + 1).padStart(2, '0')}</p>
            <div className="valueBlock_cardText">
              <p className="valueBlock_cardHeading">{column.title}</p>
              <p className="valueBlock_cardBody">{column.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
