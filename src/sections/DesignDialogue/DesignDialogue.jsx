import { useIsMobile } from '@/hooks/useIsMobile'

import DesignDialogueDesktop from './DesignDialogueDesktop.jsx'
import DesignDialogueMobile from './DesignDialogueMobile.jsx'

/**
 * Picks the frame to render.
 *
 * Figma 2714:8733 (desktop, 1440) and 2715:10365 (mobile, 360) differ in
 * content, not only in size, so this is a branch rather than a media query.
 */
export default function DesignDialogue() {
  return useIsMobile() ? <DesignDialogueMobile /> : <DesignDialogueDesktop />
}
