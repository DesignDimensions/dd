import { PAGES } from '@/content/pages'
import { PROJECT_PAGES } from '@/content/projectPages'
import { PROJECTS } from '@/content/projects'
import { ARTICLES } from '@/content/stories'

/**
 * The site search: one flat index of everything that has a page —
 * projects, articles and the top-level pages — and a ranked match over
 * it. Everything is known at build time, so it runs entirely in the
 * browser with no service behind it.
 *
 * Built from the content itself: every project, every article and every
 * page with `search` details (src/content), so a new entry is searchable
 * as soon as it exists. Each carries an image and a frame colour, since
 * results show as cards (as wepresent's do).
 */

/** Lower-case, with accents and apostrophes dropped, so "natures" and
    "nature's" both find "Nature’s" and "cafe" finds "Café". */
export function normalize(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’‘`]/g, '')
    .toLowerCase()
}

const TAGS_BY_SLUG = Object.fromEntries(
  PROJECT_PAGES.map((page) => [page.slug, page.tags ?? []]),
)

const PROJECT_ENTRIES = PROJECTS.map((project) => ({
  type: 'Project',
  title: project.title,
  subtitle: project.category ?? 'Project',
  to: project.path,
  image: project.image,
  background: project.background,
  keywords: [project.category, ...(TAGS_BY_SLUG[project.slug] ?? [])].filter(
    Boolean,
  ),
}))

const ARTICLE_ENTRIES = Object.entries(ARTICLES).map(([slug, story]) => ({
  type: 'Article',
  to: `/design-dialogue/${slug}`,
  ...story.search,
}))

const PAGE_ENTRIES = Object.entries(PAGES)
  .filter(([, page]) => page.search)
  .map(([path, page]) => ({ type: 'Page', to: path, ...page.search }))

const INDEX = [...PROJECT_ENTRIES, ...ARTICLE_ENTRIES, ...PAGE_ENTRIES].map(
  (entry) => ({
    ...entry,
    _title: normalize(entry.title),
    _rest: normalize([entry.subtitle, ...entry.keywords].join(' ')),
  }),
)

/** The order results are grouped in. */
export const GROUPS = ['Project', 'Article', 'Page']

/** wepresent's "Explore the latest": the three newest projects. */
export const LATEST = PROJECT_ENTRIES.slice(0, 3)

/**
 * Every word of the query must appear somewhere in an entry; entries rank
 * by how well the words hit the title — the whole title starting with the
 * query, then a title word starting with a query word, then anywhere in
 * the title, then only in the category, tags or keywords.
 */
export function search(query) {
  const q = normalize(query).trim()
  if (!q) return []
  const words = q.split(/\s+/)

  const scored = []
  for (const entry of INDEX) {
    let score = 0
    let matchedAll = true
    for (const word of words) {
      if (new RegExp(`(^|[^a-z0-9])${escape(word)}`).test(entry._title))
        score += 3
      else if (entry._title.includes(word)) score += 2
      else if (entry._rest.includes(word)) score += 1
      else {
        matchedAll = false
        break
      }
    }
    if (!matchedAll) continue
    if (entry._title.startsWith(q)) score += 4
    if (entry._title === q) score += 4
    scored.push({ entry, score })
  }

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        GROUPS.indexOf(a.entry.type) - GROUPS.indexOf(b.entry.type),
    )
    .map(({ entry }) => entry)
}

function escape(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
