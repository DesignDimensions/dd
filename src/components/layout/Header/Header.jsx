import logoGroup1 from '@/assets/icons/logo-header-group-1.svg'
import logoGroup2 from '@/assets/icons/logo-header-group-2.svg'
import searchIcon from '@/assets/icons/search.svg'

import styles from './Header.module.css'

const NAV_ITEMS = ['Work diary', 'Design dialogue', 'About us']

/**
 * Figma 2714:8735 — sits absolutely at the top of the hero frame.
 *
 * Nav items carry no destinations in the frame, so they are rendered as
 * the text Figma shows. Wire them to routes once those exist.
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

      {NAV_ITEMS.map((item) => (
        <div className={styles.navItem} key={item}>
          <p className={styles.navText}>{item}</p>
        </div>
      ))}

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
