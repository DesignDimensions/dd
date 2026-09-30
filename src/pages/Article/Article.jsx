import { useParams } from 'react-router-dom'

import StoryPage from '@/components/story/StoryPage.jsx'
import { useContent } from '@/content/useContent'
import NotFound from '@/pages/NotFound/NotFound.jsx'

/**
 * /design-dialogue/:slug — a Design Dialogue article, rendered by
 * StoryPage from its story (the content's stories), like a case study.
 */
export default function Article() {
  const { slug } = useParams()
  const { articleStory } = useContent()
  const story = articleStory(slug)

  if (!story) return <NotFound />

  return <StoryPage id={slug} story={story} />
}
