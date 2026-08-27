import { Link } from 'react-router-dom'

import styles from './NotFound.module.css'

/**
 * Placeholder — Figma has no 404 frame yet.
 *
 * Nothing here is taken from the design; it exists so unknown URLs do
 * not render a blank page. Replace it once a 404 frame is handed over.
 */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>This page does not exist.</p>
      <Link className={styles.link} to="/">
        Back to home
      </Link>
    </div>
  )
}
