import heroBg from '@/assets/about/hero-bg.png'
import Header from '@/components/layout/Header/Header.jsx'

import './AboutHero.css'

/**
 * Figma 7962:21192 — 736px band with the headline set low in the frame.
 *
 * The frame's background image did not come through the design export at
 * all (the node returned only its text child), so the photograph here is
 * the original source recovered via download_assets.
 */
export default function AboutHero() {
  return (
    <section className="aboutHero_hero">
      <Header />
      <img alt="" className="aboutHero_background" src={heroBg} />
      <div className="aboutHero_labelRow">
        <p className="aboutHero_label">Creating Design, weaving craft</p>
      </div>
    </section>
  )
}
