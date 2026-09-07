import storyGradients from '@/assets/images/story-gradients.gif'
import story1 from '@/assets/mobile/story-1.jpg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'

import './DesignDialogueMobile.css'

const CARD_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'

/**
 * Figma 2715:11897 "Cards Slider" — four cards on a horizontal scroller,
 * where desktop lays three out in a row.
 *
 * All four repeat the same title in the frame; kept verbatim. The first
 * and third cards crop their image (h 141.49%, top -22.1%).
 */
const CARDS = [
  {
    id: 1,
    image: story1,
    background: '#d5dab5',
    glyph: 'arrow',
    cropped: true,
  },
  {
    id: 2,
    image: storyGradients,
    background: '#ff694f',
    glyph: 'bookmark',
    cropped: false,
  },
  {
    id: 3,
    image: story1,
    background: '#d5dab5',
    glyph: 'arrow',
    cropped: true,
  },
  {
    id: 4,
    image: storyGradients,
    background: '#ff694f',
    glyph: 'bookmark',
    cropped: false,
  },
]

/** Figma 2715:11889 "7" */
export default function DesignDialogueMobile() {
  return (
    <section className="designDialogueMobile_section">
      <div className="designDialogueMobile_content">
        <div className="designDialogueMobile_head">
          <p className="designDialogueMobile_eyebrow">We have more for you</p>
          <p className="designDialogueMobile_heading">Design Dialogue</p>
        </div>

        <div className="designDialogueMobile_introWrap">
          <div className="designDialogueMobile_introRow">
            <p className="designDialogueMobile_intro">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>

        <div className="designDialogueMobile_slider">
          {CARDS.map((card) => (
            <div
              className="designDialogueMobile_card"
              key={card.id}
              style={{ backgroundColor: card.background }}
            >
              <div className="designDialogueMobile_media">
                <div className="designDialogueMobile_mediaClip">
                  <img
                    alt=""
                    className={
                      card.cropped ? 'designDialogueMobile_imageCropped' : 'designDialogueMobile_image'
                    }
                    src={card.image}
                  />
                </div>
              </div>
              <div className="designDialogueMobile_cardBody">
                <div className="designDialogueMobile_cardText">
                  <div className="designDialogueMobile_cardTitle">
                    <p className="designDialogueMobile_cardTitleLine">
                      3D slaying the design
                    </p>
                    <p className="designDialogueMobile_cardTitleLine">industry!</p>
                  </div>
                  <p className="designDialogueMobile_cardCopy">{CARD_COPY}</p>
                </div>
                <IconButton glyph={card.glyph} size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Cta size="mobile">View All Stories</Cta>
    </section>
  )
}
