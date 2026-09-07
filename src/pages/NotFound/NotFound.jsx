import { Link } from 'react-router-dom'

import './NotFound.css'

/**
 * Placeholder — Figma has no 404 frame yet.
 *
 * Nothing here is taken from the design; it exists so unknown URLs do
 * not render a blank page. Replace it once a 404 frame is handed over.
 */
export default function NotFound() {
  return (
    <div className="notFound_page">
      <h1 className="notFound_code">404</h1>
      <p className="notFound_message">This page does not exist.</p>
      <Link className="notFound_link" to="/">
        Back to home
      </Link>
    </div>
  )
}
