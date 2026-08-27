import { useIsMobile } from '@/hooks/useIsMobile'

import SnackFactoryDesktop from './SnackFactoryDesktop.jsx'
import SnackFactoryMobile from './SnackFactoryMobile.jsx'

/**
 * Picks the frame to render.
 *
 * Figma 2714:8733 (desktop, 1440) and 2715:10365 (mobile, 360) differ in
 * content, not only in size, so this is a branch rather than a media query.
 */
export default function SnackFactory() {
  return useIsMobile() ? <SnackFactoryMobile /> : <SnackFactoryDesktop />
}
