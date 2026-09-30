import './HeaderBand.css'

/**
 * Figma 2715:13252 (Work diary) / 2719:24276 (Design dialogue) — both
 * frames draw their own plain 144px header bar rather than the floating
 * pill built for Home, so it is dropped in favour of the site header
 * (SiteHeader, mounted once in Layout). With no hero image on these
 * pages, the band is bare page ground for the pill to sit in.
 */
export default function HeaderBand() {
  return <section className="headerBand_band" />
}
