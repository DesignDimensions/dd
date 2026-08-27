import { useIsMobile } from '@/hooks/useIsMobile'

import FeaturedStoryDesktop from './FeaturedStoryDesktop.jsx'
import FeaturedStoryMobile from './FeaturedStoryMobile.jsx'

/**
 * Picks the frame to render.
 *
 * Figma 2714:8733 (desktop, 1440) and 2715:10365 (mobile, 360) differ in
 * content, not only in size, so this is a branch rather than a media query.
 */
export default function FeaturedStory() {
  return useIsMobile() ? <FeaturedStoryMobile /> : <FeaturedStoryDesktop />
}
