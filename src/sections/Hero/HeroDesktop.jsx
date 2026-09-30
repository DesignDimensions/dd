import './HeroDesktop.css'

/**
 * Figma 2714:8734 — 880px band, full-bleed image, header pinned to top.
 *
 * The image is deliberately left still. A scaling background reads as a
 * stock slideshow, and the header's entrance already carries the section.
 */
export default function HeroDesktop({ image }) {
  return (
    <section className="heroDesktop_hero">
      <img alt="" className="heroDesktop_background" src={image} />
    </section>
  )
}
