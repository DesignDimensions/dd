import divider from '@/assets/icons/divider.svg'
import portrait from '@/assets/images/testimonial-portrait.jpg'
import Cta from '@/components/ui/Cta/Cta.jsx'

import './TestimonialsDesktop.css'

const QUOTE =
  '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum”'

const TESTIMONIALS = [
  { title: '15 AD', name: 'Mr. XYZ', role: 'Founder, 15 AD' },
  {
    title: 'Nature’s Miracle',
    name: 'Mr. XYZ',
    role: 'Co-Founder, Nature’s Miracle',
  },
]

/** Figma 2714:8859 */
function Testimonial({ title, name, role }) {
  return (
    <div className="testimonialsDesktop_testimonial">
      <div className="testimonialsDesktop_portrait">
        <div className="testimonialsDesktop_portraitInner">
          <img alt="" className="testimonialsDesktop_portraitImage" src={portrait} />
        </div>
      </div>
      <div className="testimonialsDesktop_quoteWrap">
        <div className="testimonialsDesktop_textStack">
          <div className="testimonialsDesktop_stack12">
            <div className="testimonialsDesktop_stack8">
              <div className="testimonialsDesktop_headingRow">
                <p className="testimonialsDesktop_title">{title}</p>
              </div>
              <p className="testimonialsDesktop_quote">{QUOTE}</p>
            </div>
            <div className="testimonialsDesktop_attribution">
              <p className="testimonialsDesktop_attributionLine">{name}</p>
              <p className="testimonialsDesktop_attributionLine">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsDesktop() {
  return (
    <section className="testimonialsDesktop_section">
      <div className="testimonialsDesktop_headStack">
        <div className="testimonialsDesktop_stack24">
          <div className="testimonialsDesktop_stack16">
            <p className="testimonialsDesktop_eyebrow">We believe</p>
            <div className="testimonialsDesktop_headHeadingRow">
              <p className="testimonialsDesktop_heading">
                Each one is a earned and treasured
              </p>
            </div>
          </div>
        </div>
      </div>

      <Testimonial {...TESTIMONIALS[0]} />

      <div className="testimonialsDesktop_divider">
        <div className="testimonialsDesktop_dividerInner">
          <img alt="" className="testimonialsDesktop_dividerImage" src={divider} />
        </div>
      </div>

      <Testimonial {...TESTIMONIALS[1]} />

      <Cta>View More</Cta>
    </section>
  )
}
