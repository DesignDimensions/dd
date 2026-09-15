import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import CardRail from '@/sections/CardRail/CardRail.jsx'
import { PROJECTS } from '@/lib/projects'

/**
 * Figma 2955:12765 — "You may also like to see": up to six projects from
 * lib/projects.js other than `current`, each linking to its page where it
 * has one. With no other project, the section is left out rather than
 * filled with placeholders.
 */
export default function MoreProjects({ current }) {
  const others = PROJECTS.filter((project) => project.slug !== current).slice(0, 6)

  if (others.length === 0) return null

  return (
    <CardRail eyebrow="You may also like to see" heading="More projects" label="projects">
      {others.map((project) => (
        <ProjectCard
          background={project.background}
          eyebrow={project.category}
          image={project.image}
          key={project.slug}
          title={[project.title]}
          to={project.path}
        />
      ))}
    </CardRail>
  )
}
