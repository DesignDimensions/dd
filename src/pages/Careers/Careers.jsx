import { useState } from 'react'
import { Link } from 'react-router-dom'

import building from '@/assets/forms/building.jpg'
import Field, { FileField } from '@/components/ui/Field/Field.jsx'
import FormHero from '@/sections/FormHero/FormHero.jsx'
import FormSection from '@/sections/FormSection/FormSection.jsx'
import SiteFooter from '@/sections/SiteFooter/SiteFooter.jsx'

import './Careers.css'

/**
 * Figma 2719:21185 — "DD/Careers/Desktop", desktop only. The same template
 * as Contact us.
 *
 * "Add More +" adds another portfolio link field, which is what the
 * frame's control implies. The message box's label and placeholder are
 * Figma's placeholders ("Lorem Ipsum", and Contact's example text); kept
 * verbatim.
 */
export default function Careers() {
  const [portfolioLinks, setPortfolioLinks] = useState(1)

  return (
    <div className="careers_page">
      <FormHero
        backdrop="building"
        eyebrow="Careers"
        image={building}
        lines={['Embark on a new', 'journey']}
      />

      <FormSection
        after={
          <Link className="formSection_link" to="/about">
            Learn more about us
          </Link>
        }
        heading="Join our team"
        label="Job application"
      >
        <Field label="Name" name="name" placeholder="Enter your full name" />
        <Field label="Email Address" name="email" placeholder="Enter your email address" type="email" />
        <Field label="Phone Number" name="phone" placeholder="Enter you phone number" type="tel" />

        {/* Figma 2719:21232 */}
        <div className="careers_portfolio">
          {Array.from({ length: portfolioLinks }, (_, index) => (
            <Field
              ariaLabel={`Portfolio link ${index + 1}`}
              key={index}
              label={index === 0 ? 'Your Portfolio/Work Samples(Optional)' : undefined}
              name="portfolio"
              placeholder="Type the link"
              type="url"
            />
          ))}
          <button
            className="careers_addMore"
            onClick={() => setPortfolioLinks((count) => count + 1)}
            type="button"
          >
            Add More +
          </button>
        </div>

        <Field label="Website link" name="website" placeholder="Type the link" type="url" />
        <FileField label="Attach Resume" name="resume" />
        <Field
          label="Lorem Ipsum"
          multiline
          name="message"
          placeholder="E.g. We’d like to rebrand and improve our website"
        />
      </FormSection>

      <SiteFooter />
    </div>
  )
}
