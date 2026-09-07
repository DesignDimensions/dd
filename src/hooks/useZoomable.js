import { useEffect } from 'react'

import { openLightbox } from '@/components/Lightbox/lightboxStore'
import { useGravityZone } from '@/hooks/useGravityZone'

/**
 * Wires an <img> up to the fullscreen lightbox: hovering shows the
 * "Zoom In" gravity tag, clicking opens it with a FLIP transition from
 * the image's own on-screen rect.
 *
 * Returns a ref — attach it to the `<img>` itself (the element the ref
 * points to is exactly what the lightbox flies out from and back into,
 * so it has to be the visible image, not a wrapping div).
 */
export function useZoomable(src) {
  const ref = useGravityZone('Zoom In')

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    function handleClick(event) {
      event.stopPropagation()
      openLightbox(el, src)
    }

    el.addEventListener('click', handleClick)
    return () => el.removeEventListener('click', handleClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return ref
}
