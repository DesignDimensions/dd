import divider from '@/assets/mobile/divider.svg'
import portrait from '@/assets/images/testimonial-portrait.jpg'

import './TestimonialsMobile.css'

const QUOTE =
  '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ...'

/**
 * Figma 2715:11049 "6".
 *
 * Portrait sits above the quote here rather than beside it, the quote is
 * truncated in the frame, and there is no "View More" button — desktop
 * has one (2714:8872).
 */
const TESTIMONIALS = [
  { title: '15 AD', name: 'Mr. XYZ', role: 'Founder, 15 AD' },
  { title: 'Nature’s Miracle', name: 'Mr. XYZ', role: 'Co-Founder, NM' },
]

function Testimonial({ title, name, role }) {
  return (
    <div className="testimonialsMobile_card">
      <div className="testimonialsMobile_portrait">
        <div className="testimonialsMobile_portraitInner">
          <img alt="" className="testimonialsMobile_portraitImage" src={portrait} />
        </div>
      </div>
      <div className="testimonialsMobile_comment">
        <div className="testimonialsMobile_commentText">
          <p className="testimonialsMobile_commentTitle">{title}</p>
          <p className="testimonialsMobile_quote">{QUOTE}</p>
        </div>
        <div className="testimonialsMobile_name">
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsMobile() {
  return (
    <section className="testimonialsMobile_section">
      <div className="testimonialsMobile_title">
        <p className="testimonialsMobile_eyebrow">We believe</p>
        <div className="testimonialsMobile_headingWrap">
          <p className="testimonialsMobile_headingLine">{'Each one is a earned '}</p>
          <p className="testimonialsMobile_headingLine">and treasured</p>
        </div>
      </div>

      <div className="testimonialsMobile_list">
        <Testimonial {...TESTIMONIALS[0]} />
        <div className="testimonialsMobile_divider">
          <div className="testimonialsMobile_dividerInner">
            <img alt="" className="testimonialsMobile_dividerImage" src={divider} />
          </div>
        </div>
        <Testimonial {...TESTIMONIALS[1]} />
      </div>
    </section>
  )
}
