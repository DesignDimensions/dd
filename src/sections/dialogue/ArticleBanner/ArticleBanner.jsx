import pinShadowFar from '@/assets/dialogue/safety-pin-shadow-1.png'
import pinShadowNear from '@/assets/dialogue/safety-pin-shadow-2.png'
import pin from '@/assets/dialogue/safety-pin.png'
import Header from '@/components/layout/Header/Header.jsx'

import './ArticleBanner.css'

/**
 * Figma 2719:16436 — 819px band, a safety pin laid on a warm paper ground,
 * header pinned to top (same as ProjectBanner; the frame's own header bar
 * is dropped in favour of <Header/>).
 *
 * The pin is Figma's own three-layer build (2719:16438): two blurred
 * copies offset to the right as a soft shadow, the sharp pin on top, each
 * image turned -90deg.
 */
export default function ArticleBanner() {
  return (
    <section className="articleBanner_hero">
      <div aria-hidden="true" className="articleBanner_pin">
        <div className="articleBanner_layer articleBanner_shadowFar">
          <div className="articleBanner_turn articleBanner_blur">
            <img alt="" className="articleBanner_fill" src={pinShadowFar} />
          </div>
        </div>
        <div className="articleBanner_layer articleBanner_shadowNear">
          <div className="articleBanner_turn articleBanner_blur">
            <img alt="" className="articleBanner_fill" src={pinShadowNear} />
          </div>
        </div>
        <div className="articleBanner_layer articleBanner_sharp">
          <div className="articleBanner_turn articleBanner_crop">
            <img alt="" className="articleBanner_cropped" src={pin} />
          </div>
        </div>
      </div>
      <Header />
    </section>
  )
}
