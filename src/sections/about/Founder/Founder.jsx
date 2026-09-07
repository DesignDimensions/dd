import founder from '@/assets/about/founder.jpg'

import './Founder.css'

/**
 * Figma 7962:21218 — heading, then a split card: photograph on the left,
 * dark biography panel on the right.
 *
 * The photograph is the original source; the design export for it came
 * back empty. Figma renders it desaturated, so the greyscale is applied
 * here rather than baked into the asset.
 */
export default function Founder() {
  return (
    <section className="founder_section">
      <div className="founder_head">
        <div className="founder_headLeft">
          <div className="founder_textStack">
            <div className="founder_stack24">
              <div className="founder_stack16">
                <p className="founder_eyebrow">Lorem Ipsum</p>
                <div className="founder_headingRow">
                  <p className="founder_heading">Meet the founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="founder_cardWrap">
        <div className="founder_card">
          <div className="founder_media">
            <div className="founder_mediaInner">
              <img
                alt="Aparna Kakrania"
                className="founder_image"
                src={founder}
              />
            </div>
          </div>
          <div className="founder_panel">
            <div className="founder_panelStack">
              <p className="founder_role">FOUNDER</p>
              <div className="founder_nameRow">
                <p className="founder_name">Aparna Kakrania</p>
              </div>
              <p className="founder_bio">
                Growing up in eastern India and studying in the west, I
                developed a deep appreciation for our diverse cultures and
                crafts. At Maharani Gayatri Devi Girls School in Jaipur, my
                passion for vernacular design ignited. After earning a
                Bachelor&rsquo;s in English Literature from Delhi University and
                studying graphic design at South Delhi Polytechnic, I launched
                Design Dimensions in 1997.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
