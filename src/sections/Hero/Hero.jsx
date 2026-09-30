import { responsive } from '@/components/page/responsive.jsx'

import HeroDesktop from './HeroDesktop.jsx'
import HeroMobile from './HeroMobile.jsx'

/** Figma 2714:8734 (desktop) / 2715:10545 (mobile) — see responsive(). */
const Hero = responsive(HeroDesktop, HeroMobile)

export default Hero
