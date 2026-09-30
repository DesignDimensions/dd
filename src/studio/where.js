import { BLOCKS, SECTIONS } from './schema'

/**
 * Where in the site the studio is: a page, a project, an article, the
 * testimonials, or a group of settings — and from that, what list of
 * sections is being edited, which schema describes them, and what the
 * preview should show.
 */

export function pageName(page) {
  return page.path === '/' ? 'Home' : (page.search?.title ?? page.path)
}

export function articleName(article) {
  return article.search?.title ?? article.slug
}

/** The editable list (sections or blocks) for a location, if it has one. */
export function listOf(doc, where) {
  if (where.kind === 'page') {
    const i = doc.pages.findIndex((p) => p.path === where.path)
    return i === -1
      ? null
      : {
          path: ['pages', i, 'sections'],
          items: doc.pages[i].sections,
          schema: SECTIONS,
        }
  }
  if (where.kind === 'project') {
    const i = doc.projects.findIndex((p) => p.slug === where.slug)
    return i === -1
      ? null
      : {
          path: ['projects', i, 'story', 'blocks'],
          items: doc.projects[i].story.blocks,
          schema: BLOCKS,
        }
  }
  if (where.kind === 'article') {
    const i = doc.articles.findIndex((a) => a.slug === where.slug)
    return i === -1
      ? null
      : {
          path: ['articles', i, 'story', 'blocks'],
          items: doc.articles[i].story.blocks,
          schema: BLOCKS,
        }
  }
  return null
}

/** The address the preview shows for a location. */
export function previewPath(where, fallback = '/') {
  if (where.kind === 'page') return where.path
  if (where.kind === 'project') return `/work/${where.slug}`
  if (where.kind === 'article') return `/design-dialogue/${where.slug}`
  if (where.kind === 'testimonials') return '/'
  return fallback
}

/** The location for an address the preview went to. */
export function whereFor(doc, path) {
  if (doc.pages.some((p) => p.path === path)) return { kind: 'page', path }
  const project = path.match(/^\/work\/([^/]+)$/)
  if (project && doc.projects.some((p) => p.slug === project[1]))
    return { kind: 'project', slug: project[1] }
  const article = path.match(/^\/design-dialogue\/([^/]+)$/)
  if (article && doc.articles.some((a) => a.slug === article[1]))
    return { kind: 'article', slug: article[1] }
  return null
}

/** How a section is named in lists and on the preview. */
export function itemName(schema, item) {
  const def = schema[item.type]
  const base = def?.label ?? item.type
  const detail = item.heading ?? item.title ?? item.label ?? item.eyebrow
  const text = Array.isArray(detail) ? detail.join(' ') : detail
  return text &&
    typeof text === 'string' &&
    text.length < 40 &&
    def?.fields?.length
    ? `${base} · ${text}`
    : base
}

/** Every address something can link to, grouped, for link fields. */
export function routesOf(doc) {
  return [
    ...doc.pages.map((p) => ({
      group: 'Pages',
      path: p.path,
      label: pageName(p),
    })),
    ...doc.projects.map((p) => ({
      group: 'Projects',
      path: `/work/${p.slug}`,
      label: p.title,
    })),
    ...doc.articles.map((a) => ({
      group: 'Articles',
      path: `/design-dialogue/${a.slug}`,
      label: articleName(a),
    })),
  ]
}

/**
 * The path to the first text in `value` that reads like `text` — how a
 * click on words in the preview finds the field that holds them.
 */
export function findText(value, text, path = []) {
  if (!text) return null
  const want = normal(text)
  if (typeof value === 'string') {
    const have = normal(value)
    return have &&
      (have === want ||
        (want.length > 6 && have.includes(want)) ||
        (have.length > 6 && want.includes(have)))
      ? path
      : null
  }
  if (Array.isArray(value)) {
    if (
      value.length &&
      value.every((v) => typeof v === 'string') &&
      normal(value.join(' ')).includes(want.slice(0, 40))
    ) {
      return path
    }
    for (const [i, v] of value.entries()) {
      const found = findText(v, text, [...path, i])
      if (found) return found
    }
    return null
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (k === 'type' || k === 'image' || k === 'background') continue
      const found = findText(v, text, [...path, k])
      if (found) return found
    }
  }
  return null
}

function normal(text) {
  return String(text)
    .replace(/\s+/g, ' ')
    .replace(/[“”"]/g, '')
    .trim()
    .toLowerCase()
}
