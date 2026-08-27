import IconButton from '@/components/ui/IconButton/IconButton.jsx'

import styles from './ProjectCard.module.css'

/**
 * The card used in "Work diary" and "Design Dialogue".
 *
 * Figma nests a 360x360 image inside a 352px-wide card with overflow
 * clipped, so the image is deliberately wider than its frame.
 *
 * `title` is an array because Figma hard-breaks some titles onto two
 * lines rather than letting them wrap.
 */
export default function ProjectCard({
  image,
  eyebrow,
  title,
  body,
  background,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <img alt="" className={styles.image} src={image} />
      </div>
      <div className={styles.footer} style={{ backgroundColor: background }}>
        <div className={styles.textStack}>
          <div className={styles.stack12}>
            <div className={styles.stack8}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <div className={styles.headingRow}>
                <div className={styles.title}>
                  {title.map((line) => (
                    <p className={styles.titleLine} key={line}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <p className={styles.body}>{body}</p>
            </div>
          </div>
        </div>
        <IconButton />
      </div>
    </div>
  )
}
