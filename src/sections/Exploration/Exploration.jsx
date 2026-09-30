import { responsive } from '@/components/page/responsive.jsx'

import ExplorationDesktop from './ExplorationDesktop.jsx'
import ExplorationMobile from './ExplorationMobile.jsx'

/** Figma 2714:8846 (desktop) / 2715:10895 (mobile) — see responsive(). */
const Exploration = responsive(ExplorationDesktop, ExplorationMobile)

export default Exploration
