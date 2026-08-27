import divider from '@/assets/icons/divider.svg'
import portrait from '@/assets/images/testimonial-portrait.jpg'
import Cta from '@/components/ui/Cta/Cta.jsx'

import styles from './TestimonialsDesktop.module.css'

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
    <div className={styles.testimonial}>
      <div className={styles.portrait}>
        <div className={styles.portraitInner}>
          <img alt="" className={styles.portraitImage} src={portrait} />
        </div>
      </div>
      <div className={styles.quoteWrap}>
        <div className={styles.textStack}>
          <div className={styles.stack12}>
            <div className={styles.stack8}>
              <div className={styles.headingRow}>
                <p className={styles.title}>{title}</p>
              </div>
              <p className={styles.quote}>{QUOTE}</p>
            </div>
            <div className={styles.attribution}>
              <p className={styles.attributionLine}>{name}</p>
              <p className={styles.attributionLine}>{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.headStack}>
        <div className={styles.stack24}>
          <div className={styles.stack16}>
            <p className={styles.eyebrow}>We believe</p>
            <div className={styles.headHeadingRow}>
              <p className={styles.heading}>
                Each one is a earned and treasured
              </p>
            </div>
          </div>
        </div>
      </div>

      <Testimonial {...TESTIMONIALS[0]} />

      <div className={styles.divider}>
        <div className={styles.dividerInner}>
          <img alt="" className={styles.dividerImage} src={divider} />
        </div>
      </div>

      <Testimonial {...TESTIMONIALS[1]} />

      <Cta>View More</Cta>
    </section>
  )
}
