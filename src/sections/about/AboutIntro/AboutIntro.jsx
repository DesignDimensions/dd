import styles from './AboutIntro.module.css'

/** Figma 7962:21196 — the same two-column band the home frame opens with. */
export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <div className={styles.textStack}>
          <div className={styles.stack24}>
            <div className={styles.stack16}>
              <div className={styles.headingRow}>
                <p className={styles.heading}>About Us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.introRow}>
          <p className={styles.intro}>
            Design, design, design and all things craft describe us the best.
          </p>
        </div>
      </div>
    </section>
  )
}
