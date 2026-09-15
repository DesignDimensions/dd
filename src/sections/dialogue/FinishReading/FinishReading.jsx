import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import storyCircles from '@/assets/mobile/story-1.jpg'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import CardRail from '@/sections/CardRail/CardRail.jsx'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2719:24380 – 24395 — the last card repeats the third's title
 * (kept verbatim) and carries the bookmark glyph rather than the arrow. */
const CARDS = [
  { background: '#dcf6f8', image: storyAi, title: ['AI is not the designer,', 'you are!'] },
  { background: '#ff694f', image: storyGradients, title: ['Gradients are not ', 'dependable'] },
  { background: '#c79275', image: story3d, title: ['3D slaying the design', 'industry'] },
  {
    background: '#d5dab5',
    glyph: 'bookmark',
    image: storyCircles,
    title: ['3D slaying the design', 'industry'],
  },
]

/**
 * Figma 2719:24362 — "Finish what you started" rail. `cards` swaps the set:
 * the article page (Figma 2719:18027) shows three, all bookmarked.
 */
export default function FinishReading({ cards = CARDS }) {
  return (
    <CardRail eyebrow="Come here often?" heading="Finish what you started" label="articles">
      {cards.map((card, index) => (
        <ProjectCard body={BODY_COPY} eyebrow="Article" key={index} {...card} />
      ))}
    </CardRail>
  )
}
