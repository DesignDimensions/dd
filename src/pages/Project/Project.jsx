import { useParams } from 'react-router-dom'

import { projectImage } from '@/lib/projectImages'
import { PROJECT_PAGES } from '@/lib/projectPages'
import NotFound from '@/pages/NotFound/NotFound.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import ImageCard from '@/sections/project/ImageCard/ImageCard.jsx'
import MoreProjects from '@/sections/project/MoreProjects/MoreProjects.jsx'
import ProjectBanner from '@/sections/project/ProjectBanner/ProjectBanner.jsx'
import ProjectTextBlock from '@/sections/project/ProjectTextBlock/ProjectTextBlock.jsx'
import QuoteBig from '@/sections/project/QuoteBig/QuoteBig.jsx'
import ShowcaseBand from '@/sections/ShowcaseBand/ShowcaseBand.jsx'
import StoryOverview from '@/sections/StoryOverview/StoryOverview.jsx'

import './Project.css'

/**
 * The template's placeholder copy, verbatim from its text sections (Figma
 * 2719:25066 / 25082 / 25106, overview 2719:25002, quote band 2719:27054).
 * Every project frame carries the same copy, "aliqua.or." typo included.
 */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const LOREM_OR = `${LOREM.slice(0, -1)}.or.`
const COPY = {
  body: [LOREM_OR, LOREM_OR, LOREM_OR, LOREM_OR].join(' '),
  mid: [LOREM, LOREM_OR, LOREM_OR, LOREM].join(' '),
  overview: `“${LOREM}”`,
  quote:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  serif: [LOREM, LOREM, LOREM].join(' '),
}

/** The right-hand column of each text-block variant. */
function TextColumn({ variant }) {
  if (variant === 'long') {
    return (
      <>
        <p className="projectTextBlock_quote">{COPY.serif}</p>
        <p className="projectTextBlock_paragraph">{COPY.body}</p>
      </>
    )
  }
  if (variant === 'mid') {
    return (
      <>
        <p className="projectTextBlock_paragraph">{COPY.mid}</p>
        <p className="projectTextBlock_paragraph">{LOREM}</p>
      </>
    )
  }
  return <p className="projectTextBlock_paragraph">{COPY.body}</p>
}

/** A full-bleed band slides up under these (they paint above it). */
const BAND_TUCKS_UNDER = new Set(['overview', 'text', 'card'])

/**
 * Figma 12357:15253 — one route for every project case study built from the
 * shared template (Suryagarh keeps its own hand-built page). The sections
 * come from lib/projectPages.js in the frame's own order, on the same parts
 * as Suryagarh: banner, overview card, text blocks, image cards, full-bleed
 * bands and quote bands, then the "More projects" rail and the footer band.
 *
 * The page ground is the project's own colour — the one its Work diary card
 * is framed in.
 */
export default function Project() {
  const { slug } = useParams()
  const page = PROJECT_PAGES.find((entry) => entry.slug === slug)

  if (!page) return <NotFound />

  const meta = [{ label: 'Client', value: page.title }]
  if (page.project) meta.push({ label: 'Project', value: page.project })

  return (
    <div className="project_page" style={{ backgroundColor: page.background }}>
      {page.blocks.map((block, index) => {
        const key = `${page.slug}-${index}`
        const src = block.image ? projectImage(page.slug, block.image) : undefined

        switch (block.type) {
          case 'hero':
            return <ProjectBanner key={key} src={src} />
          case 'overview':
            return <StoryOverview key={key} meta={meta} tags={page.tags} title={COPY.overview} />
          case 'text':
            return (
              <ProjectTextBlock
                key={key}
                lede={LOREM}
                spacious={block.variant === 'short'}
                title={block.title}
              >
                <TextColumn variant={block.variant} />
              </ProjectTextBlock>
            )
          case 'quote':
            return (
              <QuoteBig background={block.background} color={block.color} key={key}>
                {COPY.quote}
              </QuoteBig>
            )
          case 'band':
            return (
              <ShowcaseBand
                flush={!BAND_TUCKS_UNDER.has(page.blocks[index - 1]?.type)}
                key={key}
                src={src}
              />
            )
          case 'card':
            return <ImageCard height={block.height} key={key} src={src} width={block.width} />
          default:
            return null
        }
      })}

      <MoreProjects current={page.slug} />
      <FooterZone />
    </div>
  )
}
