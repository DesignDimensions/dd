import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import storyCircles from '@/assets/mobile/story-1.jpg'
import { FEATURED_STORY, FOOTER } from '@/content/shared'

const BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** A Design Dialogue card: an article, eyebrow "Article". */
const card = (fields) => ({ body: BODY, eyebrow: 'Article', ...fields })

/**
 * Figma 2719:24276 — the Design Dialogue page. Titles and images repeat
 * across cards in the frame; kept verbatim. The circles image is the one
 * the mobile Design Dialogue uses (byte-identical to the frame's).
 */
export const DESIGN_DIALOGUE_PAGE = {
  ground: 'dialogue',
  // How the page shows up in search (lib/search.js): as a card.
  search: {
    title: 'Design dialogue',
    subtitle: 'Page',
    image: storyAi,
    background: '#dcf6f8',
    keywords: ['articles', 'stories', 'blog', 'journal'],
  },
  sections: [
    { type: 'headerBand' },
    // Figma 2719:24305 — one featured across the full row, a row of three,
    // and a wide card beside a single.
    {
      type: 'articleGrid',
      eyebrow: 'We have more for you',
      heading: 'Design Dialogue',
      intro: BODY,
      featured: {
        background: '#dcf6f8',
        body: BODY,
        eyebrow: 'Article',
        image: storyAi,
        title: 'AI is not the designer, you are!',
      },
      cards: [
        card({
          background: '#ff694f',
          image: storyGradients,
          title: ['Gradients are not ', 'dependable'],
        }),
        card({
          background: '#c79275',
          image: story3d,
          title: ['3D slaying the design', 'industry'],
        }),
        card({
          background: '#d5dab5',
          image: storyCircles,
          title: ['3D slaying the design', 'industry'],
        }),
        card({
          background: '#d5dab5',
          image: story3d,
          title: ['3D slaying the design industry'],
          wide: true,
        }),
        card({
          background: '#ff694f',
          image: storyGradients,
          title: ['Gradients are not ', 'dependable'],
        }),
      ],
    },
    FEATURED_STORY,
    // Figma 2719:24380 – 24395 — the last card repeats the third's title
    // (kept verbatim) and carries the bookmark glyph rather than the arrow.
    {
      type: 'readingRail',
      eyebrow: 'Come here often?',
      heading: 'Finish what you started',
      cards: [
        card({
          background: '#dcf6f8',
          image: storyAi,
          title: ['AI is not the designer,', 'you are!'],
        }),
        card({
          background: '#ff694f',
          image: storyGradients,
          title: ['Gradients are not ', 'dependable'],
        }),
        card({
          background: '#c79275',
          image: story3d,
          title: ['3D slaying the design', 'industry'],
        }),
        card({
          background: '#d5dab5',
          glyph: 'bookmark',
          image: storyCircles,
          title: ['3D slaying the design', 'industry'],
        }),
      ],
    },
    FOOTER,
  ],
}
