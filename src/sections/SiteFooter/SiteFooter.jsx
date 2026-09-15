import { Link } from 'react-router-dom'

import instagram from '@/assets/forms/instagram.svg'
import linkedin from '@/assets/forms/linkedin.svg'
import mail from '@/assets/forms/mail.svg'
import whatsapp from '@/assets/forms/whatsapp.svg'
import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-header-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-header-group-2.svg'

import './SiteFooter.css'

/** Figma 2719:20451 – 20456 — the same 281-wide grid as Contact's footer;
 * the items that have a page are links. */
const LINKS = [
  { label: 'About us', left: 0, top: 0, to: '/about' },
  { label: 'Work diary', left: 82, top: 0, to: '/work' },
  { label: 'Design dialogue', left: 176, top: 0, to: '/design-dialogue' },
  { label: 'Careers', left: 0, top: 44, to: '/careers' },
  { label: 'Contact us', left: 82, top: 44, to: '/contact' },
  { label: 'Privacy policy', left: 176, top: 44, to: null },
]

/** Figma 2719:20460 – 20466. Only mail has a destination in the frames
 * (the studio's address); the others wait on their profile URLs. */
const SOCIALS = [
  { label: 'Instagram', icon: instagram, href: null },
  { label: 'Email', icon: mail, href: 'mailto:info@designdimensions.in' },
  { label: 'WhatsApp', icon: whatsapp, href: null },
  { label: 'LinkedIn', icon: linkedin, href: null },
]

/**
 * Figma 2719:20444 — the Contact us and Careers pages' footer: a rule, the
 * logo and link grid, and the social row. These pages carry their own form,
 * so they close on this rather than the Contact section.
 */
export default function SiteFooter() {
  return (
    <footer className="siteFooter_footer">
      <img alt="" className="siteFooter_divider" src={divider} />

      <div className="siteFooter_row">
        <div className="siteFooter_logo">
          <div className="siteFooter_logoGroup1">
            <img alt="" className="siteFooter_logoImage" src={logoGroup1} />
          </div>
          <div className="siteFooter_logoGroup2">
            <img alt="" className="siteFooter_logoImage" src={logoGroup2} />
          </div>
        </div>

        <nav aria-label="Footer" className="siteFooter_links">
          {LINKS.map(({ label, left, top, to }) =>
            to ? (
              <Link className="siteFooter_link" key={label} style={{ left, top }} to={to}>
                {label}
              </Link>
            ) : (
              <span className="siteFooter_link" key={label} style={{ left, top }}>
                {label}
              </span>
            ),
          )}
        </nav>
      </div>

      {/* Figma 2719:20457 */}
      <div className="siteFooter_connect">
        <p className="siteFooter_connectLabel">Connect with us:</p>
        <div className="siteFooter_socials">
          {SOCIALS.map(({ href, icon, label }) =>
            href ? (
              <a aria-label={label} className="siteFooter_social" href={href} key={label}>
                <img alt="" className="siteFooter_socialIcon" src={icon} />
              </a>
            ) : (
              <span aria-label={label} className="siteFooter_social" key={label} role="img">
                <img alt="" className="siteFooter_socialIcon" src={icon} />
              </span>
            ),
          )}
        </div>
      </div>
    </footer>
  )
}
