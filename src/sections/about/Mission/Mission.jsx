import './Mission.css'

/**
 * Figma 7962:21244 — the statement between the two white blocks.
 *
 * Set the way Home sets its Featured Story rather than as Figma's dark
 * box: on desktop an open band on the page gradient, heading over a
 * large serif statement; on mobile, where nothing sits loose on the
 * page, the same in a rounded box in one of the gradient's stops.
 */
export default function Mission() {
  return (
    <section className="mission_section">
      <p className="mission_heading">Our Mission</p>
      <p className="mission_body">
        At Design Dimensions, our mission is to provide meticulously tailored
        and conceptually fitting design solutions to our clients. We offer a
        comprehensive suite of services aimed at fortifying brands with clarity,
        elegance, and pride.
      </p>
    </section>
  )
}
