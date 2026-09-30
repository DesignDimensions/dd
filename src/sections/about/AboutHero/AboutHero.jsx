import './AboutHero.css'

/**
 * Figma 7962:21192 — 736px band with the headline set low in the frame.
 *
 * The frame's background image did not come through the design export at
 * all (the node returned only its text child), so the photograph here is
 * the original source recovered via download_assets.
 */
export default function AboutHero({ image, label }) {
  return (
    <section className="aboutHero_hero">
      <img alt="" className="aboutHero_background" src={image} />
      <div className="aboutHero_labelRow">
        <p className="aboutHero_label">{label}</p>
      </div>
    </section>
  )
}
