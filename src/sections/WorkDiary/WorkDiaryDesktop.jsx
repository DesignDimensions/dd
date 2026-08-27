import chevron from '@/assets/icons/chevron.svg'
import workAqua from '@/assets/images/work-aqua.jpg'
import workApag from '@/assets/images/work-apag.jpg'
import workBangla from '@/assets/images/work-bangla-123.jpg'
import workFeatured from '@/assets/images/work-featured-15ad.png'
import workNupur from '@/assets/images/work-nupur-kanoi.jpg'
import workWhiteRhino from '@/assets/images/work-white-rhino.jpg'
import Carousel from '@/components/ui/Carousel/Carousel.jsx'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import styles from './WorkDiaryDesktop.module.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2714:8758 */
export default function WorkDiaryDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <div className={styles.textStack}>
            <div className={styles.stack24}>
              <div className={styles.stack16}>
                <p className={styles.eyebrow}>Our pride</p>
                <div className={styles.headingRow}>
                  <p className={styles.heading}>Work diary</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className={styles.genre} type="button">
          <div className={styles.genreLabel}>
            <p className={styles.genreText}>Genre</p>
          </div>
          <div className={styles.genreIconWrap}>
            <div className={styles.genreIconRotate}>
              <div className={styles.genreIcon}>
                <img alt="" className={styles.genreIconImage} src={chevron} />
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className={styles.content}>
        {/* Featured card — Figma 2714:8765 */}
        <div className={styles.featured}>
          <div className={styles.featuredMedia}>
            <img alt="" className={styles.featuredImage} src={workFeatured} />
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.featuredTextStack}>
              <div className={styles.stack12}>
                <div className={styles.stack8}>
                  <div className={styles.headingRow}>
                    <p className={styles.featuredTitle}>15 AD</p>
                  </div>
                  <p className={styles.featuredCopy}>{BODY_COPY}</p>
                </div>
              </div>
            </div>
            <div className={styles.featuredMeta}>
              <MergeButton label="Packaging" />
            </div>
          </div>
        </div>

        {/* Figma 2714:8772 — a rail, so the cards keep their frame width */}
        <Carousel label="projects">
          <ProjectCard
            background="#859396"
            body={BODY_COPY}
            eyebrow="Branding"
            image={workNupur}
            title={['Nupur Kanoi']}
          />
          <ProjectCard
            background="#fff27a"
            body={BODY_COPY}
            eyebrow="Merchandise"
            image={workApag}
            title={['APAG']}
          />
          <ProjectCard
            background="#b0c3b4"
            body={BODY_COPY}
            eyebrow="Branding"
            image={workBangla}
            title={['Bangla 123']}
          />
        </Carousel>

        {/* Figma 2714:8788 */}
        <div className={styles.rowClipped}>
          {/* Wide card — Figma 2714:8789 */}
          <div className={styles.wideCard}>
            <div className={styles.wideMedia}>
              <div className={styles.wideMediaClip}>
                <img alt="" className={styles.wideImage} src={workWhiteRhino} />
              </div>
            </div>
            <div className={styles.wideBody}>
              <div className={styles.wideTextStack}>
                <div className={styles.stack12}>
                  <div className={styles.stack8}>
                    <p className={styles.cardEyebrow}>Packaging design</p>
                    <div className={styles.headingRow}>
                      <p className={styles.cardTitle}>White Rhino</p>
                    </div>
                    <p className={styles.cardCopy}>{BODY_COPY}</p>
                  </div>
                </div>
              </div>
              <IconButton />
            </div>
          </div>

          <ProjectCard
            background="#d6dfff"
            body={BODY_COPY}
            eyebrow="Packaging design"
            image={workAqua}
            title={['AQUA']}
          />
        </div>
      </div>

      <Cta>View All Projects</Cta>
    </section>
  )
}
