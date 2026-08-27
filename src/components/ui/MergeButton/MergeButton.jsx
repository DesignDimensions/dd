import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import { cn } from '@/lib/cn'

import styles from './MergeButton.module.css'

/**
 * Figma draws a tag and an arrow as two separate outlined shapes.
 * On hover both invert, using the same plain colour transition every
 * other button on the page uses.
 */
export default function MergeButton({ label, size = 40, gap = 24 }) {
  return (
    <div
      className={cn(styles.group, size === 32 && styles.mobile)}
      style={{ gap }}
    >
      <div className={styles.pill}>
        <p className={styles.label}>{label}</p>
      </div>
      <div className={styles.arrow}>
        <ArrowCircle size={size} />
      </div>
    </div>
  )
}
