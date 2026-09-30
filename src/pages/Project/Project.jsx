import { useParams } from 'react-router-dom'

import StoryPage from '@/components/story/StoryPage.jsx'
import { getProjectStory } from '@/content/stories'
import NotFound from '@/pages/NotFound/NotFound.jsx'

/**
 * /work/:slug — a project case study: Suryagarh, written out in full, or
 * any project built from the shared template. The page is its story
 * (src/content/stories), rendered by StoryPage on the project's colour.
 */
export default function Project() {
  const { slug } = useParams()
  const story = getProjectStory(slug)

  if (!story) return <NotFound />

  return <StoryPage id={slug} story={story} />
}
