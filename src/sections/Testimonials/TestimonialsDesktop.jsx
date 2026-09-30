import { useId } from 'react'
import { Link } from 'react-router-dom'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import Cta from '@/components/ui/Cta/Cta.jsx'
import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'
import { useAutoRotate } from '@/hooks/useAutoRotate'
import { cn } from '@/lib/cn'

import TestimonialProgress from './TestimonialProgress.jsx'
import { TESTIMONIALS } from '@/content/testimonials'

import './TestimonialsDesktop.css'

/**
 * Figma 2714:8859, reworked into a rotator.
 *
 * One testimonial at a time, in a card framed in that client's project
 * colour — the has-frame recipe the Work diary and Design Dialogue cards
 * use — with the quote in the serif display style Snack Factory opens
 * the page with. The segmented bar underneath advances it on a timer (see
 * useAutoRotate); the arrows in the head and the arrow keys step it by
 * hand.
 *
 * Every card is rendered, stacked in one grid cell, and the active one
 * fades up over the rest, so the section keeps the tallest card's height
 * and nothing below it jumps as the quotes change.
 */
export default function TestimonialsDesktop({ cta, eyebrow, heading }) {
  const idPrefix = useId()
  const { ref, active, select, next, prev, autoplay, paused, rootProps } =
    useAutoRotate(TESTIMONIALS.length)

  return (
    <section
      className="section_box section_clip testimonialsDesktop_section"
      ref={ref}
      {...rootProps}
    >
      <div className="testimonialsDesktop_head">
        <div className="testimonialsDesktop_headText">
          <p className="text_eyebrow testimonialsDesktop_eyebrow">{eyebrow}</p>
          <p className="text_heading testimonialsDesktop_heading">{heading}</p>
        </div>

        <div className="testimonialsDesktop_controls">
          <p className="testimonialsDesktop_counter" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}
            <span className="testimonialsDesktop_counterTotal">
              {' / '}
              {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </p>
          <button
            aria-label="Previous testimonial"
            className="testimonialsDesktop_control"
            onClick={prev}
            type="button"
          >
            <span className="testimonialsDesktop_flip">
              <ArrowCircle size={40} />
            </span>
          </button>
          <button
            aria-label="Next testimonial"
            className="testimonialsDesktop_control"
            onClick={next}
            type="button"
          >
            <ArrowCircle size={40} />
          </button>
        </div>
      </div>

      <div className="testimonialsDesktop_rotator">
        <div className="testimonialsDesktop_stage">
          {TESTIMONIALS.map((item, i) => {
            const isActive = i === active
            return (
              <article
                aria-labelledby={`${idPrefix}-tab-${i}`}
                className={cn(
                  'testimonialsDesktop_card',
                  isActive && 'testimonialsDesktop_cardActive',
                )}
                id={`${idPrefix}-panel-${i}`}
                inert={!isActive}
                key={item.slug}
                role="tabpanel"
                style={{ backgroundColor: item.background }}
              >
                <div className="testimonialsDesktop_portrait">
                  <img
                    alt=""
                    className="testimonialsDesktop_portraitImage"
                    src={item.portrait}
                  />
                </div>

                <div className="testimonialsDesktop_body">
                  <div className="testimonialsDesktop_words">
                    <p className="testimonialsDesktop_title">{item.title}</p>
                    <blockquote className="testimonialsDesktop_quote">
                      {item.quote}
                    </blockquote>
                  </div>

                  <div className="testimonialsDesktop_footer">
                    <div className="testimonialsDesktop_attribution">
                      <p className="testimonialsDesktop_name">{item.name}</p>
                      <p className="testimonialsDesktop_role">{item.role}</p>
                    </div>
                    {item.path ? (
                      <Link
                        aria-label={`View the ${item.title} project`}
                        className="testimonialsDesktop_project"
                        to={item.path}
                      >
                        <MergeButton label={item.category ?? 'View project'} />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <TestimonialProgress
          active={active}
          autoplay={autoplay}
          idPrefix={idPrefix}
          items={TESTIMONIALS}
          onCycleEnd={next}
          onSelect={select}
          paused={paused}
        />
      </div>

      <Cta>{cta}</Cta>
    </section>
  )
}
