import { CONTACT, EXPLORATION } from '@/content/settings'
import Contact from '@/sections/Contact/Contact.jsx'
import Exploration from '@/sections/Exploration/Exploration.jsx'

import './FooterZone.css'

/**
 * The close every page shares (Home, Work diary, Suryagarh): Exploration
 * and Contact, both transparent and full bleed, run together
 * as one continuous band sitting on the page ground.
 */
export default function FooterZone() {
  return (
    <div className="footerZone_zone">
      <Exploration {...EXPLORATION} />
      <Contact {...CONTACT} />
    </div>
  )
}
