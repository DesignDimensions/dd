import { Link } from 'react-router-dom'

import logoGroup1 from '@/assets/icons/logo-header-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-header-group-2.svg'
import searchIcon from '@/assets/icons/search.svg'

import styles from './Header.module.css'

const NAV_ITEMS = [
  { label: 'Work diary', to: null },
  { label: 'Design dialogue', to: null },
  { label: 'About us', to: '/about' },
]

/**
 * Figma 2714:8735 — sits absolutely at the top of the hero frame.
 *
 * Figma gives the nav no destinations, so only the items that have a page
 * are links; the rest render as the text the frame shows.
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoGroup1}>
          <img alt="" className={styles.logoImage} src={logoGroup1} />
        </div>
        <div className={styles.logoGroup2}>
          <img alt="" className={styles.logoImage} src={logoGroup2} />
        </div>
      </div>

      <div className={styles.spacer} />

      {NAV_ITEMS.map((item) =>
        item.to ? (
          <Link className={styles.navItem} key={item.label} to={item.to}>
            <p className={styles.navText}>{item.label}</p>
          </Link>
        ) : (
          <div className={styles.navItem} key={item.label}>
            <p className={styles.navText}>{item.label}</p>
          </div>
        ),
      )}

      <button className={styles.searchBar} type="button">
        <div className={styles.searchLabel}>
          <p className={styles.searchText}>Search</p>
        </div>
        <div className={styles.searchIcon}>
          <img alt="" className={styles.searchIconImage} src={searchIcon} />
        </div>
      </button>
    </header>
  )
}
