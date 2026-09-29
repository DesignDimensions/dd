import { useRef } from 'react'

import { cn } from '@/lib/cn'

import './TestimonialProgress.css'

/**
 * The segmented bar under the Testimonials card, one segment per client,
 * stories-style: clients already shown sit filled, the current one fills
 * over the rotation interval and hands on to the next when it finishes
 * (see useAutoRotate), the rest wait empty. Unlike a row of names it
 * holds ten-plus clients on a phone as easily as on desktop.
 *
 * Each segment is a tab. Hovering one (where there's a pointer) thickens
 * it and names the client under it; clicking jumps there. Arrow keys
 * move between them, and only the active one sits in the tab order.
 */
export default function TestimonialProgress({
  active,
  autoplay,
  idPrefix,
  items,
  onCycleEnd,
  onSelect,
  paused,
  size = 'desktop',
}) {
  const listRef = useRef(null)

  function handleKeyDown(event) {
    const by = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!by) return
    event.preventDefault()
    const index = (active + by + items.length) % items.length
    onSelect(index)
    listRef.current?.children[index]?.focus()
  }

  return (
    <div
      aria-label="Clients"
      className={cn('testimonialProgress_list', `testimonialProgress_${size}`)}
      onKeyDown={handleKeyDown}
      ref={listRef}
      role="tablist"
    >
      {items.map((item, i) => {
        const isActive = i === active
        return (
          <button
            aria-controls={`${idPrefix}-panel-${i}`}
            aria-label={item.title}
            aria-selected={isActive}
            className="testimonialProgress_segment"
            id={`${idPrefix}-tab-${i}`}
            key={item.slug}
            onClick={() => onSelect(i)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            <span className="testimonialProgress_track">
              {i < active ? (
                <span className="testimonialProgress_fill" />
              ) : null}
              {isActive ? (
                <span
                  className={cn(
                    'testimonialProgress_fill',
                    autoplay && 'testimonialProgress_running',
                  )}
                  onAnimationEnd={onCycleEnd}
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                />
              ) : null}
            </span>
            <span aria-hidden="true" className="testimonialProgress_label">
              {item.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
