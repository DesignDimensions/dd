import Cta from '@/components/ui/Cta/Cta.jsx'
import { useIsMobile } from '@/hooks/useIsMobile'

import './NotFound.css'

/**
 * Figma has no 404 frame yet, so this is set in Home's language rather
 * than taken from a design: one white box on the page gradient, Home's
 * section head, and its black CTA back to the start. Replace it once a
 * 404 frame is handed over.
 */
export default function NotFound() {
  const isMobile = useIsMobile()

  return (
    <div className="notFound_page">
      <section className="notFound_box">
        <p className="notFound_eyebrow">Error 404</p>
        <h1 className="notFound_heading">This page does not exist</h1>
        <p className="notFound_message">
          The link may be old, or the page may have moved. Everything else is
          still where you left it.
        </p>
        <Cta size={isMobile ? 'mobile' : 'desktop'} to="/">
          Back to home
        </Cta>
      </section>
    </div>
  )
}
