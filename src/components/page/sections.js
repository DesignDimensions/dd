import AboutHero from '@/sections/about/AboutHero/AboutHero.jsx'
import AboutIntro from '@/sections/about/AboutIntro/AboutIntro.jsx'
import Brands from '@/sections/about/Brands/Brands.jsx'
import Founder from '@/sections/about/Founder/Founder.jsx'
import Mission from '@/sections/about/Mission/Mission.jsx'
import ValueBlock from '@/sections/about/ValueBlock/ValueBlock.jsx'
import DesignDialogue from '@/sections/DesignDialogue/DesignDialogue.jsx'
import Articles from '@/sections/dialogue/Articles/Articles.jsx'
import FinishReading from '@/sections/dialogue/FinishReading/FinishReading.jsx'
import FeaturedStory from '@/sections/FeaturedStory/FeaturedStory.jsx'
import FooterZone from '@/sections/FooterZone/FooterZone.jsx'
import FormHero from '@/sections/FormHero/FormHero.jsx'
import FormSection from '@/sections/FormSection/FormSection.jsx'
import HeaderBand from '@/sections/HeaderBand/HeaderBand.jsx'
import Hero from '@/sections/Hero/Hero.jsx'
import SiteFooter from '@/sections/SiteFooter/SiteFooter.jsx'
import SnackFactory from '@/sections/SnackFactory/SnackFactory.jsx'
import Testimonials from '@/sections/Testimonials/Testimonials.jsx'
import WorkDiary from '@/sections/WorkDiary/WorkDiary.jsx'

/**
 * The section types a page can be built from — the CMS's section
 * vocabulary, named by what each section does. Each maps to the component
 * that renders it; its content arrives as that component's props.
 */
export const SECTIONS = {
  homeHero: Hero,
  aboutHero: AboutHero,
  formHero: FormHero,
  headerBand: HeaderBand,
  projectIntro: SnackFactory,
  aboutIntro: AboutIntro,
  projectGrid: WorkDiary,
  articleGrid: Articles,
  featureBand: FeaturedStory,
  storyCarousel: DesignDialogue,
  readingRail: FinishReading,
  testimonials: Testimonials,
  founder: Founder,
  statement: Mission,
  values: ValueBlock,
  brands: Brands,
  form: FormSection,
  siteFooter: SiteFooter,
  footer: FooterZone,
}
