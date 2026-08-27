import heroBg from '@/assets/about/hero-bg.png'
import Header from '@/components/layout/Header/Header.jsx'

import styles from './AboutHero.module.css'

/**
 * Figma 7962:21192 — 736px band with the headline set low in the frame.
 *
 * The frame's background image did not come through the design export at
 * all (the node returned only its text child), so the photograph here is
 * the original source recovered via download_assets.
 */
export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <Header />
      <img alt="" className={styles.background} src={heroBg} />
      <div className={styles.labelRow}>
        <p className={styles.label}>Creating Design, weaving craft</p>
      </div>
    </section>
  )
}
