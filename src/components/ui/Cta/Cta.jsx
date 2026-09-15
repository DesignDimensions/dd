import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'

import './Cta.css'

/**
 * Figma component "CTA" (desktop) / "Button" (mobile) — black pill.
 * Hover inverts it to black-on-white with the same plain colour
 * transition every other button uses.
 *
 * `to` renders it as a link to that route instead of a button.
 */
export default function Cta({ children, size = 'desktop', to, type = 'button' }) {
  const className = cn('cta_cta', `cta_${size}`)
  const label = (
    <span className="cta_label">
      <p className="cta_text">{children}</p>
    </span>
  )

  return to ? (
    <Link className={className} to={to}>
      {label}
    </Link>
  ) : (
    <button className={className} type={type}>
      {label}
    </button>
  )
}
