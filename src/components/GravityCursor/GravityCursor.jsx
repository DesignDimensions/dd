import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { hoveredZone } from './gravityZoneRegistry'
import './GravityCursor.css'

/**
 * A pill that rides alongside the cursor over a "gravity zone" — the
 * testimonials rail's pointer tag from beyondbeyondV4, ported as-is
 * (assets/testimonials.js, `initCursor`). It eases toward the pointer
 * rather than snapping to it (the "gravity" in the name), tilts with the
 * direction of travel, and flips open/closed in 3D as zones are entered
 * and left. Text changes (e.g. "Play Audio" → "Pause Audio") slide
 * through a mask instead of swapping instantly.
 *
 * One instance is mounted once, near the app root — `useGravityZone`
 * registers any element as something the tag should track and label.
 */

const CURSOR_OFFSET_X = 22
const TILT_MAX = 28
const TILT_FACTOR = 0.85
const TILT_VERTICAL_BOOST = 1.6
const TILT_SMOOTHING = 0.35
// A hover box is often tall but not much wider than the eye naturally
// wanders while reading it, so an arcing path clips the edge for a frame
// or two. Closing on the spot reads as the tag breaking; holding it open
// for a beat and only closing if the pointer really has left lets it
// keep gliding with the cursor through that instead.
const CLOSE_DELAY = 180

let mouseX = -Infinity
let mouseY = -Infinity
let hasMouse = false

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return
    mouseX = event.clientX
    mouseY = event.clientY
    hasMouse = true
  })
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function GravityCursor() {
  const tagRef = useRef(null)
  const flipRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reducedMotion()) return undefined

    const tag = tagRef.current
    const flip = flipRef.current
    const label = textRef.current
    if (!tag || !flip || !label) return undefined

    tag.classList.add('gravityCursor_enabled')

    gsap.set(tag, { xPercent: 0, yPercent: -50 })
    gsap.set(flip, {
      transformOrigin: 'center center',
      transformPerspective: 200,
      rotationX: -100,
      opacity: 0,
    })

    const moveX = gsap.quickTo(tag, 'x', { duration: 0.55, ease: 'power3' })
    const moveY = gsap.quickTo(tag, 'y', { duration: 0.55, ease: 'power3' })
    const setTilt = gsap.quickTo(flip, 'rotation', { duration: 0.3, ease: 'power2' })

    let isOpen = false
    let isFlipping = false
    let current = null
    let prevX = 0
    let prevY = 0
    // Eased rather than the raw per-frame delta: a short, slow movement's
    // real signal is only a pixel or two, so on its own it is mostly the
    // noise of pointer coalescing landing unevenly across frames. Chasing
    // the raw value tilts in jerks; easing it lets a real stop decay out
    // instead of snapping flat.
    let tiltDeltaX = 0
    let tiltDeltaY = 0
    let closeTimer = null
    let currentLabel = ''

    function setLabel(text) {
      if (!text || currentLabel === text) return
      currentLabel = text

      // The mask clips while the old word leaves upward and the new one
      // rises into its place.
      gsap
        .timeline()
        .to(label, { yPercent: -120, duration: 0.3, ease: 'power3.in' })
        .call(() => {
          label.textContent = text
        })
        .set(label, { yPercent: 120 })
        .to(label, { yPercent: 0, duration: 0.5, ease: 'power4.out' })
    }

    function open() {
      if (isOpen) return
      isOpen = true
      isFlipping = true
      gsap.killTweensOf(flip, 'rotationX,opacity')
      gsap.set(flip, { rotation: 0 })
      gsap.to(flip, {
        rotationX: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.15)',
        onComplete: () => {
          isFlipping = false
        },
      })
    }

    function close() {
      if (!isOpen) return
      isOpen = false
      isFlipping = true
      gsap.killTweensOf(flip, 'rotationX,opacity')
      gsap.set(flip, { rotation: 0 })
      gsap.to(flip, {
        rotationX: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          isFlipping = false
        },
      })
    }

    function tick() {
      if (!hasMouse) return

      const zone = hoveredZone()

      if (zone) {
        if (closeTimer) {
          clearTimeout(closeTimer)
          closeTimer = null
        }

        if (zone !== current) {
          // Entering a different zone: place the tag before showing it,
          // or it would fly in from wherever it was last left.
          if (!current) gsap.set(tag, { x: mouseX + CURSOR_OFFSET_X, y: mouseY })
          current = zone
          prevX = mouseX
          prevY = mouseY
          open()
        }

        setLabel(zone.getLabel())
      } else if (current && !closeTimer) {
        closeTimer = setTimeout(() => {
          closeTimer = null
          current = null
          close()
        }, CLOSE_DELAY)
      }

      if (!current) return

      moveX(mouseX + CURSOR_OFFSET_X)
      moveY(mouseY)

      if (!isFlipping) {
        const deltaX = mouseX - prevX
        const deltaY = mouseY - prevY
        tiltDeltaX += (deltaX - tiltDeltaX) * TILT_SMOOTHING
        tiltDeltaY += (deltaY - tiltDeltaY) * TILT_SMOOTHING
        const raw = -tiltDeltaX + tiltDeltaY * TILT_VERTICAL_BOOST
        setTilt(gsap.utils.clamp(-TILT_MAX, TILT_MAX, raw * TILT_FACTOR))
      }

      prevX = mouseX
      prevY = mouseY
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      if (closeTimer) clearTimeout(closeTimer)
    }
  }, [])

  return createPortal(
    <span aria-hidden="true" className="gravityCursor_tag" ref={tagRef}>
      <span className="gravityCursor_flip" ref={flipRef}>
        <span className="gravityCursor_mask">
          <span className="gravityCursor_text" ref={textRef} />
        </span>
      </span>
    </span>,
    document.body,
  )
}
