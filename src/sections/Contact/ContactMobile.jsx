import logoGroup1 from '@/assets/mobile/logo-group-1.svg'
import logoGroup2 from '@/assets/mobile/logo-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'
import { FOOTER_LINKS } from '@/content/settings'

import { ENQUIRY_FIELDS, useEnquiryForm } from '@/hooks/useEnquiryForm'
import { FOOTER_GRID } from '@/lib/footerGrid'

import './ContactMobile.css'

/**
 * Figma 2715:11075 "Footer".
 *
 * Mobile stacks the interests above the form, where desktop puts them in
 * two columns side by side. Its words are CONTACT's `mobile` (content/
 * settings.js): seven interests to desktop's eight, and a heading with a
 * full stop. The frame (2715:11081) draws two interests filled to show
 * the selected state; here they are toggles and none start selected.
 * The footer links sit on the same 281-wide grid as desktop (2715:11108).
 */
export default function ContactMobile({
  eyebrow,
  fieldsLabel,
  heading,
  interests: options,
  interestsLabel,
}) {
  const { handleSubmit, interests, submitLabel, toggleInterest } =
    useEnquiryForm()

  return (
    <section className="contactMobile_section">
      <div className="contactMobile_heading">
        <p className="contactMobile_eyebrow">{eyebrow}</p>
        <p className="contactMobile_title">{heading}</p>
      </div>

      <form
        aria-label="Enquiry"
        className="contactMobile_enquiry"
        onSubmit={handleSubmit}
      >
        <div className="contactMobile_group">
          <p className="contactMobile_groupLabel">{interestsLabel}</p>
          <div
            aria-label="Pick your interest"
            className="contactMobile_tags"
            role="group"
          >
            {options.map((interest) => (
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
              <input
                key={interest}
                name="interests"
                type="hidden"
                value={interest}
              />
            ))}
          </div>
        </div>

        <div className="contactMobile_group">
          <p className="contactMobile_groupLabel">{fieldsLabel}</p>
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
        {FOOTER_LINKS.map((link, index) => (
          <p
            className="contactMobile_link"
            key={link.label}
            style={FOOTER_GRID[index]}
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
