import './Brands.css'

/**
 * Figma 7962:21344 — twelve 248x108 logo tiles on a 1120 wrap.
 *
 * Figma names each tile (Suryagarh, Godawan, White Rhino and so on) but
 * renders it as an image with no label, so the names are carried here as
 * alt text only.
 */

export default function Brands({ eyebrow, heading, logos }) {
  return (
    <section className="section_box section_clip brands_section">
      <div className="brands_textStack">
        <div className="brands_stack24">
          <div className="brands_stack16">
            <p className="text_eyebrow brands_eyebrow">{eyebrow}</p>
            <div className="brands_headingRow">
              <p className="brands_heading">{heading}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="brands_grid">
        {logos.map((brand, index) => (
          <div className="brands_tile" key={`${brand.name}-${index}`}>
            <img alt={brand.name} className="brands_logo" src={brand.src} />
          </div>
        ))}
      </div>
    </section>
  )
}
