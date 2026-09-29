import { Link } from 'react-router-dom'

import chevron from '@/assets/icons/chevron.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import { cn } from '@/lib/cn'
import { PROJECTS } from '@/lib/projects'

import './WorkDiaryDesktop.css'

/**
 * Figma 2714:8758 (Home) / 2715:12228 (Work diary page).
 *
 * Lists lib/projects.js, a card linking to each project that has a page.
 * `limit` caps how many are shown (Home shows the first few; /work shows
 * them all).
 *
 * Laid out like wepresent's "Latest stories" grid: rows of one wide card
 * (two columns) and one narrow card, the wide one swapping sides each row.
 * Rows hold two cards, so with an odd count the first leads as the
 * featured card across the full row, as the Work diary frame has it, and
 * no row is left with a gap.
 *
 * The two frames differ only in the filter chip's label ("Genre" on Home,
 * "Newest" on the page) and whether a "View All Projects" CTA closes the
 * section, so those are props rather than a second section. `cta={null}`
 * drops the button.
 */
export default function WorkDiaryDesktop({
  cta = 'View All Projects',
  filterLabel = 'Genre',
  limit,
}) {
  const shown = PROJECTS.slice(0, limit)
  const featured = shown.length % 2 === 1 ? shown[0] : undefined
  const rest = featured ? shown.slice(1) : shown
  const FeaturedRoot = featured?.path ? Link : 'div'

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

        {/* Figma 4847:9100 (Home) / 4847:8991 (Work diary page) */}
        <button className="workDiaryDesktop_genre" type="button">
          <div className="workDiaryDesktop_genreLabel">
            <p className="workDiaryDesktop_genreText">{filterLabel}</p>
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
        {featured ? (
          <FeaturedRoot
            className="workDiaryDesktop_featured"
            style={{ backgroundColor: featured.background }}
            {...(featured.path && { to: featured.path })}
          >
            <div
              className={cn(
                'workDiaryDesktop_featuredMedia',
                !featured.image && 'workDiaryDesktop_featuredMediaEmpty',
              )}
            >
              {featured.image ? (
                <img alt="" className="workDiaryDesktop_featuredImage" src={featured.image} />
              ) : null}
            </div>
            <div className="workDiaryDesktop_featuredBody">
              <div className="workDiaryDesktop_featuredTextStack">
                <div className="workDiaryDesktop_stack12">
                  <div className="workDiaryDesktop_stack8">
                    <div className="workDiaryDesktop_headingRow">
                      <p className="workDiaryDesktop_featuredTitle">{featured.title}</p>
                    </div>
                  </div>
                </div>
              </div>
              {featured.category ? (
                <div className="workDiaryDesktop_featuredMeta">
                  <MergeButton label={featured.category} />
                </div>
              ) : null}
            </div>
          </FeaturedRoot>
        ) : null}

        {/* Figma 2714:8772 — wide, narrow | narrow, wide | … */}
        {rest.map((project, i) => (
          <ProjectCard
            background={project.background}
            eyebrow={project.category}
            fluid
            image={project.image}
            key={project.slug}
            title={[project.title]}
            to={project.path}
            wide={i % 4 === 0 || i % 4 === 3}
          />
        ))}
      </div>

      {cta ? <Cta to="/work">{cta}</Cta> : null}
    </section>
  )
}
