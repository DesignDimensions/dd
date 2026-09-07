import papad from '@/assets/images/papad.png'

import './FeaturedStoryMobile.css'

/**
 * Figma 2715:10751 "3".
 *
 * Title is "Papadmalji" here and "PAPADMALJI" on desktop. Both papads
 * are rotated -15.21deg on mobile, where desktop mirrors the second one.
 */
export default function FeaturedStoryMobile() {
  return (
    <section className="featuredStoryMobile_section">
      <div className="featuredStoryMobile_papadTop">
        <div className="featuredStoryMobile_papadRotate">
          <div className="featuredStoryMobile_papadTopFrame">
            <img alt="" className="featuredStoryMobile_papadImage" src={papad} />
          </div>
        </div>
      </div>

      <div className="featuredStoryMobile_papadBottom">
        <div className="featuredStoryMobile_papadRotate">
          <div className="featuredStoryMobile_papadBottomFrame">
            <img alt="" className="featuredStoryMobile_papadImage" src={papad} />
          </div>
        </div>
      </div>

      <div className="featuredStoryMobile_heading">
        <p className="featuredStoryMobile_eyebrow">Featured Story</p>
        <p className="featuredStoryMobile_title">Papadmalji</p>
      </div>
      <p className="featuredStoryMobile_quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </section>
  )
}
