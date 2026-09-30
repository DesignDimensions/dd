import { articleName, pageName } from './where'

/**
 * What changed between two versions of the site, in words: pages and
 * projects by name, new and removed ones, a new project order.
 */
export function describeChanges(before, after) {
  if (!before)
    return [
      'Everything — this is the first time the site goes live from the studio.',
    ]
  const out = []
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

  const pages = new Map(before.pages.map((p) => [p.path, p]))
  const changedPages = after.pages
    .filter((p) => !same(p, pages.get(p.path)))
    .map(pageName)
  const newPages = after.pages.filter((p) => !pages.has(p.path)).map(pageName)
  if (changedPages.length)
    out.push(
      `${list(changedPages.filter((n) => !newPages.includes(n)))} edited`,
    )
  if (newPages.length) out.push(`New page: ${list(newPages)}`)

  const projects = new Map(before.projects.map((p) => [p.slug, p]))
  const now = new Set(after.projects.map((p) => p.slug))
  const added = after.projects
    .filter((p) => !projects.has(p.slug))
    .map((p) => p.title)
  const removed = before.projects
    .filter((p) => !now.has(p.slug))
    .map((p) => p.title)
  const edited = after.projects
    .filter((p) => projects.has(p.slug) && !same(p, projects.get(p.slug)))
    .map((p) => p.title)
  if (added.length)
    out.push(`New project${added.length > 1 ? 's' : ''}: ${list(added)}`)
  if (edited.length) out.push(`${list(edited)} edited`)
  if (removed.length) out.push(`Removed: ${list(removed)}`)
  const kept = (arr) =>
    arr
      .filter((p) => now.has(p.slug) && projects.has(p.slug))
      .map((p) => p.slug)
      .join()
  if (kept(before.projects) !== kept(after.projects))
    out.push('Projects reordered')

  const articles = new Map(before.articles.map((a) => [a.slug, a]))
  const articleChanges = after.articles
    .filter((a) => !same(a, articles.get(a.slug)))
    .map(articleName)
  if (articleChanges.length) out.push(`Articles: ${list(articleChanges)}`)
  if (before.articles.length > after.articles.length)
    out.push('An article was removed')

  if (!same(before.testimonials, after.testimonials))
    out.push('Testimonials edited')
  if (!same(before.settings, after.settings))
    out.push('Menu, footer or site details edited')
  return out.filter(Boolean)
}

function list(names) {
  const unique = [...new Set(names)]
  if (unique.length <= 3)
    return unique.join(', ').replace(/, ([^,]*)$/, ' and $1')
  return `${unique.slice(0, 3).join(', ')} and ${unique.length - 3} more`
}
