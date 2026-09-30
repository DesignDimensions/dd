import './Founder.css'

/**
 * Figma 7962:21218 — heading, then the founder's card.
 *
 * The card is Home's testimonial card rather than Figma's split photo and
 * dark panel: one frame colour (a stop from the page gradient) with the
 * portrait inset at the media radius beside the biography, which is set
 * in the serif Home uses for anything said in someone's own voice.
 *
 * The photograph is the original source; the design export for it came
 * back empty. Figma renders it desaturated, so the greyscale is applied
 * here rather than baked into the asset.
 */
export default function Founder({ bio, eyebrow, heading, image, name, role }) {
  return (
    <section className="section_box section_clip founder_section">
      <div className="founder_head">
        <p className="text_eyebrow founder_eyebrow">{eyebrow}</p>
        <p className="text_heading founder_heading">{heading}</p>
      </div>

      <article className="founder_card">
        <div className="founder_media">
          <img alt={name} className="founder_image" src={image} />
        </div>

        <div className="founder_body">
          <div className="founder_nameStack">
            <p className="founder_role">{role}</p>
            <p className="founder_name">{name}</p>
          </div>
          <p className="founder_bio">{bio}</p>
        </div>
      </article>
    </section>
  )
}
