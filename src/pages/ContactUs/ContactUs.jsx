import ocean from '@/assets/forms/ocean.jpg'
import Field from '@/components/ui/Field/Field.jsx'
import FormHero from '@/sections/FormHero/FormHero.jsx'
import FormSection from '@/sections/FormSection/FormSection.jsx'
import SiteFooter from '@/sections/SiteFooter/SiteFooter.jsx'

import './ContactUs.css'

/**
 * Figma 2719:20388 — "DD/Contact Us/Desktop", desktop only.
 *
 * A flush hero, the form as a white card on the page ground, then the
 * footer band. Placeholders are verbatim, "Enter you phone number"
 * included.
 */
export default function ContactUs() {
  return (
    <div className="contactUs_page">
      <FormHero
        backdrop="ocean"
        eyebrow="Get in touch"
        image={ocean}
        lines={['This could be a start', 'to a new relation!']}
      />

      <FormSection
        heading="Connect with us"
        intro="We're just one click away to help you take your brand or product from great to incredible. Fill in the form to share more details about your project. Or drop in for quick chai and chat. Either way, we’d love to talk."
        label="Contact"
      >
        <Field label="Name" name="name" placeholder="Enter your full name" />
        <Field label="Email Address" name="email" placeholder="Enter your email address" type="email" />
        <Field label="Phone Number" name="phone" placeholder="Enter you phone number" type="tel" />
        <Field
          label="What can we help you with?"
          multiline
          name="message"
          placeholder="E.g. We’d like to rebrand and improve our website"
        />
      </FormSection>

      <SiteFooter />
    </div>
  )
}
