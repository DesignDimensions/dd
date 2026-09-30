import Cta from '@/components/ui/Cta/Cta.jsx'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import ZoomCarousel from '@/components/ui/ZoomCarousel/ZoomCarousel.jsx'

import './DesignDialogueMobile.css'

/**
 * Figma 2715:11889 "7". Its 2715:11897 "Cards Slider" is stacked into a
 * swipeable deck (wepresent's phone carousel), where desktop zooms
 * through a row.
 *
 * `cards` come from content: { image, background, glyph, cropped, title
 * (lines), body }. A `cropped` card scales and offsets its image as the
 * frame does (h 141.49%, top -22.1%).
 */
export default function DesignDialogueMobile({
  cards,
  cta,
  eyebrow,
  heading,
  intro,
}) {
  return (
    <section className="section_box section_clip designDialogueMobile_section">
      <div className="designDialogueMobile_content">
        <div className="designDialogueMobile_head">
          <p className="designDialogueMobile_eyebrow">{eyebrow}</p>
          <p className="designDialogueMobile_heading">{heading}</p>
        </div>

        <div className="designDialogueMobile_introWrap">
          <div className="designDialogueMobile_introRow">
            <p className="designDialogueMobile_intro">{intro}</p>
          </div>
        </div>

        <ZoomCarousel effect="cards" label="stories">
          {cards.map((card, index) => (
            <div
              className="designDialogueMobile_card"
              key={index}
              style={{ backgroundColor: card.background }}
            >
              <div className="designDialogueMobile_media">
                <div className="designDialogueMobile_mediaClip">
                  <img
                    alt=""
                    className={
                      card.cropped
                        ? 'designDialogueMobile_imageCropped'
                        : 'designDialogueMobile_image'
                    }
                    src={card.image}
                  />
                </div>
              </div>
              <div className="designDialogueMobile_cardBody">
                <div className="designDialogueMobile_cardText">
                  <div className="designDialogueMobile_cardTitle">
                    {card.title.map((line) => (
                      <p
                        className="designDialogueMobile_cardTitleLine"
                        key={line}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="designDialogueMobile_cardCopy">{card.body}</p>
                </div>
                <IconButton glyph={card.glyph} size={32} />
              </div>
            </div>
          ))}
        </ZoomCarousel>
      </div>

      <Cta size="mobile">{cta}</Cta>
    </section>
  )
}
