import './AboutIntro.css'

/** Figma 7962:21196 — the same two-column band the home frame opens with. */
export default function AboutIntro() {
  return (
    <section className="aboutIntro_section">
      <div className="aboutIntro_left">
        <div className="aboutIntro_textStack">
          <div className="aboutIntro_stack24">
            <div className="aboutIntro_stack16">
              <div className="aboutIntro_headingRow">
                <p className="aboutIntro_heading">About Us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutIntro_right">
        <div className="aboutIntro_introRow">
          <p className="aboutIntro_intro">
            Design, design, design and all things craft describe us the best.
          </p>
        </div>
      </div>
    </section>
  )
}
