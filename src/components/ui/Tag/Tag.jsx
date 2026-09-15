import { cn } from '@/lib/cn'

import './Tag.css'

/**
 * Figma component "Tags".
 *
 * variant  outline — 1px black border, transparent fill, black label
 *          filled  — black fill, no border, white label
 * size     desktop — 12px/24px padding, 12px label   (frame 2714:8733)
 *          mobile  —  8px/20px padding,  8px label   (frame 2715:10365)
 *
 * Passing `onClick` makes it a toggle button instead: `selected` draws it
 * filled, unselected draws it outline (so `variant` is ignored), and
 * aria-pressed carries the state.
 */
export default function Tag({
  children,
  onClick,
  selected = false,
  variant = 'outline',
  size = 'desktop',
}) {
  if (onClick) {
    return (
      <button
        aria-pressed={selected}
        className={cn('tag_tag', 'tag_toggle', selected ? 'tag_filled' : 'tag_outline', `tag_${size}`)}
        onClick={onClick}
        type="button"
      >
        <span className="tag_label">
          <span className="tag_text">{children}</span>
        </span>
      </button>
    )
  }

  return (
    <div className={cn('tag_tag', `tag_${variant}`, `tag_${size}`)}>
      <div className="tag_label">
        <p className="tag_text">{children}</p>
      </div>
    </div>
  )
}
