import { useIsMobile } from '@/hooks/useIsMobile'
import Contact from '@/sections/Contact/Contact.jsx'
import DesignDialogue from '@/sections/DesignDialogue/DesignDialogue.jsx'
import Exploration from '@/sections/Exploration/Exploration.jsx'
import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import Hero from '@/sections/Hero/Hero.jsx'
import SnackFactory from '@/sections/SnackFactory/SnackFactory.jsx'
import Testimonials from '@/sections/Testimonials/Testimonials.jsx'
import WorkDiary from '@/sections/WorkDiary/WorkDiary.jsx'

import styles from './Home.module.css'

/**
 * Figma 2714:8733 (desktop) / 2715:10365 (mobile).
 *
 * Both frames run the same sections in the same order. They differ in how
 * the sections are separated: desktop puts a 40px #f0f0f0 spacer after
 * Snack Factory and butts everything else together, while mobile spaces
 * every section by 28px and has no spacer.
 */
export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div className={styles.page}>
      <Hero />
      <SnackFactory />
      {!isMobile && <div className={styles.spacer} />}
      <WorkDiary />
      <FeaturedStory />
      <DesignDialogue />
      <Exploration />
      <Testimonials />
      <Contact />
    </div>
  )
}
