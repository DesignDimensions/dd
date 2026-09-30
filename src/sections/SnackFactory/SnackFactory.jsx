import { responsive } from '@/components/page/responsive.jsx'

import SnackFactoryDesktop from './SnackFactoryDesktop.jsx'
import SnackFactoryMobile from './SnackFactoryMobile.jsx'

/** Figma 2714:8744 (desktop) / 2715:10544 (mobile) — see responsive(). */
const SnackFactory = responsive(SnackFactoryDesktop, SnackFactoryMobile)

export default SnackFactory
