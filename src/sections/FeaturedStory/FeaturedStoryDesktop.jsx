import papad from '@/assets/images/papad.png'

import './FeaturedStoryDesktop.css'

/**
 * Figma 2714:8800
 *
 * Two rotated papad images are pinned outside the band and clipped by it,
 * one bleeding off the top-right and one off the bottom-left.
 */
export default function FeaturedStoryDesktop() {
  return (
    <section className="featuredStoryDesktop_section">
      <div className="featuredStoryDesktop_papadTop">
        <div className="featuredStoryDesktop_papadTopRotate">
          <div className="featuredStoryDesktop_papadFrame">
            <img alt="" className="featuredStoryDesktop_papadImage" src={papad} />
          </div>
        </div>
      </div>

      <div className="featuredStoryDesktop_papadBottom">
        <div className="featuredStoryDesktop_papadBottomRotate">
          <div className="featuredStoryDesktop_papadFrame">
            <img alt="" className="featuredStoryDesktop_papadImage" src={papad} />
          </div>
        </div>
      </div>

      <div className="featuredStoryDesktop_content">
        <div className="featuredStoryDesktop_textStack">
          <div className="featuredStoryDesktop_stack24">
            <div className="featuredStoryDesktop_stack16">
              <p className="featuredStoryDesktop_eyebrow">Featured Story</p>
              <div className="featuredStoryDesktop_headingRow">
                <p className="featuredStoryDesktop_heading">PAPADMALJI</p>
              </div>
            </div>
          </div>
        </div>
        <p className="featuredStoryDesktop_quote">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  )
}
