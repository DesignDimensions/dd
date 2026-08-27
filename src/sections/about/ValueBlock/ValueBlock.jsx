import divider from '@/assets/icons/divider.svg'

import styles from './ValueBlock.module.css'

/**
 * Figma 7962:21256 ("Our values") and 7962:21300 ("Design Philosophy").
 *
 * The two frames are structurally identical — heading beside a lede, a
 * rule, then three equal columns — so they share one component and differ
 * only in their fill.
 */
export default function ValueBlock({ heading, lede, columns, background }) {
  return (
    <section className={styles.section} style={{ backgroundColor: background }}>
      <div className={styles.head}>
        <div className={styles.headingStack}>
          <div className={styles.headingRow}>
            <p className={styles.heading}>{heading}</p>
          </div>
        </div>
        <div className={styles.ledeStack}>
          <p className={styles.lede}>{lede}</p>
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerInner}>
          <img alt="" className={styles.dividerImage} src={divider} />
        </div>
      </div>

      <div className={styles.columns}>
        {columns.map((column) => (
          <div className={styles.column} key={column.title}>
            <div className={styles.columnStack}>
              <div className={styles.columnHeadingRow}>
                <p className={styles.columnHeading}>{column.title}</p>
              </div>
              <p className={styles.columnBody}>{column.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
