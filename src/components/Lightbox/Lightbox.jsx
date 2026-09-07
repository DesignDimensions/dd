import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { registerGravityZone } from '@/components/GravityCursor/gravityZoneRegistry'

import { subscribeLightbox } from './lightboxStore'
import './Lightbox.css'

/**
 * Fullscreen image viewer. Opening and closing are the same FLIP move in
 * reverse: the clicked thumbnail's own on-screen rect is the start (or
 * end) point, and the image tweens between that rect and a centred,
 * aspect-ratio-correct fullscreen size — never a plain fade, so the
 * image visibly travels from (or back to) where it actually lives on
 * the page.
 */

const VIEWPORT_MARGIN = 0.08 // fraction of viewport kept clear on each side

function fullscreenRect(naturalWidth, naturalHeight) {
  const maxWidth = window.innerWidth * (1 - VIEWPORT_MARGIN * 2)
  const maxHeight = window.innerHeight * (1 - VIEWPORT_MARGIN * 2)
  const ratio = naturalWidth && naturalHeight ? naturalWidth / naturalHeight : maxWidth / maxHeight
  let width = maxWidth
  let height = width / ratio
  if (height > maxHeight) {
    height = maxHeight
    width = height * ratio
  }
  return {
    width,
    height,
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
  }
}

export default function Lightbox() {
  const [entry, setEntry] = useState(null)
  const overlayRef = useRef(null)
  const backdropRef = useRef(null)
  const imageRef = useRef(null)
  const originRectRef = useRef(null)
  const closingRef = useRef(false)

  useEffect(() => {
    function handleOpen({ src, rect }) {
      originRectRef.current = rect
      closingRef.current = false
      setEntry({ src })
    }
    return subscribeLightbox(handleOpen)
  }, [])

  // Register the enlarged image as its own gravity zone ("Zoom Out"),
  // separate from the thumbnail's ("Zoom In") — two different elements,
  // hovered at two different times.
  useEffect(() => {
    if (!entry || !imageRef.current) return undefined
    return registerGravityZone(imageRef.current, () => 'Zoom Out')
  }, [entry])

  useEffect(() => {
    if (!entry) return

    const overlay = overlayRef.current
    const backdrop = backdropRef.current
    const image = imageRef.current
    const origin = originRectRef.current
    if (!overlay || !backdrop || !image || !origin) return

    overlay.style.display = 'block'
    gsap.set(image, {
      position: 'fixed',
      top: origin.top,
      left: origin.left,
      width: origin.width,
      height: origin.height,
    })
    gsap.set(backdrop, { opacity: 0 })

    function animateIn() {
      const target = fullscreenRect(image.naturalWidth, image.naturalHeight)
      gsap.to(backdrop, { opacity: 1, duration: 0.45, ease: 'power2.out' })
      gsap.to(image, {
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        duration: 0.65,
        ease: 'power3.out',
      })
    }

    if (image.complete && image.naturalWidth) {
      animateIn()
    } else {
      image.addEventListener('load', animateIn, { once: true })
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry])

  function close() {
    if (closingRef.current) return
    closingRef.current = true

    const backdrop = backdropRef.current
    const image = imageRef.current
    const origin = originRectRef.current
    const overlay = overlayRef.current

    gsap.to(backdrop, { opacity: 0, duration: 0.4, ease: 'power2.inOut' })
    gsap.to(image, {
      top: origin.top,
      left: origin.left,
      width: origin.width,
      height: origin.height,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        if (overlay) overlay.style.display = 'none'
        setEntry(null)
      },
    })
  }

  return createPortal(
    <div className="lightbox_overlay" ref={overlayRef} style={{ display: entry ? 'block' : 'none' }}>
      <div className="lightbox_backdrop" onClick={close} ref={backdropRef} />
      {entry ? (
        <img alt="" className="lightbox_image" onClick={close} ref={imageRef} src={entry.src} />
      ) : null}
    </div>,
    document.body,
  )
}
