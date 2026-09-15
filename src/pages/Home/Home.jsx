import DesignDialogue from '@/sections/DesignDialogue/DesignDialogue.jsx'
import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import Hero from '@/sections/Hero/Hero.jsx'
import SnackFactory from '@/sections/SnackFactory/SnackFactory.jsx'
import Testimonials from '@/sections/Testimonials/Testimonials.jsx'
import WorkDiary from '@/sections/WorkDiary/WorkDiary.jsx'

import './Home.css'

/**
 * Figma 2714:8733 (desktop) / 2715:10365 (mobile).
 *
 * Presentation follows the Suryagarh project page: the hero runs flush to
 * the viewport, everything below it is a white box on the page ground with
 * shared --page-inset padding, --section-gap between boxes, and
 * --section-radius corners, and the page closes on one footer band. The
 * ground itself stays Home's own gradient, the same way each project page
 * keeps its own ground colour.
 *
 * Figma separates sections with a 40px #f0f0f0 spacer on desktop and a
 * 28px gap on mobile. Now that sections are inset boxes with the page
 * gradient showing around them, that spacer would read as a floating grey
 * bar, so the gap between boxes does the job instead.
 *
 * Figma runs Exploration before Testimonials. Testimonials moves up here
 * so Exploration and Contact can close the page together, as on Suryagarh.
 */
export default function Home() {
  return (
    <div className="home_page">
      <Hero />
      <SnackFactory />
      {/* The first seven projects: the featured card and two full rows. */}
      <WorkDiary limit={7} />
      <FeaturedStory />
      <DesignDialogue />
      <Testimonials />
      <FooterZone />
    </div>
  )
}
