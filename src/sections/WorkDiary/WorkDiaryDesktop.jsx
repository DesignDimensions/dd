import chevron from '@/assets/icons/chevron.svg'
import workAqua from '@/assets/images/work-aqua.jpg'
import workApag from '@/assets/images/work-apag.jpg'
import workBangla from '@/assets/images/work-bangla-123.jpg'
import workFeatured from '@/assets/images/work-featured-15ad.png'
import workNupur from '@/assets/images/work-nupur-kanoi.jpg'
import workWhiteRhino from '@/assets/images/work-white-rhino.jpg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import './WorkDiaryDesktop.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2714:8758 */
export default function WorkDiaryDesktop() {
  return (
    <section className="workDiaryDesktop_section">
      <div className="workDiaryDesktop_head">
        <div className="workDiaryDesktop_headLeft">
          <div className="workDiaryDesktop_textStack">
            <div className="workDiaryDesktop_stack24">
              <div className="workDiaryDesktop_stack16">
                <p className="workDiaryDesktop_eyebrow">Our pride</p>
                <div className="workDiaryDesktop_headingRow">
                  <p className="workDiaryDesktop_heading">Work diary</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="workDiaryDesktop_genre" type="button">
          <div className="workDiaryDesktop_genreLabel">
            <p className="workDiaryDesktop_genreText">Genre</p>
          </div>
          <div className="workDiaryDesktop_genreIconWrap">
            <div className="workDiaryDesktop_genreIconRotate">
              <div className="workDiaryDesktop_genreIcon">
                <img alt="" className="workDiaryDesktop_genreIconImage" src={chevron} />
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="workDiaryDesktop_content">
        {/* Featured card — Figma 2714:8765 */}
        <div className="workDiaryDesktop_featured">
          <div className="workDiaryDesktop_featuredMedia">
            <img alt="" className="workDiaryDesktop_featuredImage" src={workFeatured} />
          </div>
          <div className="workDiaryDesktop_featuredBody">
            <div className="workDiaryDesktop_featuredTextStack">
              <div className="workDiaryDesktop_stack12">
                <div className="workDiaryDesktop_stack8">
                  <div className="workDiaryDesktop_headingRow">
                    <p className="workDiaryDesktop_featuredTitle">15 AD</p>
                  </div>
                  <p className="workDiaryDesktop_featuredCopy">{BODY_COPY}</p>
                </div>
              </div>
            </div>
            <div className="workDiaryDesktop_featuredMeta">
              <MergeButton label="Packaging" />
            </div>
          </div>
        </div>

        {/* Figma 2714:8772 — grid cells now, not a rail.

            Order matters here: [2,1,1,2,1,1] column-spans across a
            3-column grid — featured+Nupur, APAG+wideCard, Bangla+AQUA —
            fills every row exactly with no ragged gap, so wideCard sits
            between APAG and Bangla rather than in its original spot
            next to AQUA. */}
        <ProjectCard
          background="#859396"
          body={BODY_COPY}
          eyebrow="Branding"
          fluid
          image={workNupur}
          title={['Nupur Kanoi']}
        />
        <ProjectCard
          background="#fff27a"
          body={BODY_COPY}
          eyebrow="Merchandise"
          fluid
          image={workApag}
          title={['APAG']}
        />

        {/* Wide card — Figma 2714:8789 — spans 2 columns like .featured */}
        <div className="workDiaryDesktop_wideCard">
          <div className="workDiaryDesktop_wideMedia">
            <img alt="" className="workDiaryDesktop_wideImage" src={workWhiteRhino} />
          </div>
          <div className="workDiaryDesktop_wideBody">
            <div className="workDiaryDesktop_wideTextStack">
              <div className="workDiaryDesktop_stack12">
                <div className="workDiaryDesktop_stack8">
                  <p className="workDiaryDesktop_cardEyebrow">Packaging design</p>
                  <div className="workDiaryDesktop_headingRow">
                    <p className="workDiaryDesktop_cardTitle">White Rhino</p>
                  </div>
                  <p className="workDiaryDesktop_cardCopy">{BODY_COPY}</p>
                </div>
              </div>
            </div>
            <IconButton />
          </div>
        </div>

        <ProjectCard
          background="#b0c3b4"
          body={BODY_COPY}
          eyebrow="Branding"
          fluid
          image={workBangla}
          title={['Bangla 123']}
        />
        <ProjectCard
          background="#d6dfff"
          body={BODY_COPY}
          eyebrow="Packaging design"
          fluid
          image={workAqua}
          title={['AQUA']}
        />
      </div>

      <Cta>View All Projects</Cta>
    </section>
  )
}
