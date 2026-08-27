import { useIsMobile } from '@/hooks/useIsMobile'

import HeroDesktop from './HeroDesktop.jsx'
import HeroMobile from './HeroMobile.jsx'

/**
 * Picks the frame to render.
 *
 * Figma 2714:8733 (desktop, 1440) and 2715:10365 (mobile, 360) differ in
 * content, not only in size, so this is a branch rather than a media query.
 */
export default function Hero() {
  return useIsMobile() ? <HeroMobile /> : <HeroDesktop />
}
