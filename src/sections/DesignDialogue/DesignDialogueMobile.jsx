import storyGradients from '@/assets/images/story-gradients.gif'
import story1 from '@/assets/mobile/story-1.jpg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'

import styles from './DesignDialogueMobile.module.css'

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
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>We have more for you</p>
          <p className={styles.heading}>Design Dialogue</p>
        </div>

        <div className={styles.introWrap}>
          <div className={styles.introRow}>
            <p className={styles.intro}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>

        <div className={styles.slider}>
          {CARDS.map((card) => (
            <div className={styles.card} key={card.id}>
              <div className={styles.media}>
                <div className={styles.mediaClip}>
                  <img
                    alt=""
                    className={
                      card.cropped ? styles.imageCropped : styles.image
                    }
                    src={card.image}
                  />
                </div>
              </div>
              <div
                className={styles.cardBody}
                style={{ backgroundColor: card.background }}
              >
                <div className={styles.cardText}>
                  <div className={styles.cardTitle}>
                    <p className={styles.cardTitleLine}>
                      3D slaying the design
                    </p>
                    <p className={styles.cardTitleLine}>industry!</p>
                  </div>
                  <p className={styles.cardCopy}>{CARD_COPY}</p>
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
