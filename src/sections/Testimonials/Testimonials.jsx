import { responsive } from '@/components/page/responsive.jsx'

import TestimonialsDesktop from './TestimonialsDesktop.jsx'
import TestimonialsMobile from './TestimonialsMobile.jsx'

/** Figma 2714:8859 (desktop) / 2715:11049 (mobile) — see responsive(). */
const Testimonials = responsive(TestimonialsDesktop, TestimonialsMobile)

export default Testimonials
