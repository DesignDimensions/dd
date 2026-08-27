import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import styles from './ProductCardMobile.module.css'

/**
 * Figma "Product Card Mobile" 2715:10696 — square image with a 12px
 * top radius over a coloured body with a 12px bottom radius.
 */
export default function ProductCardMobile({
  image,
  title,
  body,
  tag,
  background,
  mediaBackground,
}) {
  return (
    <div className={styles.card}>
      <div
        className={styles.media}
        style={{ backgroundColor: mediaBackground }}
      >
        <img alt="" className={styles.image} src={image} />
      </div>
      <div className={styles.body} style={{ backgroundColor: background }}>
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.copy}>{body}</p>
        </div>
        <div className={styles.footer}>
          <Tag size="mobile">{tag}</Tag>
          <IconButton size={32} />
        </div>
      </div>
    </div>
  )
}
