import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-footer-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-footer-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import { ENQUIRY_FIELDS, useEnquiryForm } from '@/hooks/useEnquiryForm'
import { cn } from '@/lib/cn'

import './ContactDesktop.css'

/**
 * Figma 2715:11794 – 11801. The frame draws the first two filled to show
 * the selected state; here they are toggles and none start selected.
 */
const INTERESTS = [
  'Identity design',
  'Packaging design',
  'Web design',
  'Communication design',
  'Social media',
  'Brand film',
  'Corporate gifting',
  'Wedding cards',
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
  const { handleSubmit, interests, submitLabel, toggleInterest } = useEnquiryForm()

  return (
    <section className={cn('contactDesktop_section', `contactDesktop_${variant}`)}>
      <form aria-label="Enquiry" className="contactDesktop_body" onSubmit={handleSubmit}>
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
              {ENQUIRY_FIELDS.map((field) => (
                <input
                  aria-label={field.label}
                  autoComplete={field.autoComplete}
                  className="contactDesktop_field"
                  key={field.name}
                  name={field.name}
                  placeholder={field.label}
                  type={field.type}
                />
              ))}
            </div>
          </div>

          <div className="contactDesktop_column">
            <div className="contactDesktop_columnHeadingRow">
              <p className="contactDesktop_columnHeading">Pick your interest</p>
            </div>
            <div aria-label="Pick your interest" className="contactDesktop_interests" role="group">
              {INTERESTS.map((interest) => (
                <Tag
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  selected={interests.includes(interest)}
                >
                  {interest}
                </Tag>
              ))}
              {interests.map((interest) => (
                <input key={interest} name="interests" type="hidden" value={interest} />
              ))}
            </div>
          </div>
        </div>

        <Cta type="submit">{submitLabel}</Cta>
      </form>

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
