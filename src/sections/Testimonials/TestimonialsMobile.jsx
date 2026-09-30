import { useId, useRef } from 'react'
import { Link } from 'react-router-dom'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import { useAutoRotate } from '@/hooks/useAutoRotate'
import { cn } from '@/lib/cn'

import TestimonialProgress from './TestimonialProgress.jsx'
import { useContent } from '@/content/useContent'

import './TestimonialsMobile.css'

/** How far a swipe has to travel before it changes client, in px. */
const SWIPE_DISTANCE = 40

/**
 * Figma 2715:11049 "6", reworked into the same rotator as desktop: one
 * client-coloured card at a time, portrait above the quote, with the
 * segmented progress bar under it. Swiping the card steps it too.
 *
 * The quote is clamped to a few lines, as the frame truncates it; there
 * is still no "View More" button here — desktop has one (2714:8872).
 */
export default function TestimonialsMobile({ eyebrow, headingLines }) {
  const { testimonials } = useContent()
  const idPrefix = useId()
  const { ref, active, select, next, prev, autoplay, paused, rootProps } =
    useAutoRotate(testimonials.length)
  const touchStartX = useRef(null)

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return
    const dx = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx <= -SWIPE_DISTANCE) next()
    else if (dx >= SWIPE_DISTANCE) prev()
  }

  return (
    <section
      className="section_box testimonialsMobile_section"
      ref={ref}
      {...rootProps}
    >
      <div className="testimonialsMobile_title">
        <p className="testimonialsMobile_eyebrow">{eyebrow}</p>
        <div className="testimonialsMobile_headingWrap">
          {headingLines.map((line) => (
            <p className="testimonialsMobile_headingLine" key={line}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="testimonialsMobile_rotator">
        <div
          className="testimonialsMobile_stage"
          onTouchEnd={handleTouchEnd}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX
          }}
        >
          {testimonials.map((item, i) => {
            const isActive = i === active
            return (
              <article
                aria-labelledby={`${idPrefix}-tab-${i}`}
                className={cn(
                  'testimonialsMobile_card',
                  isActive && 'testimonialsMobile_cardActive',
                )}
                id={`${idPrefix}-panel-${i}`}
                inert={!isActive}
                key={item.slug}
                role="tabpanel"
                style={{ backgroundColor: item.background }}
              >
                <div className="testimonialsMobile_portrait">
                  <img
                    alt=""
                    className="testimonialsMobile_portraitImage"
                    src={item.portrait}
                  />
                </div>

                <div className="testimonialsMobile_words">
                  <p className="testimonialsMobile_commentTitle">
                    {item.title}
                  </p>
                  <blockquote className="testimonialsMobile_quote">
                    {item.quote}
                  </blockquote>
                </div>

                <div className="testimonialsMobile_footer">
                  <div className="testimonialsMobile_name">
                    <p className="testimonialsMobile_nameLine">{item.name}</p>
                    <p>{item.role}</p>
                  </div>
                  {item.path ? (
                    <Link
                      aria-label={`View the ${item.title} project`}
                      className="testimonialsMobile_project"
                      to={item.path}
                    >
                      <ArrowCircle size={32} />
                    </Link>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>

        <TestimonialProgress
          active={active}
          autoplay={autoplay}
          idPrefix={idPrefix}
          items={testimonials}
          onCycleEnd={next}
          onSelect={select}
          paused={paused}
          size="mobile"
        />
      </div>
    </section>
  )
}
