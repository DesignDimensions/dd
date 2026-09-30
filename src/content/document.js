import { PAGES } from './pages'
import { PROJECT_PAGES } from './projectPages'
import { PROJECTS } from './projects'
import {
  CONTACT,
  EXPLORATION,
  FOOTER_LINKS,
  MENU_BLURB,
  NAV_ITEMS,
  SOCIALS,
  STUDIO,
} from './settings'
import { ARTICLES, getProjectStory } from './stories'
import { TESTIMONIALS } from './testimonials'

const TAGS = Object.fromEntries(
  PROJECT_PAGES.map((page) => [page.slug, page.tags ?? []]),
)

/**
 * The website's content as one document — the shape the studio edits and
 * publishes, and the website renders:
 *
 *   settings       nav, menuBlurb, studio, footerLinks, socials, exploration, contact
 *   pages          [{ path, ground, search?, sections }]
 *   projects       [{ slug, title, category, background, image, tags, story }]
 *   articles       [{ slug, search, story }]
 *   testimonials   [{ project, name, role, quote, portrait }]
 *
 * This one is built from the files in src/content: what the website shows
 * when no studio is connected, and what the studio starts from.
 */
export function bundledDocument() {
  return {
    version: 1,
    settings: {
      nav: NAV_ITEMS,
      menuBlurb: MENU_BLURB,
      studio: STUDIO,
      footerLinks: FOOTER_LINKS,
      socials: SOCIALS,
      exploration: EXPLORATION,
      contact: CONTACT,
    },
    pages: Object.entries(PAGES).map(([path, page]) => ({ path, ...page })),
    projects: PROJECTS.map(({ path: _path, ...project }) => ({
      ...project,
      tags: TAGS[project.slug] ?? [],
      story: getProjectStory(project.slug),
    })),
    articles: Object.entries(ARTICLES).map(([slug, { search, ...story }]) => ({
      slug,
      search,
      story,
    })),
    testimonials: TESTIMONIALS,
  }
}
