import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import CardRail from '@/sections/CardRail/CardRail.jsx'

/**
 * Figma 2719:24362 — the "Finish what you started" rail; its heading and
 * cards come from content (the Design Dialogue page shows four, the
 * article page, Figma 2719:18027, three, all bookmarked).
 */
export default function FinishReading({ cards, eyebrow, heading }) {
  return (
    <CardRail eyebrow={eyebrow} heading={heading} label="articles">
      {cards.map((card, index) => (
        <ProjectCard key={index} {...card} />
      ))}
    </CardRail>
  )
}
