import styles from './ArrowCircle.module.css'

/**
 * The "Icon button" vector, inlined.
 *
 * All path data is copied verbatim from Figma's exports rather than
 * redrawn. It is inline because the ring and the glyph have to recolour
 * on hover, which is impossible through an <img>.
 *
 * Note the mobile frame uses two different glyphs — an arrow on some
 * cards and a bookmark on others (icon-button-2.svg).
 */
const RING = {
  40: { box: 40, radius: 19.5 },
  32: { box: 32, radius: 15.5 },
}

const GLYPH = {
  arrow: {
    40: 'M23.1893 19.5L20.0429 16.3536L20.75 15.6464L25.1036 20L20.75 24.3536L20.0429 23.6464L23.1893 20.5H14.8964V19.5H23.1893Z',
    32: 'M19.1893 15.5L16.0429 12.3536L16.75 11.6464L21.1036 16L16.75 20.3536L16.0429 19.6464L19.1893 16.5H10.8964V15.5H19.1893Z',
  },
  bookmark: {
    32: 'M12 12.2125C12 11.2667 12.7462 10.5 13.6667 10.5H18.3333C19.2538 10.5 20 11.2667 20 12.2125V21.5L16 18.8579L12 21.5V12.2125ZM13.6667 11.185C13.1144 11.185 12.6667 11.645 12.6667 12.2125V20.2453L16 18.0436L19.3333 20.2453V12.2125C19.3333 11.645 18.8856 11.185 18.3333 11.185H13.6667Z',
  },
}

export default function ArrowCircle({ size = 40, glyph = 'arrow' }) {
  const { box, radius } = RING[size] ?? RING[40]
  const path = GLYPH[glyph]?.[size] ?? GLYPH.arrow[size] ?? GLYPH.arrow[40]
  const centre = box / 2

  return (
    <svg
      aria-hidden="true"
      className={styles.svg}
      fill="none"
      height={size}
      viewBox={`0 0 ${box} ${box}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={styles.ring} cx={centre} cy={centre} r={radius} />
      <path
        className={styles.glyph}
        clipRule="evenodd"
        d={path}
        fillRule="evenodd"
      />
    </svg>
  )
}
