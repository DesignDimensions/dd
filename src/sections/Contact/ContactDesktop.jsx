import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-footer-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-footer-group-2.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'
import { useContent } from '@/content/useContent'

import { ENQUIRY_FIELDS, useEnquiryForm } from '@/hooks/useEnquiryForm'
import { FOOTER_GRID } from '@/lib/footerGrid'

import './ContactDesktop.css'

/**
 * Figma 2715:11778. Words from CONTACT (content/settings.js). The frame
 * draws the first two interests filled to show the selected state
 * (2715:11794 – 11801); here they are toggles and none start selected.
 * The footer links (2715:11808 – 11813) sit on a 281x64 grid by
 * absolute offset (lib/footerGrid.js).
 */
export default function ContactDesktop({
  eyebrow,
  fieldsLabel,
  heading,
  interests: options,
  interestsLabel,
}) {
  const { settings } = useContent()
  const { handleSubmit, interests, submitLabel, toggleInterest } =
    useEnquiryForm()

  return (
    <section className="contactDesktop_section">
      <form
        aria-label="Enquiry"
        className="contactDesktop_body"
        onSubmit={handleSubmit}
      >
        <div className="contactDesktop_textStack">
          <div className="contactDesktop_stack12">
            <div className="contactDesktop_stack8">
              <p className="text_eyebrow contactDesktop_eyebrow">{eyebrow}</p>
              <div className="contactDesktop_headingRow">
                <p className="contactDesktop_heading">{heading}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contactDesktop_columns">
          <div className="contactDesktop_column">
            <div className="contactDesktop_columnHeadingRow">
              <p className="contactDesktop_columnHeading">{fieldsLabel}</p>
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
              <p className="contactDesktop_columnHeading">{interestsLabel}</p>
            </div>
            <div
              aria-label="Pick your interest"
              className="contactDesktop_interests"
              role="group"
            >
              {options.map((interest) => (
                <Tag
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  selected={interests.includes(interest)}
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
          {settings.footerLinks.map((link, index) => (
            <div
              className="contactDesktop_footerLink"
              key={link.label}
              style={FOOTER_GRID[index]}
            >
              <p className="contactDesktop_footerLinkText">{link.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
