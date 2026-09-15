import { cn } from '@/lib/cn'

import './QuoteBig.css'

/**
 * Figma 2955:12729 — a single large centred pull quote on the page ground.
 *
 * `background` paints it as a full-bleed band instead, with the quote in
 * `color` — the project frames' coloured quote bands ("Frame 139", e.g.
 * 2719:27054).
 */
export default function QuoteBig({ background, children, color }) {
  return (
    <section
      className={cn('quoteBig_section', background && 'quoteBig_band')}
      style={background ? { '--quote-bg': background, '--quote-color': color } : undefined}
    >
      <p className="quoteBig_quote">{children}</p>
    </section>
  )
}
