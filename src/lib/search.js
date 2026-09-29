import aboutHero from '@/assets/about/hero-bg.png'
import safetyPins from '@/assets/dialogue/safety-pins-photo.jpg'
import building from '@/assets/forms/building.jpg'
import ocean from '@/assets/forms/ocean.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import { NAV_ITEMS } from '@/lib/navigation'
import { PROJECT_PAGES } from '@/lib/projectPages'
import { PROJECTS } from '@/lib/projects'

/**
 * The site search: one flat index of everything that has a page —
 * projects, articles and the top-level pages — and a ranked match over
 * it. Everything is known at build time, so it runs entirely in the
 * browser with no service behind it.
 *
 * Every entry carries an image and a frame colour, since results show as
 * cards (as wepresent's do): a project its own, a page its hero's.
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

/** Only articles with a page of their own; the Design Dialogue cards
    without one aren't somewhere a result could take you. */
const ARTICLE_ENTRIES = [
  {
    type: 'Article',
    title: 'The humble safety pin',
    subtitle: 'Design Dialogue · Aparna Kakrania',
    to: '/design-dialogue/safety-pin',
    image: safetyPins,
    background: '#f3e9dc',
    keywords: [
      'safety pin',
      'Walter Hunt',
      'fibula',
      'Roman togas',
      'punk',
      'design dialogue',
      'article',
    ],
  },
]

/** A picture and a frame colour per page — the page's own hero image
    where it has one, and a colour from the page gradient. */
const PAGE_LOOK = {
  '/work': { image: PROJECTS[0]?.image, background: '#b0c3b4' },
  '/design-dialogue': { image: storyAi, background: '#dcf6f8' },
  '/about': { image: aboutHero, background: 'rgb(239, 221, 175)' },
}

const PAGE_KEYWORDS = {
  '/work': ['projects', 'portfolio', 'case studies', 'our pride'],
  '/design-dialogue': ['articles', 'stories', 'blog', 'journal'],
  '/about': [
    'founder',
    'Aparna Kakrania',
    'mission',
    'values',
    'philosophy',
    'brands',
    'studio',
  ],
}

const PAGE_ENTRIES = [
  ...NAV_ITEMS.filter((item) => item.to).map((item) => ({
    type: 'Page',
    title: item.label,
    subtitle: 'Page',
    to: item.to,
    ...PAGE_LOOK[item.to],
    keywords: PAGE_KEYWORDS[item.to] ?? [],
  })),
  {
    type: 'Page',
    title: 'Careers',
    subtitle: 'Page · Join our team',
    to: '/careers',
    image: building,
    background: 'rgb(255, 234, 178)',
    keywords: ['jobs', 'hiring', 'join', 'resume', 'work with us'],
  },
  {
    type: 'Page',
    title: 'Contact us',
    subtitle: 'Page · Get in touch',
    to: '/contact',
    image: ocean,
    background: 'rgb(255, 198, 201)',
    keywords: [
      'contact',
      'email',
      'phone',
      'address',
      'enquiry',
      'get in touch',
    ],
  },
]

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
