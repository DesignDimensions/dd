import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-footer-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-footer-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import styles from './ContactDesktop.module.css'

/** Figma 2715:11785 / 11787 / 11789 */
const FIELDS = ['Your name', 'Email address', 'Phone number']

/** Figma 2715:11794 – 11801 */
const INTERESTS = [
  { label: 'Identity design', variant: 'filled' },
  { label: 'Packaging design', variant: 'filled' },
  { label: 'Web design', variant: 'outline' },
  { label: 'Communication design', variant: 'outline' },
  { label: 'Social media', variant: 'outline' },
  { label: 'Brand film', variant: 'outline' },
  { label: 'Corporate gifting', variant: 'outline' },
  { label: 'Wedding cards', variant: 'outline' },
]

/** Figma 2715:11808 – 11813, placed on a 281x64 grid by absolute offset */
const FOOTER_LINKS = [
  { label: 'About us', left: 0, top: 0 },
  { label: 'Work diary', left: 82, top: 0 },
  { label: 'Design dialogue', left: 176, top: 0 },
  { label: 'Careers', left: 0, top: 44 },
  { label: 'Contact us', left: 82, top: 44 },
  { label: 'Privacy policy', left: 176, top: 44 },
]

/** Figma 2715:11778 */
export default function ContactDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.body}>
        <div className={styles.textStack}>
          <div className={styles.stack12}>
            <div className={styles.stack8}>
              <p className={styles.eyebrow}>Feel free to connect!</p>
              <div className={styles.headingRow}>
                <p className={styles.heading}>
                  This could be a start of a new relation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.columnHeadingRow}>
              <p className={styles.columnHeading}>Your Information</p>
            </div>
            <div className={styles.fields}>
              {FIELDS.map((field) => (
                <input
                  aria-label={field}
                  className={styles.field}
                  key={field}
                  placeholder={field}
                  type="text"
                />
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeadingRow}>
              <p className={styles.columnHeading}>Pick your interest</p>
            </div>
            <div className={styles.interests}>
              {INTERESTS.map((interest) => (
                <Tag key={interest.label} variant={interest.variant}>
                  {interest.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <Cta type="submit">Submit</Cta>
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerInner}>
          <img alt="" className={styles.dividerImage} src={divider} />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.logo}>
          <div className={styles.logoGroup1}>
            <img alt="" className={styles.logoImage} src={logoGroup1} />
          </div>
          <div className={styles.logoGroup2}>
            <img alt="" className={styles.logoImage} src={logoGroup2} />
          </div>
        </div>

        <div className={styles.spacer} />

        <div className={styles.footerLinks}>
          {FOOTER_LINKS.map((link) => (
            <div
              className={styles.footerLink}
              key={link.label}
              style={{ left: `${link.left}px`, top: `${link.top}px` }}
            >
              <p className={styles.footerLinkText}>{link.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
