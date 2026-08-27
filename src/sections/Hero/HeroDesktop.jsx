import heroBg from '@/assets/images/hero-bg.jpg'
import Header from '@/components/layout/Header/Header.jsx'

import styles from './HeroDesktop.module.css'

/**
 * Figma 2714:8734 — 880px band, full-bleed image, header pinned to top.
 *
 * The image is deliberately left still. A scaling background reads as a
 * stock slideshow, and the header's entrance already carries the section.
 */
export default function HeroDesktop() {
  return (
    <section className={styles.hero}>
      <img alt="" className={styles.background} src={heroBg} />
      <Header />
    </section>
  )
}
