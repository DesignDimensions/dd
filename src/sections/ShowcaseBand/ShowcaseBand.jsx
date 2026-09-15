import { cn } from '@/lib/cn'

import { useZoomable } from '@/hooks/useZoomable'

import './ShowcaseBand.css'

/**
 * Figma 2955:12676 / 2955:12725 (Suryagarh) / 2719:16491 (Design dialogue
 * article) — a full-bleed photo band: edge to edge, tucked under the card
 * above it, click to zoom. Every single-photo band is this same component
 * with a different `src`.
 *
 * `flush` drops the overlap, for a band that should sit on the normal
 * --section-gap instead of sliding under the card above it.
 *
 * `height` fixes the band's height and crops the image to cover it, where
 * a frame draws a fixed band rather than the image's natural height.
 */
export default function ShowcaseBand({ flush = false, height, src }) {
  const zoomRef = useZoomable(src)

  return (
    <section
      className={cn(
        'showcaseBand_section',
        flush && 'showcaseBand_flush',
        height && 'showcaseBand_fixed',
      )}
      style={height ? { height } : undefined}
    >
      <img alt="" className="showcaseBand_image" ref={zoomRef} src={src} />
    </section>
  )
}
