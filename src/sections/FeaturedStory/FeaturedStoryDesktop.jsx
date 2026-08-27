import papad from '@/assets/images/papad.png'

import styles from './FeaturedStoryDesktop.module.css'

/**
 * Figma 2714:8800
 *
 * Two rotated papad images are pinned outside the band and clipped by it,
 * one bleeding off the top-right and one off the bottom-left.
 */
export default function FeaturedStoryDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.papadTop}>
        <div className={styles.papadTopRotate}>
          <div className={styles.papadFrame}>
            <img alt="" className={styles.papadImage} src={papad} />
          </div>
        </div>
      </div>

      <div className={styles.papadBottom}>
        <div className={styles.papadBottomRotate}>
          <div className={styles.papadFrame}>
            <img alt="" className={styles.papadImage} src={papad} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.textStack}>
          <div className={styles.stack24}>
            <div className={styles.stack16}>
              <p className={styles.eyebrow}>Featured Story</p>
              <div className={styles.headingRow}>
                <p className={styles.heading}>PAPADMALJI</p>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.quote}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  )
}
