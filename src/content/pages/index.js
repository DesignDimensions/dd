import { ABOUT_PAGE } from './about'
import { CAREERS_PAGE } from './careers'
import { CONTACT_PAGE } from './contact'
import { DESIGN_DIALOGUE_PAGE } from './designDialogue'
import { HOME_PAGE } from './home'
import { WORK_PAGE } from './work'

/** Every section-built page by its route — what the CMS will serve. Search
    lists the pages that have `search` details in this order. */
export const PAGES = {
  '/': HOME_PAGE,
  '/work': WORK_PAGE,
  '/design-dialogue': DESIGN_DIALOGUE_PAGE,
  '/about': ABOUT_PAGE,
  '/careers': CAREERS_PAGE,
  '/contact': CONTACT_PAGE,
}
