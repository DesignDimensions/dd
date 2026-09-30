import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import './FeaturedStoryDesktop.css'

gsap.registerPlugin(ScrollTrigger)

/** Scroll travel for each papad across the band's pass through the
    viewport: from its state as the band enters at the bottom to its
    state as it leaves at the top. They move against each other. */
const PARALLAX = {
  top: { from: { y: 160, rotation: -8 }, to: { y: -200, rotation: 7 } },
  bottom: { from: { y: -140, rotation: 8 }, to: { y: 220, rotation: -7 } },
}

/**
 * Figma 2714:8800
 *
 * Two rotated papad images are pinned outside the band and clipped by it,
 * one bleeding off the top-right and one off the bottom-left.
 *
 * Each papad is three layers deep, each owning one transform: the outer
 * box floats on a CSS loop, the middle one is driven by scroll, and the
 * inner one holds the papad's Figma rotation. Scrolling slides the two
 * papads in opposite directions and turns them, scrubbed so they trail
 * the scroll slightly rather than snapping to it. Reduced motion gets
 * neither.
 */
export default function FeaturedStoryDesktop({
  eyebrow,
  heading,
  image,
  quote,
}) {
  const sectionRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      for (const [el, { from, to }] of [
        [topRef.current, PARALLAX.top],
        [bottomRef.current, PARALLAX.bottom],
      ]) {
        gsap.fromTo(el, from, {
          ...to,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }

      // Images and fonts further up the page settle after this mounts
      // and push the band down; re-measure whenever the page resizes.
      let frame = 0
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => ScrollTrigger.refresh())
      })
      observer.observe(document.body)
      return () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="featuredStoryDesktop_section" ref={sectionRef}>
      <div className="featuredStoryDesktop_papadTop">
        <div className="featuredStoryDesktop_papadScroll" ref={topRef}>
          <div className="featuredStoryDesktop_papadTopRotate">
            <div className="featuredStoryDesktop_papadFrame">
              <img
                alt=""
                className="featuredStoryDesktop_papadImage"
                src={image}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="featuredStoryDesktop_papadBottom">
        <div className="featuredStoryDesktop_papadScroll" ref={bottomRef}>
          <div className="featuredStoryDesktop_papadBottomRotate">
            <div className="featuredStoryDesktop_papadFrame">
              <img
                alt=""
                className="featuredStoryDesktop_papadImage"
                src={image}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="featuredStoryDesktop_content">
        <div className="featuredStoryDesktop_textStack">
          <div className="featuredStoryDesktop_stack24">
            <div className="featuredStoryDesktop_stack16">
              <p className="text_eyebrow featuredStoryDesktop_eyebrow">
                {eyebrow}
              </p>
              <div className="featuredStoryDesktop_headingRow">
                <p className="featuredStoryDesktop_heading">{heading}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="featuredStoryDesktop_quote">{quote}</p>
      </div>
    </section>
  )
}
