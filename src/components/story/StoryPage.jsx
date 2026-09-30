import Page from '@/components/layout/Page/Page.jsx'
import ArticleBanner from '@/sections/dialogue/ArticleBanner/ArticleBanner.jsx'
import ArticleBlock, {
  ArticleRow,
} from '@/sections/dialogue/ArticleBlock/ArticleBlock.jsx'
import FinishReading from '@/sections/dialogue/FinishReading/FinishReading.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import ImageCard from '@/sections/project/ImageCard/ImageCard.jsx'
import MoreProjects from '@/sections/project/MoreProjects/MoreProjects.jsx'
import ProjectBanner from '@/sections/project/ProjectBanner/ProjectBanner.jsx'
import ProjectTextBlock from '@/sections/project/ProjectTextBlock/ProjectTextBlock.jsx'
import QuoteBig from '@/sections/project/QuoteBig/QuoteBig.jsx'
import ShowcaseBand from '@/sections/ShowcaseBand/ShowcaseBand.jsx'
import StoryOverview from '@/sections/StoryOverview/StoryOverview.jsx'

import ZoomImage from './ZoomImage.jsx'

/** A full-bleed band slides up under these (they paint above it); after
    anything else it sits on the page's normal gap. */
const BAND_TUCKS_UNDER = new Set(['overview', 'text', 'card', 'article'])

/**
 * Every story page — the 22 project case studies, Suryagarh and the
 * Design Dialogue article — is one list of blocks (src/content/stories),
 * rendered here in order on the story's ground. The block types are the
 * CMS's content blocks:
 *
 *   banner        hero image                     { image }
 *   pinBanner     the article's safety-pin hero  {}
 *   overview      title card, meta, tags, audio  { title, meta, tags, audio? }
 *   band          full-bleed image               { image, height? }
 *   text          text card, optional pictures   { title?, lede?, body, media?, spacious? }
 *   quote         big pull quote                 { text, background?, color? }
 *   card          inset image card               { image, width, height }
 *   article       labelled article rows          { rows }
 *   moreProjects  "More projects" rail           { current }
 *   finishReading "Finish what you started" rail { eyebrow, heading, cards }
 *   footer        the FooterZone every page ends on
 *
 * Blocks are keyed by the story's id, so moving to another story renders
 * it fresh.
 */
export default function StoryPage({ id, story }) {
  return (
    <Page ground={story.ground}>
      {story.blocks.map((block, index) => (
        <Block
          block={block}
          key={`${id}-${index}`}
          previous={story.blocks[index - 1]}
        />
      ))}
    </Page>
  )
}

function Block({ block, previous }) {
  switch (block.type) {
    case 'banner':
      return <ProjectBanner src={block.image} />
    case 'pinBanner':
      return <ArticleBanner />
    case 'overview':
      return (
        <StoryOverview
          audio={block.audio}
          meta={block.meta}
          tags={block.tags}
          title={block.title}
        />
      )
    case 'band':
      return (
        <ShowcaseBand
          flush={!BAND_TUCKS_UNDER.has(previous?.type)}
          height={block.height}
          src={block.image}
        />
      )
    case 'text':
      return (
        <ProjectTextBlock
          lede={block.lede}
          media={block.media ? <TextMedia rows={block.media} /> : undefined}
          spacious={block.spacious}
          title={block.title}
        >
          {block.body.map((part, i) => (
            <p
              className={
                part.style === 'quote'
                  ? 'projectTextBlock_quote'
                  : 'projectTextBlock_paragraph'
              }
              key={i}
            >
              {part.text}
            </p>
          ))}
        </ProjectTextBlock>
      )
    case 'quote':
      return (
        <QuoteBig background={block.background} color={block.color}>
          {block.text}
        </QuoteBig>
      )
    case 'card':
      return (
        <ImageCard
          height={block.height}
          src={block.image}
          width={block.width}
        />
      )
    case 'article':
      return (
        <ArticleBlock>
          {block.rows.map((row, i) => (
            <ArticleRow key={i} label={row.label}>
              {row.content.map((item, j) => (
                <ArticleItem item={item} key={j} />
              ))}
            </ArticleRow>
          ))}
        </ArticleBlock>
      )
    case 'moreProjects':
      return <MoreProjects current={block.current} />
    case 'finishReading':
      return (
        <FinishReading
          cards={block.cards}
          eyebrow={block.eyebrow}
          heading={block.heading}
        />
      )
    case 'footer':
      return <FooterZone />
    default:
      return null
  }
}

/** A text card's picture rows: one full width, a pair of halves (each on
    an optional backing colour), or a pair of squares. Each opens in the
    lightbox. */
function TextMedia({ rows }) {
  return rows.map((row, i) =>
    row.layout === 'full' ? (
      <div className="projectTextBlock_mediaFull" key={i}>
        <ZoomImage className="projectTextBlock_mediaImage" src={row.image} />
      </div>
    ) : (
      <div className="projectTextBlock_mediaPair" key={i}>
        {row.items.map((item, j) => (
          <div
            className={
              row.layout === 'squares'
                ? 'projectTextBlock_mediaSquareHalf'
                : 'projectTextBlock_mediaHalf'
            }
            key={j}
            style={
              item.background ? { backgroundColor: item.background } : undefined
            }
          >
            <ZoomImage
              className="projectTextBlock_mediaImage"
              src={item.image}
            />
          </div>
        ))}
      </div>
    ),
  )
}

/** One piece of an article row: a lead or body paragraph, a picture, or
    the doubled "collage" picture (only its front copy zooms). */
function ArticleItem({ item }) {
  switch (item.type) {
    case 'lead':
      return <p className="articleBlock_lead">{item.text}</p>
    case 'body':
      return <p className="articleBlock_body">{item.text}</p>
    case 'image':
      return (
        <ZoomImage
          alt={item.alt}
          className="articleBlock_image"
          src={item.image}
        />
      )
    case 'collage':
      return (
        <div className="articleBlock_collage">
          <ZoomImage className="articleBlock_collagePhoto" src={item.image} />
          <img alt="" className="articleBlock_collageEcho" src={item.image} />
        </div>
      )
    default:
      return null
  }
}
