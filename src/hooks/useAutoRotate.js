import { useCallback, useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Active index for a set of panels that advance on their own — the
 * Testimonials rotator.
 *
 * The timing itself lives in CSS: the active tab's progress bar runs a
 * fill animation and calls `next` from onAnimationEnd, so the bar and the
 * switch can never drift apart, and pausing is just animation-play-state.
 * This hook only decides when it runs.
 *
 * It keeps going under the pointer — by request, unlike the carousels —
 * but pauses while keyboard focus is inside the section (a mouse click's
 * focus doesn't count, or clicking a tab would stop the rotation for
 * good) and while the section is off screen. It never runs under
 * prefers-reduced-motion — the global reset
 * shortens every animation to 0.01ms there, which would otherwise spin
 * through the panels.
 */
export function useAutoRotate(count) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const [reducedMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        threshold: 0.35,
      },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const step = useCallback(
    (by) => setActive((i) => (i + by + count) % count),
    [count],
  )

  return {
    ref,
    active,
    select: setActive,
    next: useCallback(() => step(1), [step]),
    prev: useCallback(() => step(-1), [step]),
    autoplay: !reducedMotion && count > 1,
    paused: focused || !inView,
    rootProps: {
      onFocus: (event) => {
        if (event.target.matches(':focus-visible')) setFocused(true)
      },
      onBlur: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      },
    },
  }
}
