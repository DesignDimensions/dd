import workApag from '@/assets/images/work-apag.jpg'
import workBangla from '@/assets/images/work-bangla-123.jpg'
import workFeatured from '@/assets/images/work-featured-15ad.png'
import workNupur from '@/assets/images/work-nupur-kanoi.jpg'
import chevron from '@/assets/mobile/chevron.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProductCardMobile from '@/components/ui/ProductCardMobile/ProductCardMobile.jsx'

import './WorkDiaryMobile.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/**
 * Figma 2715:10684 "2".
 *
 * Mobile shows four stacked cards where desktop shows six in three
 * different layouts, and the filter chip reads "Newest" rather than
 * "Genre". Both are as their frames state them.
 */
const CARDS = [
  {
    title: '15 AD',
    tag: 'Packaging',
    image: workFeatured,
    background: '#e0a968',
    mediaBackground: '#edd0af',
  },
  {
    title: 'Bangla 123',
    tag: 'Branding',
    image: workBangla,
    background: '#b0c3b4',
  },
  {
    title: 'Nupur Kanoi',
    tag: 'Branding',
    image: workNupur,
    background: '#859396',
  },
  { title: 'APAG', tag: 'Merchandise', image: workApag, background: '#fff27a' },
]

export default function WorkDiaryMobile() {
  return (
    <section className="workDiaryMobile_section">
      <div className="workDiaryMobile_content">
        <div className="workDiaryMobile_head">
          <div className="workDiaryMobile_headText">
            <p className="workDiaryMobile_eyebrow">Our pride</p>
            <p className="workDiaryMobile_heading">Work diary</p>
          </div>
          <button className="workDiaryMobile_filter" type="button">
            <div className="workDiaryMobile_filterLabel">
              <div className="workDiaryMobile_filterTextWrap">
                <p className="workDiaryMobile_filterText">Newest</p>
              </div>
            </div>
            <div className="workDiaryMobile_filterIconWrap">
              <div className="workDiaryMobile_filterIconRotate">
                <div className="workDiaryMobile_filterIcon">
                  <img
                    alt=""
                    className="workDiaryMobile_filterIconImage"
                    src={chevron}
                  />
                </div>
              </div>
            </div>
          </button>
        </div>

        {CARDS.map((card) => (
          <ProductCardMobile
            background={card.background}
            body={BODY_COPY}
            image={card.image}
            key={card.title}
            mediaBackground={card.mediaBackground}
            tag={card.tag}
            title={card.title}
          />
        ))}
      </div>

      <Cta size="mobile">View More Projects</Cta>
    </section>
  )
}
