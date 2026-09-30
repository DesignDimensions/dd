import { PROJECTS } from '@/content/projects'
import { FEATURED_STORY, FOOTER } from '@/content/shared'

/** Figma 2715:12183 — the Work diary page: every project. */
export const WORK_PAGE = {
  ground: 'work',
  // How the page shows up in search (lib/search.js): as a card.
  search: {
    title: 'Work diary',
    subtitle: 'Page',
    image: PROJECTS[0]?.image,
    background: '#b0c3b4',
    keywords: ['projects', 'portfolio', 'case studies', 'our pride'],
  },
  sections: [
    { type: 'headerBand' },
    {
      type: 'projectGrid',
      eyebrow: 'Our pride',
      heading: 'Work diary',
      filterLabel: 'Newest',
      cta: null,
    },
    FEATURED_STORY,
    FOOTER,
  ],
}
