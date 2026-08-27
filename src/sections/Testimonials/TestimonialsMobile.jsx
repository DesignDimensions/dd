import divider from '@/assets/mobile/divider.svg'
import portrait from '@/assets/images/testimonial-portrait.jpg'

import styles from './TestimonialsMobile.module.css'

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
    <div className={styles.card}>
      <div className={styles.portrait}>
        <div className={styles.portraitInner}>
          <img alt="" className={styles.portraitImage} src={portrait} />
        </div>
      </div>
      <div className={styles.comment}>
        <div className={styles.commentText}>
          <p className={styles.commentTitle}>{title}</p>
          <p className={styles.quote}>{QUOTE}</p>
        </div>
        <div className={styles.name}>
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsMobile() {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <p className={styles.eyebrow}>We believe</p>
        <div className={styles.headingWrap}>
          <p className={styles.headingLine}>{'Each one is a earned '}</p>
          <p className={styles.headingLine}>and treasured</p>
        </div>
      </div>

      <div className={styles.list}>
        <Testimonial {...TESTIMONIALS[0]} />
        <div className={styles.divider}>
          <div className={styles.dividerInner}>
            <img alt="" className={styles.dividerImage} src={divider} />
          </div>
        </div>
        <Testimonial {...TESTIMONIALS[1]} />
      </div>
    </section>
  )
}
