import founder from '@/assets/about/founder.jpg'

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
export default function Founder() {
  return (
    <section className="founder_section">
      <div className="founder_head">
        <p className="founder_eyebrow">Lorem Ipsum</p>
        <p className="founder_heading">Meet the founder</p>
      </div>

      <article className="founder_card">
        <div className="founder_media">
          <img alt="Aparna Kakrania" className="founder_image" src={founder} />
        </div>

        <div className="founder_body">
          <div className="founder_nameStack">
            <p className="founder_role">Founder</p>
            <p className="founder_name">Aparna Kakrania</p>
          </div>
          <p className="founder_bio">
            Growing up in eastern India and studying in the west, I developed a
            deep appreciation for our diverse cultures and crafts. At Maharani
            Gayatri Devi Girls School in Jaipur, my passion for vernacular
            design ignited. After earning a Bachelor&rsquo;s in English
            Literature from Delhi University and studying graphic design at
            South Delhi Polytechnic, I launched Design Dimensions in 1997.
          </p>
        </div>
      </article>
    </section>
  )
}
