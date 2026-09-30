import { Link } from 'react-router-dom'

import pinIcon from '@/assets/forms/map-pin.svg'
import Cta from '@/components/ui/Cta/Cta.jsx'
import { STUDIO } from '@/content/settings'

import FormFields from './FormFields.jsx'

import './FormSection.css'

/**
 * Figma 2719:20411 (Contact us) / 2719:21208 (Careers) — a white card: the
 * studio's details on the left, a form on the right. `intro` and `after`
 * are the parts the two frames don't share (Contact's paragraph, Careers'
 * "Learn more" link); `children` are the form's fields.
 *
 * There is no endpoint to post to yet, so submitting stays on the page.
 */
export default function FormSection({ after, fields, heading, intro, label }) {
  return (
    <section className="section_box section_clip formSection_section">
      <div className="formSection_aside">
        <h2 className="text_heading formSection_heading">{heading}</h2>
        {intro ? <p className="formSection_intro">{intro}</p> : null}

        {/* Figma 2719:20415 */}
        <div className="formSection_reach">
          <p className="formSection_reachTitle">{STUDIO.reach}</p>
          <a className="formSection_email" href={`mailto:${STUDIO.email}`}>
            {STUDIO.email}
          </a>
        </div>

        {/* Figma 2719:20416 — "Kailash ll" verbatim */}
        <div className="formSection_studio">
          <div className="formSection_studioName">
            <img alt="" className="formSection_pin" src={pinIcon} />
            <p className="formSection_studioTitle">{STUDIO.name}</p>
          </div>
          <address className="formSection_address">
            {STUDIO.address}
            <br />
            {STUDIO.phone}
          </address>
        </div>

        {after ? (
          <Link className="formSection_link" to={after.to}>
            {after.label}
          </Link>
        ) : null}
      </div>

      <form
        aria-label={label}
        className="formSection_form"
        onSubmit={(event) => event.preventDefault()}
      >
        <FormFields fields={fields} />
        <Cta type="submit">Submit</Cta>
      </form>
    </section>
  )
}
