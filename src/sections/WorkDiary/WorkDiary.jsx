import { responsive } from '@/components/page/responsive.jsx'

import WorkDiaryDesktop from './WorkDiaryDesktop.jsx'
import WorkDiaryMobile from './WorkDiaryMobile.jsx'

/** Figma 2714:8758 (desktop) / 2715:10684 (mobile) — see responsive(). */
const WorkDiary = responsive(WorkDiaryDesktop, WorkDiaryMobile)

export default WorkDiary
