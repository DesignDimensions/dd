import styles from './Mission.module.css'

/** Figma 7962:21244 — the dark band between the two white blocks. */
export default function Mission() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.textStack}>
          <div className={styles.headingRow}>
            <p className={styles.heading}>Our Mission</p>
          </div>
        </div>
        <p className={styles.body}>
          At Design Dimensions, our mission is to provide meticulously tailored
          and conceptually fitting design solutions to our clients. We offer a
          comprehensive suite of services aimed at fortifying brands with
          clarity, elegance, and pride.
        </p>
      </div>
    </section>
  )
}
