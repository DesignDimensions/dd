import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import styles from './SnackFactoryDesktop.module.css'

/**
 * Figma 2714:8744
 *
 * Note: the tag reads "Paxkaging design" in the frame. Kept verbatim —
 * flag it with the designer if it is a typo rather than intentional.
 */
export default function SnackFactoryDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <div className={styles.textStack}>
          <div className={styles.stack24}>
            <div className={styles.stack16}>
              <div className={styles.headingRow}>
                <p className={styles.heading}>Snack Factory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.introRow}>
          <p className={styles.intro}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className={styles.metaWrap}>
          <div className={styles.metaRow}>
            <MergeButton label="Paxkaging design" />
          </div>
        </div>
      </div>
    </section>
  )
}
