import { useCallback, useEffect, useRef, useState } from 'react'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'

import './Carousel.css'

/**
 * Horizontal card rail. Reference: wepresent.
 *
 * Cards keep their exact frame width and the rail scrolls when they do
 * not fit, rather than the cards shrinking. At 1440 the three-card rows
 * fill the 1120 column exactly and the rail sits still; narrower than
 * that it becomes scrollable and the controls appear.
 *
 * Controls only render when there is actually somewhere to scroll, and
 * native scroll still works — they are an affordance, not the mechanism.
 */
export default function Carousel({ children, label = 'cards' }) {
  const viewportRef = useRef(null)
  const [overflowing, setOverflowing] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const measure = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const scrollable = el.scrollWidth - el.clientWidth
    setOverflowing(scrollable > 1)
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft >= scrollable - 1)
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return undefined
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    for (const child of el.children) observer.observe(child)
    el.addEventListener('scroll', measure, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', measure)
    }
  }, [measure])

  function scrollByCard(direction) {
    const el = viewportRef.current
    if (!el) return
    // One card plus its gap, so a click always lands on a card edge.
    const first = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = first
      ? first.getBoundingClientRect().width + gap
      : el.clientWidth
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className="carousel_carousel">
      {overflowing && (
        <div className="carousel_controls">
          <button
            aria-label={`Previous ${label}`}
            className="carousel_control"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
            type="button"
          >
            <span className="carousel_flip">
              <ArrowCircle size={40} />
            </span>
          </button>
          <button
            aria-label={`Next ${label}`}
            className="carousel_control"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
            type="button"
          >
            <ArrowCircle size={40} />
          </button>
        </div>
      )}
      <div className="carousel_viewport" ref={viewportRef}>
        {children}
      </div>
    </div>
  )
}
