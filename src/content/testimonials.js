import portrait from '@/assets/images/testimonial-portrait.jpg'
import { PROJECTS } from '@/content/projects'

const QUOTE =
  '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”'

/**
 * One entry per client, keyed to their project in content/projects.js so the
 * card takes that project's frame colour and links to its page — the same
 * colour its Work diary card wears.
 */
const ENTRIES = [
  { slug: '15-ad', name: 'Mr. XYZ', role: 'Founder, 15 AD' },
  {
    slug: 'natures-miracle',
    name: 'Mr. XYZ',
    role: 'Co-Founder, Nature’s Miracle',
  },
  // Placeholders duplicating the two above until the real quotes arrive —
  // spread across other projects so each card shows a different frame.
  { slug: 'papadmalji', name: 'Mr. XYZ', role: 'Founder, Papadmalji' },
  { slug: 'godawan', name: 'Mr. XYZ', role: 'Brand Head, Godawan' },
  { slug: 'a-pag', name: 'Mr. XYZ', role: 'Director, A-PAG' },
  { slug: 'blossom-home', name: 'Mr. XYZ', role: 'Founder, Blossom Home' },
  { slug: 'jujuteh', name: 'Mr. XYZ', role: 'Founder, Jujuteh' },
  { slug: 'samsara', name: 'Mr. XYZ', role: 'Co-Founder, Samsara' },
  { slug: 'baba-nauratan', name: 'Mr. XYZ', role: 'Director, Baba Nauratan' },
  { slug: 'san-lorenzo', name: 'Mr. XYZ', role: 'Founder, San Lorenzo' },
]

export const TESTIMONIALS = ENTRIES.map((entry) => {
  const project = PROJECTS.find((p) => p.slug === entry.slug)
  return {
    ...entry,
    title: project?.title ?? entry.slug,
    category: project?.category,
    background: project?.background ?? '#f0f0f0',
    path: project?.path,
    portrait,
    quote: QUOTE,
  }
})
