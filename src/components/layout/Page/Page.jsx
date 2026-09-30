import { cn } from '@/lib/cn'

import './Page.css'

/** The named grounds in Page.css; anything else is taken as a colour. */
const GROUNDS = new Set(['gradient', 'work', 'dialogue', 'article'])

/**
 * The wrapper every page renders its sections into: one column, the
 * shared --section-gap between sections, framed by --page-inset down
 * both sides and along the bottom (not the top: the hero runs flush to
 * the viewport's top edge).
 *
 * `ground` is what the page sits on — Home's gradient ("gradient"), one
 * of the listing/article pages' bottom-anchored gradients ("work",
 * "dialogue", "article"), or a plain colour (a project page wears its
 * project's colour).
 */
export default function Page({ children, ground = 'gradient' }) {
  const preset = GROUNDS.has(ground)

  return (
    <div
      className={cn('page_page', preset && `page_${ground}`)}
      style={preset ? undefined : { backgroundColor: ground }}
    >
      {children}
    </div>
  )
}
