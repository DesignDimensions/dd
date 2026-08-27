import banner from '@/assets/images/hero-bg.jpg'
import HeaderMobile from '@/components/layout/HeaderMobile/HeaderMobile.jsx'

import styles from './HeroMobile.module.css'

/**
 * Figma 2715:10545 — header stacked above a square 360x360 banner.
 *
 * The banner export is byte-identical to the desktop hero image, so the
 * same file is reused and cropped square by the frame.
 */
export default function HeroMobile() {
  return (
    <section className={styles.hero}>
      <HeaderMobile />
      <div className={styles.banner}>
        <img alt="" className={styles.bannerImage} src={banner} />
      </div>
    </section>
  )
}
