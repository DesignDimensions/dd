import { cn } from '@/lib/cn'

import styles from './Cta.module.css'

/**
 * Figma component "CTA" (desktop) / "Button" (mobile) — black pill.
 *
 * Hover inverts it: a white fill wipes up over the black and the label
 * crosses to black on the same curve.
 */
export default function Cta({ children, size = 'desktop', type = 'button' }) {
  return (
    <button className={cn(styles.cta, styles[size])} type={type}>
      <span className={styles.fill} />
      <span className={styles.label}>
        <p className={styles.text}>{children}</p>
      </span>
    </button>
  )
}
