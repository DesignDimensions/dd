import './FeaturedStoryMobile.css'

/**
 * Figma 2715:10751 "3".
 *
 * Title is "Papadmalji" here and "PAPADMALJI" on desktop. Both papads
 * are rotated -15.21deg on mobile, where desktop mirrors the second one.
 *
 * Boxed like every other mobile section (reference: wepresent, where
 * nothing sits loose on the page), in the featured project's own colour
 * (`background` — the one its Work diary card wears), with the papads
 * cut off by the box's rounded edge.
 */

export default function FeaturedStoryMobile({
  background,
  eyebrow,
  heading,
  image,
  quote,
}) {
  return (
    <section
      className="featuredStoryMobile_section"
      style={{ backgroundColor: background }}
    >
      <div className="featuredStoryMobile_papadTop">
        <div className="featuredStoryMobile_papadRotate">
          <div className="featuredStoryMobile_papadTopFrame">
            <img
              alt=""
              className="featuredStoryMobile_papadImage"
              src={image}
            />
          </div>
        </div>
      </div>

      <div className="featuredStoryMobile_papadBottom">
        <div className="featuredStoryMobile_papadRotate">
          <div className="featuredStoryMobile_papadBottomFrame">
            <img
              alt=""
              className="featuredStoryMobile_papadImage"
              src={image}
            />
          </div>
        </div>
      </div>

      <div className="featuredStoryMobile_heading">
        <p className="featuredStoryMobile_eyebrow">{eyebrow}</p>
        <p className="featuredStoryMobile_title">{heading}</p>
      </div>
      <p className="featuredStoryMobile_quote">{quote}</p>
    </section>
  )
}
