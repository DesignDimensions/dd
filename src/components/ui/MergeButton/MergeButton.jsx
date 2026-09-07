import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import { cn } from '@/lib/cn'

import './MergeButton.css'

/**
 * Figma draws a tag and an arrow as two separate outlined shapes.
 * On hover both invert, using the same plain colour transition every
 * other button on the page uses.
 */
export default function MergeButton({ label, size = 40, gap = 24 }) {
  return (
    <div
      className={cn('mergeButton_group', size === 32 && 'mergeButton_mobile')}
      style={{ gap }}
    >
      <div className="mergeButton_pill">
        <p className="mergeButton_label">{label}</p>
      </div>
      <div className="mergeButton_arrow">
        <ArrowCircle size={size} />
      </div>
    </div>
  )
}
