import './HeroMobile.css'

/**
 * Figma 2715:10545 — header stacked above a square 360x360 banner.
 *
 * The banner export is byte-identical to the desktop hero image, so the
 * same file is reused and cropped square by the frame.
 */
export default function HeroMobile({ image }) {
  return (
    <section className="heroMobile_hero">
      <div className="heroMobile_banner">
        <img alt="" className="heroMobile_bannerImage" src={image} />
      </div>
    </section>
  )
}
