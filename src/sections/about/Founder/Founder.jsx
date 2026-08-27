import founder from '@/assets/about/founder.jpg'

import styles from './Founder.module.css'

/**
 * Figma 7962:21218 — heading, then a split card: photograph on the left,
 * dark biography panel on the right.
 *
 * The photograph is the original source; the design export for it came
 * back empty. Figma renders it desaturated, so the greyscale is applied
 * here rather than baked into the asset.
 */
export default function Founder() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <div className={styles.textStack}>
            <div className={styles.stack24}>
              <div className={styles.stack16}>
                <p className={styles.eyebrow}>Lorem Ipsum</p>
                <div className={styles.headingRow}>
                  <p className={styles.heading}>Meet the founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.media}>
            <div className={styles.mediaInner}>
              <img
                alt="Aparna Kakrania"
                className={styles.image}
                src={founder}
              />
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelStack}>
              <p className={styles.role}>FOUNDER</p>
              <div className={styles.nameRow}>
                <p className={styles.name}>Aparna Kakrania</p>
              </div>
              <p className={styles.bio}>
                Growing up in eastern India and studying in the west, I
                developed a deep appreciation for our diverse cultures and
                crafts. At Maharani Gayatri Devi Girls School in Jaipur, my
                passion for vernacular design ignited. After earning a
                Bachelor&rsquo;s in English Literature from Delhi University and
                studying graphic design at South Delhi Polytechnic, I launched
                Design Dimensions in 1997.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
