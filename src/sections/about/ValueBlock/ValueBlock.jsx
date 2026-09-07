import divider from '@/assets/icons/divider.svg'

import './ValueBlock.css'

/**
 * Figma 7962:21256 ("Our values") and 7962:21300 ("Design Philosophy").
 *
 * The two frames are structurally identical — heading beside a lede, a
 * rule, then three equal columns — so they share one component and differ
 * only in their fill.
 */
export default function ValueBlock({ heading, lede, columns, background }) {
  return (
    <section className="valueBlock_section" style={{ backgroundColor: background }}>
      <div className="valueBlock_head">
        <div className="valueBlock_headingStack">
          <div className="valueBlock_headingRow">
            <p className="valueBlock_heading">{heading}</p>
          </div>
        </div>
        <div className="valueBlock_ledeStack">
          <p className="valueBlock_lede">{lede}</p>
        </div>
      </div>

      <div className="valueBlock_divider">
        <div className="valueBlock_dividerInner">
          <img alt="" className="valueBlock_dividerImage" src={divider} />
        </div>
      </div>

      <div className="valueBlock_columns">
        {columns.map((column) => (
          <div className="valueBlock_column" key={column.title}>
            <div className="valueBlock_columnStack">
              <div className="valueBlock_columnHeadingRow">
                <p className="valueBlock_columnHeading">{column.title}</p>
              </div>
              <p className="valueBlock_columnBody">{column.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
