import { cn } from '@/lib/cn'

import styles from './Tag.module.css'

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
    <div className={cn(styles.tag, styles[variant], styles[size])}>
      <div className={styles.label}>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  )
}
