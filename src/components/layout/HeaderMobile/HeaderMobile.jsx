import logoGroup1 from '@/assets/mobile/logo-group-1.svg'
import logoGroup2 from '@/assets/mobile/logo-group-2.svg'
import menuIcon from '@/assets/mobile/menu.svg'
import searchIcon from '@/assets/mobile/search.svg'

import styles from './HeaderMobile.module.css'

/**
 * Figma 4840:9211 "Header mobile".
 *
 * The desktop nav links are not present in this frame — mobile collapses
 * them behind the drop-down button, whose open state Figma does not show.
 */
export default function HeaderMobile() {
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

      <div className={styles.actions}>
        <button className={styles.search} type="button">
          <div className={styles.searchIcon}>
            <img alt="" className={styles.iconImage} src={searchIcon} />
          </div>
        </button>
        <button aria-label="Menu" className={styles.menu} type="button">
          <div className={styles.menuIcon}>
            <div className={styles.menuIconInner}>
              <img alt="" className={styles.menuImage} src={menuIcon} />
            </div>
          </div>
        </button>
      </div>
    </header>
  )
}
