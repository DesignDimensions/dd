import logoGroup1 from '@/assets/mobile/logo-group-1.svg'
import logoGroup2 from '@/assets/mobile/logo-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import { ENQUIRY_FIELDS, useEnquiryForm } from '@/hooks/useEnquiryForm'
import { cn } from '@/lib/cn'

import './ContactMobile.css'

/**
 * Figma 2715:11081 — seven tags, where desktop's interest list has eight.
 * The frame draws two filled to show the selected state; here they are
 * toggles and none start selected.
 */
const INTERESTS = [
  'Packaging design',
  'Identity design',
  'Web design',
  'Installation design',
  'Communication design',
  'Social Media',
  'Brand Films',
]

/** Figma 2715:11108 — same 281-wide absolute grid as desktop */
const FOOTER_LINKS = [
  { label: 'About us', left: 0, top: 0 },
  { label: 'Work diary', left: 82, top: 0 },
  { label: 'Design dialogue', left: 176, top: 0 },
  { label: 'Careers', left: 0, top: 44 },
  { label: 'Contact us', left: 82, top: 44 },
  { label: 'Privacy policy', left: 176, top: 44 },
]

/**
 * Figma 2715:11075 "Footer".
 *
 * Mobile stacks the interests above the form, where desktop puts them in
 * two columns side by side, and the heading gains a full stop.
 */
export default function ContactMobile({ variant = 'transparent' }) {
  const { handleSubmit, interests, submitLabel, toggleInterest } = useEnquiryForm()

  return (
    <section className={cn('contactMobile_section', `contactMobile_${variant}`)}>
      <div className="contactMobile_heading">
        <p className="contactMobile_eyebrow">Feel free to connect!</p>
        <p className="contactMobile_title">This could be a start of a new relation.</p>
      </div>

      <form aria-label="Enquiry" className="contactMobile_enquiry" onSubmit={handleSubmit}>
        <div className="contactMobile_group">
          <p className="contactMobile_groupLabel">Pick Your Interest</p>
          <div aria-label="Pick your interest" className="contactMobile_tags" role="group">
            {INTERESTS.map((interest) => (
              <Tag
                key={interest}
                onClick={() => toggleInterest(interest)}
                selected={interests.includes(interest)}
                size="mobile"
              >
                {interest}
              </Tag>
            ))}
            {interests.map((interest) => (
              <input key={interest} name="interests" type="hidden" value={interest} />
            ))}
          </div>
        </div>

        <div className="contactMobile_group">
          <p className="contactMobile_groupLabel">Your Information</p>
          <div className="contactMobile_form">
            <div className="contactMobile_fields">
              {ENQUIRY_FIELDS.map((field) => (
                <input
                  aria-label={field.label}
                  autoComplete={field.autoComplete}
                  className="contactMobile_field"
                  key={field.name}
                  name={field.name}
                  placeholder={field.label}
                  type={field.type}
                />
              ))}
            </div>
            <Cta size="mobile" type="submit">
              {submitLabel}
            </Cta>
          </div>
        </div>
      </form>

      {/* Figma 2715:11107 — a solid 1px rule, not the vector desktop uses */}
      <div className="contactMobile_divider" />

      <div className="contactMobile_links">
        {FOOTER_LINKS.map((link) => (
          <p
            className="contactMobile_link"
            key={link.label}
            style={{ left: `${link.left}px`, top: `${link.top}px` }}
          >
            {link.label}
          </p>
        ))}
      </div>

      <div className="contactMobile_logo">
        <div className="contactMobile_logoGroup1">
          <img alt="" className="contactMobile_logoImage" src={logoGroup1} />
        </div>
        <div className="contactMobile_logoGroup2">
          <img alt="" className="contactMobile_logoImage" src={logoGroup2} />
        </div>
      </div>
    </section>
  )
}
