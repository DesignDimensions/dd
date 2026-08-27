import Contact from '@/sections/Contact/Contact.jsx'
import AboutHero from '@/sections/about/AboutHero/AboutHero.jsx'
import AboutIntro from '@/sections/about/AboutIntro/AboutIntro.jsx'
import Brands from '@/sections/about/Brands/Brands.jsx'
import Founder from '@/sections/about/Founder/Founder.jsx'
import Mission from '@/sections/about/Mission/Mission.jsx'
import ValueBlock from '@/sections/about/ValueBlock/ValueBlock.jsx'

import styles from './About.module.css'

/** Figma 7962:21256 */
const VALUES = [
  {
    title: 'Creativity and Innovation',
    body: 'We continuously innovate to deliver unique and compelling design solutions that resonate with our clients’ audiences.',
  },
  {
    title: 'Cultural Appreciation',
    body: 'We celebrate and draw inspiration from diverse cultural traditions and crafts, integrating them into our design work to create authentic brand experiences.',
  },
  {
    title: 'Client-Centric Excellence',
    body: 'We prioritize understanding and exceeding our clients’ expectations, fostering strong partnerships built on trust, transparency, and exceptional service.',
  },
]

/** Figma 7962:21300 */
const PHILOSOPHY = [
  {
    title: 'Refinement',
    body: 'Perfecting details with meticulous attention to achieve high-quality results.',
  },
  {
    title: 'Coherence',
    body: 'Ensuring unity and clarity across all design elements for effective communication.',
  },
  {
    title: 'Innovation',
    body: 'Embracing creativity and pushing boundaries to deliver fresh and impactful solutions.',
  },
]

/**
 * Figma 7962:21156 — "About us", desktop only.
 *
 * Carries the home page's presentation language: the header and hero run
 * flush to the page edges, everything below is a box of one width with the
 * shared radius and elevation, and the footer is the same component the
 * home page uses — boxed here, since this page's ground is a flat colour
 * rather than the gradient its fill matches.
 */
export default function About() {
  return (
    <div className={styles.page}>
      <AboutHero />
      <AboutIntro />
      <Founder />
      <Mission />
      <ValueBlock
        background="#ffffff"
        columns={VALUES}
        heading="Our values"
        lede="We specializes in crafting bespoke design solutions that blend cultural richness with innovative creativity, aiming to fortify brands with impactful visual narratives."
      />
      <ValueBlock
        background="#e8eadc"
        columns={PHILOSOPHY}
        heading="Design Philosophy"
        lede="At Design Dimensions, our design philosophy revolves around delivering perfection, clarity, and precision in every project, ensuring that our bold and beautiful designs empower and inspire."
      />
      <Brands />
      <Contact variant="boxed" />
    </div>
  )
}
