import Contact from '@/sections/Contact/Contact.jsx'
import Exploration from '@/sections/Exploration/Exploration.jsx'

import './FooterZone.css'

/**
 * The close every page shares (Home, Work diary, Suryagarh): Exploration
 * and Contact, both in their transparent full-bleed variant, run together
 * as one continuous band sitting on the page ground.
 */
export default function FooterZone() {
  return (
    <div className="footerZone_zone">
      <Exploration variant="transparent" />
      <Contact variant="transparent" />
    </div>
  )
}
