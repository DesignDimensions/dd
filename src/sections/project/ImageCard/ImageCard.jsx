import { useZoomable } from '@/hooks/useZoomable'

import './ImageCard.css'

/**
 * An image section of a project frame — a photo grid, mockups or artwork —
 * rendered whole from Figma and cropped to its content column, in a white
 * card like the text blocks around it. Click to zoom.
 *
 * `width` and `height` are the image's own pixel size, so the card holds
 * its height before the image loads.
 */
export default function ImageCard({ height, src, width }) {
  const zoomRef = useZoomable(src)

  return (
    <section className="imageCard_section">
      <img alt="" className="imageCard_image" height={height} ref={zoomRef} src={src} width={width} />
    </section>
  )
}
