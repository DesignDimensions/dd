import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-footer-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-footer-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import { cn } from '@/lib/cn'

import './ContactDesktop.css'

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
export default function ContactDesktop({ variant = 'transparent' }) {
  return (
    <section className={cn('contactDesktop_section', `contactDesktop_${variant}`)}>
      <div className="contactDesktop_body">
        <div className="contactDesktop_textStack">
          <div className="contactDesktop_stack12">
            <div className="contactDesktop_stack8">
              <p className="contactDesktop_eyebrow">Feel free to connect!</p>
              <div className="contactDesktop_headingRow">
                <p className="contactDesktop_heading">
                  This could be a start of a new relation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contactDesktop_columns">
          <div className="contactDesktop_column">
            <div className="contactDesktop_columnHeadingRow">
              <p className="contactDesktop_columnHeading">Your Information</p>
            </div>
            <div className="contactDesktop_fields">
              {FIELDS.map((field) => (
                <input
                  aria-label={field}
                  className="contactDesktop_field"
                  key={field}
                  placeholder={field}
                  type="text"
                />
              ))}
            </div>
          </div>

          <div className="contactDesktop_column">
            <div className="contactDesktop_columnHeadingRow">
              <p className="contactDesktop_columnHeading">Pick your interest</p>
            </div>
            <div className="contactDesktop_interests">
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

      <div className="contactDesktop_divider">
        <div className="contactDesktop_dividerInner">
          <img alt="" className="contactDesktop_dividerImage" src={divider} />
        </div>
      </div>

      <div className="contactDesktop_footer">
        <div className="contactDesktop_logo">
          <div className="contactDesktop_logoGroup1">
            <img alt="" className="contactDesktop_logoImage" src={logoGroup1} />
          </div>
          <div className="contactDesktop_logoGroup2">
            <img alt="" className="contactDesktop_logoImage" src={logoGroup2} />
          </div>
        </div>

        <div className="contactDesktop_spacer" />

        <div className="contactDesktop_footerLinks">
          {FOOTER_LINKS.map((link) => (
            <div
              className="contactDesktop_footerLink"
              key={link.label}
              style={{ left: `${link.left}px`, top: `${link.top}px` }}
            >
              <p className="contactDesktop_footerLinkText">{link.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
