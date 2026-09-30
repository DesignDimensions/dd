import { useZoomable } from '@/hooks/useZoomable'

/** An image that opens in the lightbox on click (useZoomable). */
export default function ZoomImage({ alt = '', className, src }) {
  const ref = useZoomable(src)
  return <img alt={alt} className={className} ref={ref} src={src} />
}
