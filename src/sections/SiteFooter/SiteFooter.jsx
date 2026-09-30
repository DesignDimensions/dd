import { Link } from 'react-router-dom'

import divider from '@/assets/icons/divider.svg'
import logoGroup1 from '@/assets/icons/logo-header-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-header-group-2.svg'
import { useContent } from '@/content/useContent'
import { FOOTER_GRID } from '@/lib/footerGrid'

import './SiteFooter.css'

/**
 * Figma 2719:20444 — the Contact us and Careers pages' footer: a rule, the
 * logo and link grid, and the social row. These pages carry their own form,
 * so they close on this rather than the Contact section.
 */
export default function SiteFooter() {
  const { settings } = useContent()
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
          {settings.footerLinks.map(({ label, to }, index) =>
            to ? (
              <Link
                className="siteFooter_link"
                key={label}
                style={FOOTER_GRID[index]}
                to={to}
              >
                {label}
              </Link>
            ) : (
              <span
                className="siteFooter_link"
                key={label}
                style={FOOTER_GRID[index]}
              >
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
          {settings.socials.map(({ href, icon, label }) =>
            href ? (
              <a
                aria-label={label}
                className="siteFooter_social"
                href={href}
                key={label}
              >
                <img alt="" className="siteFooter_socialIcon" src={icon} />
              </a>
            ) : (
              <span
                aria-label={label}
                className="siteFooter_social"
                key={label}
                role="img"
              >
                <img alt="" className="siteFooter_socialIcon" src={icon} />
              </span>
            ),
          )}
        </div>
      </div>
    </footer>
  )
}
