/**
 * The site search: one flat index of everything that has a page —
 * projects, articles and the top-level pages — and a ranked match over
 * it. Everything is known at build time, so it runs entirely in the
 * browser with no service behind it.
 *
 * Built from the content itself (createSearch, from select.js): every
 * project, every article and every page with `search` details, so a new
 * entry is searchable as soon as it exists. Each carries an image and a frame colour, since
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

/** The order results are grouped in. */
export const GROUPS = ['Project', 'Article', 'Page']

/**
 * The search over a site's content: `search(query)` for ranked results,
 * `latest` for wepresent's "Explore the latest" (the three newest
 * projects).
 */
export function createSearch({ projects, articles, pages }) {
  const projectEntries = projects.map((project) => ({
    type: 'Project',
    title: project.title,
    subtitle: project.category ?? 'Project',
    to: project.path,
    image: project.image,
    background: project.background,
    keywords: [project.category, ...(project.tags ?? [])].filter(Boolean),
  }))
  const articleEntries = articles.map(({ slug, search }) => ({
    type: 'Article',
    to: `/design-dialogue/${slug}`,
    ...search,
  }))
  const pageEntries = Object.entries(pages)
    .filter(([, page]) => page.search)
    .map(([path, page]) => ({ type: 'Page', to: path, ...page.search }))

  const index = [...projectEntries, ...articleEntries, ...pageEntries].map(
    (entry) => ({
      ...entry,
      _title: normalize(entry.title),
      _rest: normalize([entry.subtitle, ...entry.keywords].join(' ')),
    }),
  )

  return {
    search: (query) => rank(index, query),
    latest: projectEntries.slice(0, 3),
  }
}

/**
 * Every word of the query must appear somewhere in an entry; entries rank
 * by how well the words hit the title — the whole title starting with the
 * query, then a title word starting with a query word, then anywhere in
 * the title, then only in the category, tags or keywords.
 */
function rank(index, query) {
  const q = normalize(query).trim()
  if (!q) return []
  const words = q.split(/\s+/)

  const scored = []
  for (const entry of index) {
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
