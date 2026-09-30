import { responsive } from '@/components/page/responsive.jsx'

import DesignDialogueDesktop from './DesignDialogueDesktop.jsx'
import DesignDialogueMobile from './DesignDialogueMobile.jsx'

/** Figma 2714:8806 (desktop) / 2715:11889 (mobile) — see responsive(). */
const DesignDialogue = responsive(DesignDialogueDesktop, DesignDialogueMobile)

export default DesignDialogue
