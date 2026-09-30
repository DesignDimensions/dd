import heroBg from '@/assets/images/hero-bg.jpg'
import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import story1 from '@/assets/mobile/story-1.jpg'
import { FEATURED_STORY, FOOTER } from '@/content/shared'

const BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/**
 * Figma 2714:8733 (desktop) / 2715:10365 (mobile) — Home.
 *
 * Figma runs Exploration before Testimonials. Testimonials moves up here
 * so Exploration and Contact can close the page together, as on Suryagarh.
 */
export const HOME_PAGE = {
  ground: 'gradient',
  sections: [
    { type: 'homeHero', image: heroBg },
    // The frame's tag reads "Packaging design" (desktop, 2714:8755) and
    // "Packaging Design" (mobile); kept as each states it.
    {
      type: 'projectIntro',
      heading: 'Snack Factory',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      tag: 'Packaging design',
      mobile: { tag: 'Packaging Design' },
    },
    // The first seven projects: the featured card and two full rows.
    {
      type: 'projectGrid',
      eyebrow: 'Our pride',
      heading: 'Work diary',
      filterLabel: 'Genre',
      cta: 'View All Projects',
      ctaTo: '/work',
      limit: 7,
      mobile: { filterLabel: 'Newest', cta: 'View More Projects' },
    },
    FEATURED_STORY,
    // Titles and images repeat across the cards in the frames; kept
    // verbatim. The mobile deck is its own set of four (2715:11897).
    {
      type: 'storyCarousel',
      eyebrow: 'We dig deep',
      heading: 'Design Dialogue',
      intro: BODY,
      cta: 'View All Stories',
      cards: [
        {
          background: '#dcf6f8',
          body: BODY,
          eyebrow: 'Article',
          image: storyAi,
          title: ['AI is not the designer,', 'you are!'],
        },
        {
          background: '#ff694f',
          body: BODY,
          eyebrow: 'Article',
          image: storyGradients,
          title: ['Gradients are not ', 'dependable'],
        },
        {
          background: '#c79275',
          body: BODY,
          eyebrow: 'Article',
          image: story3d,
          title: ['3D slaying the design', 'industry'],
        },
      ],
      mobile: {
        eyebrow: 'We have more for you',
        cards: [
          {
            image: story1,
            background: '#d5dab5',
            glyph: 'arrow',
            cropped: true,
          },
          {
            image: storyGradients,
            background: '#ff694f',
            glyph: 'bookmark',
            cropped: false,
          },
          {
            image: story1,
            background: '#d5dab5',
            glyph: 'arrow',
            cropped: true,
          },
          {
            image: storyGradients,
            background: '#ff694f',
            glyph: 'bookmark',
            cropped: false,
          },
        ].map((card) => ({
          ...card,
          title: ['3D slaying the design', 'industry!'],
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        })),
      },
    },
    {
      type: 'testimonials',
      eyebrow: 'We believe',
      heading: 'Each one is a earned and treasured',
      cta: 'View More',
      mobile: { headingLines: ['Each one is a earned ', 'and treasured'] },
    },
    FOOTER,
  ],
}
