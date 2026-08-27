import { useIsMobile } from '@/hooks/useIsMobile'

import WorkDiaryDesktop from './WorkDiaryDesktop.jsx'
import WorkDiaryMobile from './WorkDiaryMobile.jsx'

/**
 * Picks the frame to render.
 *
 * Figma 2714:8733 (desktop, 1440) and 2715:10365 (mobile, 360) differ in
 * content, not only in size, so this is a branch rather than a media query.
 */
export default function WorkDiary() {
  return useIsMobile() ? <WorkDiaryMobile /> : <WorkDiaryDesktop />
}
