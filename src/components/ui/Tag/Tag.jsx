import { cn } from '@/lib/cn'

import './Tag.css'

/**
 * Figma component "Tags".
 *
 * variant  outline — 1px black border, transparent fill, black label
 *          filled  — black fill, no border, white label
 * size     desktop — 12px/24px padding, 12px label   (frame 2714:8733)
 *          mobile  —  8px/20px padding,  8px label   (frame 2715:10365)
 */
export default function Tag({
  children,
  variant = 'outline',
  size = 'desktop',
}) {
  return (
    <div className={cn('tag_tag', `tag_${variant}`, `tag_${size}`)}>
      <div className="tag_label">
        <p className="tag_text">{children}</p>
      </div>
    </div>
  )
}
