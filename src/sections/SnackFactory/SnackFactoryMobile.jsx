import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import styles from './SnackFactoryMobile.module.css'

/**
 * Figma 2715:10544 "After".
 *
 * The tag reads "Packaging Design" here, where the desktop frame reads
 * "Paxkaging design" (2714:8755). Both are kept as their frame states them.
 */
export default function SnackFactoryMobile() {
  return (
    <section className={styles.section}>
      <p className={styles.heading}>Snack Factory</p>
      <div className={styles.body}>
        <p className={styles.intro}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.buttons}>
          <MergeButton gap={12} label="Packaging Design" size={32} />
        </div>
      </div>
    </section>
  )
}
