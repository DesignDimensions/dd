import { projectImage } from '@/lib/projectImages'
import { PROJECT_PAGES } from '@/content/projectPages'

/**
 * The template's placeholder copy, verbatim from its text sections (Figma
 * 2719:25066 / 25082 / 25106, overview 2719:25002, quote band 2719:27054).
 * Every project frame carries the same copy, "aliqua.or." typo included —
 * the real copy is what the CMS will supply per project.
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

/** The right-hand column of each text-block variant (long | mid | short | compact). */
function textBody(variant) {
  if (variant === 'long') {
    return [
      { style: 'quote', text: COPY.serif },
      { style: 'paragraph', text: COPY.body },
    ]
  }
  if (variant === 'mid') {
    return [
      { style: 'paragraph', text: COPY.mid },
      { style: 'paragraph', text: LOREM },
    ]
  }
  return [{ style: 'paragraph', text: COPY.body }]
}

/**
 * Figma 12357:15253 — a project built from the shared case-study template
 * (content/projectPages.js, generated from the frames) as a story: its
 * sections in the frame's own order on its project colour, then the
 * "More projects" rail and the footer. Null for an unknown slug.
 */
export function projectStory(slug) {
  const page = PROJECT_PAGES.find((entry) => entry.slug === slug)
  if (!page) return null

  const meta = [{ label: 'Client', value: page.title }]
  if (page.project) meta.push({ label: 'Project', value: page.project })

  const blocks = page.blocks.map((block) => {
    const image = block.image ? projectImage(page.slug, block.image) : undefined
    switch (block.type) {
      case 'hero':
        return { type: 'banner', image }
      case 'overview':
        return { type: 'overview', title: COPY.overview, meta, tags: page.tags }
      case 'text':
        return {
          type: 'text',
          title: block.title,
          lede: LOREM,
          spacious: block.variant === 'short',
          body: textBody(block.variant),
        }
      case 'quote':
        return {
          type: 'quote',
          text: COPY.quote,
          background: block.background,
          color: block.color,
        }
      case 'band':
        return { type: 'band', image }
      case 'card':
        return { type: 'card', image, width: block.width, height: block.height }
      default:
        return null
    }
  })

  return {
    ground: page.background,
    blocks: [
      ...blocks.filter(Boolean),
      { type: 'moreProjects', current: page.slug },
      { type: 'footer' },
    ],
  }
}
