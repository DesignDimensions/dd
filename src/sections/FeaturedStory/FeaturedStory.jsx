import { responsive } from '@/components/page/responsive.jsx'

import FeaturedStoryDesktop from './FeaturedStoryDesktop.jsx'
import FeaturedStoryMobile from './FeaturedStoryMobile.jsx'

/** Figma 2714:8800 (desktop) / 2715:10751 (mobile) — see responsive(). */
const FeaturedStory = responsive(FeaturedStoryDesktop, FeaturedStoryMobile)

export default FeaturedStory
