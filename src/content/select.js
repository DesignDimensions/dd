import { createSearch } from '@/lib/search'

/**
 * Everything the components read, derived from a content document (see
 * document.js): pages by route, projects with their paths, stories by
 * slug, testimonials carrying their project's colour and link, and the
 * search over all of it.
 */
export function select(doc) {
  const projects = doc.projects.map((project) => ({
    ...project,
    path: `/work/${project.slug}`,
  }))
  const projectBySlug = new Map(
    projects.map((project) => [project.slug, project]),
  )
  const articleBySlug = new Map(
    doc.articles.map((article) => [article.slug, article]),
  )

  const testimonials = doc.testimonials.map(({ project: slug, ...entry }) => {
    const project = projectBySlug.get(slug)
    return {
      slug,
      ...entry,
      title: project?.title ?? slug,
      category: project?.category,
      background: project?.background ?? '#f0f0f0',
      path: project?.path,
    }
  })

  const content = {
    doc,
    settings: doc.settings,
    pages: Object.fromEntries(
      doc.pages.map(({ path, ...page }) => [path, page]),
    ),
    projects,
    articles: doc.articles,
    testimonials,
    // A project's page wears its colour unless its story sets another.
    projectStory: (slug) => {
      const project = projectBySlug.get(slug)
      return project ? { ...project.story, ground: project.story.ground ?? project.background } : null
    },
    articleStory: (slug) => articleBySlug.get(slug)?.story ?? null,
  }
  return { ...content, ...createSearch(content) }
}
