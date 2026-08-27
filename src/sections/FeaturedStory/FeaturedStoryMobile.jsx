import papad from '@/assets/images/papad.png'

import styles from './FeaturedStoryMobile.module.css'

/**
 * Figma 2715:10751 "3".
 *
 * Title is "Papadmalji" here and "PAPADMALJI" on desktop. Both papads
 * are rotated -15.21deg on mobile, where desktop mirrors the second one.
 */
export default function FeaturedStoryMobile() {
  return (
    <section className={styles.section}>
      <div className={styles.papadTop}>
        <div className={styles.papadRotate}>
          <div className={styles.papadTopFrame}>
            <img alt="" className={styles.papadImage} src={papad} />
          </div>
        </div>
      </div>

      <div className={styles.papadBottom}>
        <div className={styles.papadRotate}>
          <div className={styles.papadBottomFrame}>
            <img alt="" className={styles.papadImage} src={papad} />
          </div>
        </div>
      </div>

      <div className={styles.heading}>
        <p className={styles.eyebrow}>Featured Story</p>
        <p className={styles.title}>Papadmalji</p>
      </div>
      <p className={styles.quote}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </section>
  )
}
