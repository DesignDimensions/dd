import suryagarhCover from '@/assets/suryagarh/hero-banner.png'
import { projectImage } from '@/lib/projectImages'
import { PROJECT_PAGES } from '@/lib/projectPages'

/**
 * Every project in the Work diary, read off the project detail pages
 * themselves: the ones lib/projectPages.js renders through pages/Project,
 * plus Suryagarh's hand-built page. This is the one list anywhere work is
 * shown reads from — the Work diary grid (Home and /work), the header
 * menu's "Recommended" preview, and a project page's "More projects" rail —
 * so a card exists exactly when its page does.
 *
 * Each card takes its page's hero render as its image and the page's
 * "Project" meta as its category. Order follows the Figma canvas
 * (12357:15253), where Suryagarh is seventh.
 */
const SURYAGARH = {
  slug: 'suryagarh',
  title: 'Suryagarh',
  image: suryagarhCover,
  background: '#b0c3b4',
  path: '/work/suryagarh',
}

const fromPages = PROJECT_PAGES.map((page) => ({
  slug: page.slug,
  title: page.title,
  category: page.project ?? undefined,
  image: projectImage(page.slug, 'hero'),
  background: page.background,
  path: `/work/${page.slug}`,
}))

const afterBlossomHome = fromPages.findIndex((project) => project.slug === 'blossom-home') + 1

export const PROJECTS = [
  ...fromPages.slice(0, afterBlossomHome),
  SURYAGARH,
  ...fromPages.slice(afterBlossomHome),
]
