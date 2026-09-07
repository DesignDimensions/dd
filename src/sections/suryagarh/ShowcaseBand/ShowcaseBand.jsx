import { cn } from '@/lib/cn'

import { useZoomable } from '@/hooks/useZoomable'

import './ShowcaseBand.css'

/**
 * Figma 2955:12676 / 2955:12725 — a full-bleed photo band: edge to edge,
 * natural image height, tucked under the card above it, click to zoom.
 * Every single-photo section on the page is this same component with a
 * different `src`.
 *
 * `flush` drops the overlap, for a band that should sit on the normal
 * --section-gap instead of sliding under the card above it.
 */
export default function ShowcaseBand({ flush = false, src }) {
  const zoomRef = useZoomable(src)

  return (
    <section className={cn('showcaseBand_section', flush && 'showcaseBand_flush')}>
      <img alt="" className="showcaseBand_image" ref={zoomRef} src={src} />
    </section>
  )
}
