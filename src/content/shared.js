import papad from '@/assets/images/papad.png'
import { PROJECTS } from '@/content/projects'

/**
 * Sections that appear on more than one page with the same content.
 */

/** Figma 2714:8800 (desktop) / 2715:10751 (mobile) — the Featured Story
    band on Home, Work diary and Design Dialogue. Its mobile box wears the
    featured project's own colour; mobile sets the name in title case. */
export const FEATURED_STORY = {
  type: 'featureBand',
  eyebrow: 'Featured Story',
  heading: 'PAPADMALJI',
  quote:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: papad,
  background: PROJECTS.find((project) => project.slug === 'papadmalji')
    ?.background,
  mobile: { heading: 'Papadmalji' },
}

/** The close every page shares: Exploration + Contact (their words live
    in content/settings.js). */
export const FOOTER = { type: 'footer' }
