import { cn } from '@/lib/cn'

import './Cta.css'

/**
 * Figma component "CTA" (desktop) / "Button" (mobile) — black pill.
 * Hover inverts it to black-on-white with the same plain colour
 * transition every other button uses.
 */
export default function Cta({ children, size = 'desktop', type = 'button' }) {
  return (
    <button className={cn('cta_cta', `cta_${size}`)} type={type}>
      <span className="cta_label">
        <p className="cta_text">{children}</p>
      </span>
    </button>
  )
}
