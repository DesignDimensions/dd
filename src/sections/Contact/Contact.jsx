import { responsive } from '@/components/page/responsive.jsx'

import ContactDesktop from './ContactDesktop.jsx'
import ContactMobile from './ContactMobile.jsx'

/** Figma 2715:11778 (desktop) / 2715:11075 (mobile) — see responsive(). */
const Contact = responsive(ContactDesktop, ContactMobile)

export default Contact
