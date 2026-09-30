import chevron from '@/assets/mobile/chevron.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProductCardMobile from '@/components/ui/ProductCardMobile/ProductCardMobile.jsx'
import { PROJECTS } from '@/content/projects'

import './WorkDiaryMobile.css'

/**
 * Figma 2715:10684 "2" — one stacked card per project in content/projects.js,
 * linking to each project that has a page. The filter chip reads "Newest" rather than
 * desktop's "Genre", as the frame states.
 *
 * Same props as WorkDiaryDesktop; `cta={null}` drops the button.
 */
export default function WorkDiaryMobile({
  cta,
  ctaTo,
  eyebrow,
  filterLabel,
  heading,
  limit,
}) {
  return (
    <section className="section_box workDiaryMobile_section">
      <div className="workDiaryMobile_content">
        <div className="workDiaryMobile_head">
          <div className="workDiaryMobile_headText">
            <p className="text_eyebrow workDiaryMobile_eyebrow">{eyebrow}</p>
            <p className="workDiaryMobile_heading">{heading}</p>
          </div>
          <button className="workDiaryMobile_filter" type="button">
            <div className="workDiaryMobile_filterLabel">
              <div className="workDiaryMobile_filterTextWrap">
                <p className="workDiaryMobile_filterText">{filterLabel}</p>
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

        {PROJECTS.slice(0, limit).map((project) => (
          <ProductCardMobile
            background={project.background}
            image={project.image}
            key={project.slug}
            tag={project.category}
            title={project.title}
            to={project.path}
          />
        ))}
      </div>

      {cta ? (
        <Cta size="mobile" to={ctaTo}>
          {cta}
        </Cta>
      ) : null}
    </section>
  )
}
