import pinIcon from '@/assets/forms/map-pin.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'

import './FormSection.css'

/**
 * Figma 2719:20411 (Contact us) / 2719:21208 (Careers) — a white card: the
 * studio's details on the left, a form on the right. `intro` and `after`
 * are the parts the two frames don't share (Contact's paragraph, Careers'
 * "Learn more" link); `children` are the form's fields.
 *
 * There is no endpoint to post to yet, so submitting stays on the page.
 */
export default function FormSection({ after, children, heading, intro, label }) {
  return (
    <section className="formSection_section">
      <div className="formSection_aside">
        <h2 className="formSection_heading">{heading}</h2>
        {intro ? <p className="formSection_intro">{intro}</p> : null}

        {/* Figma 2719:20415 */}
        <div className="formSection_reach">
          <p className="formSection_reachTitle">
            Let’s chat about your amazing ideas and projects directly, reach out to us
          </p>
          <a className="formSection_email" href="mailto:info@designdimensions.in">
            info@designdimensions.in
          </a>
        </div>

        {/* Figma 2719:20416 — "Kailash ll" verbatim */}
        <div className="formSection_studio">
          <div className="formSection_studioName">
            <img alt="" className="formSection_pin" src={pinIcon} />
            <p className="formSection_studioTitle">Design Dimensions</p>
          </div>
          <address className="formSection_address">
            M-283, Ground Floor, Block M, Greater Kailash ll, Greater Kailash, New Delhi-110048
            <br />
            Ph: +91 96250 12486
          </address>
        </div>

        {after}
      </div>

      <form aria-label={label} className="formSection_form" onSubmit={(event) => event.preventDefault()}>
        {children}
        <Cta type="submit">Submit</Cta>
      </form>
    </section>
  )
}
