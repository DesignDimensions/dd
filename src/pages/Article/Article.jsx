import { useParams } from 'react-router-dom'

import StoryPage from '@/components/story/StoryPage.jsx'
import { getArticleStory } from '@/content/stories'
import NotFound from '@/pages/NotFound/NotFound.jsx'

/**
 * /design-dialogue/:slug — a Design Dialogue article, rendered by
 * StoryPage from its story (src/content/stories), like a case study.
 */
export default function Article() {
  const { slug } = useParams()
  const story = getArticleStory(slug)

  if (!story) return <NotFound />

  return <StoryPage id={slug} story={story} />
}
