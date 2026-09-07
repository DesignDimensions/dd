import Contact from '@/sections/Contact/Contact.jsx'
import DesignDialogue from '@/sections/DesignDialogue/DesignDialogue.jsx'
import Exploration from '@/sections/Exploration/Exploration.jsx'
import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import Hero from '@/sections/Hero/Hero.jsx'
import SnackFactory from '@/sections/SnackFactory/SnackFactory.jsx'
import Testimonials from '@/sections/Testimonials/Testimonials.jsx'
import WorkDiary from '@/sections/WorkDiary/WorkDiary.jsx'

import './Home.css'

/**
 * Figma 2714:8733 (desktop) / 2715:10365 (mobile).
 *
 * Both frames run the same sections in the same order.
 *
 * Figma separates them with a 40px #f0f0f0 spacer on desktop and a 28px
 * gap on mobile. Now that sections are inset boxes with the page gradient
 * showing around them, that spacer would read as a floating grey bar, so
 * the gap between boxes does the job instead.
 */
export default function Home() {
  return (
    <div className="home_page">
      <Hero />
      <SnackFactory />
      <WorkDiary />
      <FeaturedStory />
      <DesignDialogue />
      <Exploration />
      <Testimonials />
      <Contact />
    </div>
  )
}
