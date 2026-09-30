/**
 * A tiny drawing of what a section looks like, so the "add a section"
 * picker shows shapes rather than a list of names. Each is sketched on a
 * 64×40 page from a handful of marks:
 *
 *   p  picture      h  heading      t  text line     b  button (pill)
 *   c  card         q  big serif line   s  small label
 */
const SKETCHES = {
  homeHero: [['p', 0, 0, 64, 40]],
  aboutHero: [['p', 0, 0, 64, 40, 'ink'], ['q', 18, 18, 28, 3, 'white']],
  formHero: [['p', 0, 0, 64, 40], ['s', 8, 12, 10, 2, 'white'], ['h', 8, 16, 26, 4, 'white'], ['h', 8, 22, 18, 4, 'white']],
  banner: [['p', 0, 0, 64, 40]],
  pinBanner: [['p', 0, 0, 64, 40, 'cream'], ['h', 22, 18, 20, 3]],
  headerBand: [['c', 20, 6, 24, 7], ['t', 4, 30, 56, 1.5, 'faint']],
  projectIntro: [['h', 6, 12, 16, 4], ['q', 28, 11, 30, 2.5], ['q', 28, 16, 28, 2.5], ['q', 28, 21, 22, 2.5], ['b', 28, 28, 14, 5]],
  aboutIntro: [['h', 6, 14, 16, 4], ['q', 28, 13, 30, 2.5], ['q', 28, 18, 24, 2.5]],
  projectGrid: [['s', 6, 5, 8, 1.5], ['h', 6, 8, 18, 3], ['c', 6, 14, 34, 22, 'p'], ['c', 42, 14, 16, 22, 'p']],
  articleGrid: [['h', 6, 5, 18, 3], ['c', 6, 12, 52, 11, 'p'], ['c', 6, 26, 16, 12, 'p'], ['c', 24, 26, 16, 12, 'p'], ['c', 42, 26, 16, 12, 'p']],
  featureBand: [['p', 44, 2, 14, 16, 'tilt'], ['s', 26, 14, 12, 1.5], ['h', 22, 18, 20, 3], ['q', 12, 25, 40, 2.5], ['p', 6, 26, 14, 14, 'tilt2']],
  storyCarousel: [['h', 6, 5, 18, 3], ['c', 2, 16, 12, 18, 'p'], ['c', 16, 14, 14, 22, 'p'], ['c', 32, 12, 16, 26, 'p', 'hot'], ['c', 50, 16, 12, 18, 'p']],
  readingRail: [['s', 6, 5, 10, 1.5], ['h', 6, 8, 22, 3], ['c', 6, 15, 16, 22, 'p'], ['c', 24, 15, 16, 22, 'p'], ['c', 42, 15, 16, 22, 'p']],
  finishReading: [['s', 6, 5, 10, 1.5], ['h', 6, 8, 22, 3], ['c', 6, 15, 16, 22, 'p'], ['c', 24, 15, 16, 22, 'p'], ['c', 42, 15, 16, 22, 'p']],
  moreProjects: [['h', 6, 6, 22, 3], ['c', 6, 14, 16, 22, 'p'], ['c', 24, 14, 16, 22, 'p'], ['c', 42, 14, 16, 22, 'p']],
  testimonials: [['h', 6, 5, 26, 3], ['c', 6, 12, 52, 20, 'split'], ['t', 6, 35, 52, 1, 'bars']],
  founder: [['h', 6, 5, 20, 3], ['c', 6, 12, 52, 24, 'split']],
  statement: [['h', 22, 11, 20, 3], ['q', 10, 18, 44, 2.5], ['q', 14, 23, 36, 2.5], ['q', 20, 28, 24, 2.5]],
  values: [['h', 6, 6, 18, 3], ['t', 34, 6, 24, 1.5], ['c', 6, 16, 16, 18, 'num'], ['c', 24, 16, 16, 18, 'num'], ['c', 42, 16, 16, 18, 'num']],
  brands: [['h', 6, 5, 20, 3], ['d', 8, 16], ['d', 22, 16], ['d', 36, 16], ['d', 50, 16], ['d', 8, 28], ['d', 22, 28], ['d', 36, 28], ['d', 50, 28]],
  form: [['h', 6, 8, 18, 3], ['t', 6, 14, 16, 1.5], ['t', 6, 18, 14, 1.5], ['b', 32, 8, 26, 4, 'field'], ['b', 32, 15, 26, 4, 'field'], ['b', 32, 22, 26, 4, 'field'], ['b', 32, 30, 10, 4, 'solid']],
  siteFooter: [['t', 6, 12, 52, 1, 'faint'], ['h', 6, 18, 10, 3], ['t', 36, 18, 22, 1.5], ['t', 36, 23, 22, 1.5], ['d', 6, 30, 3], ['d', 12, 30, 3], ['d', 18, 30, 3]],
  footer: [['h', 16, 6, 32, 3], ['b', 8, 13, 12, 3.5], ['b', 22, 13, 12, 3.5, 'solid'], ['b', 36, 13, 12, 3.5], ['b', 50, 13, 8, 3.5], ['s', 6, 24, 10, 1.5], ['h', 6, 27, 24, 2.5], ['b', 6, 32, 20, 3.5, 'field'], ['b', 34, 32, 10, 3.5]],
  overview: [['c', 4, 6, 56, 30, 'white'], ['q', 10, 11, 40, 3], ['q', 10, 16, 28, 3], ['s', 10, 25, 8, 1.5], ['s', 22, 25, 8, 1.5], ['b', 44, 24, 10, 4]],
  band: [['p', 0, 4, 64, 32]],
  text: [['c', 4, 4, 56, 32, 'white'], ['h', 10, 10, 12, 2.5], ['t', 10, 15, 14, 1.2], ['q', 32, 10, 24, 2], ['q', 32, 14, 22, 2], ['t', 32, 20, 24, 1.2], ['t', 32, 23, 20, 1.2]],
  quote: [['q', 10, 13, 44, 3], ['q', 14, 19, 36, 3], ['q', 20, 25, 24, 3]],
  card: [['c', 4, 4, 56, 32, 'white'], ['p', 10, 9, 44, 22]],
  article: [['c', 4, 4, 56, 32, 'white'], ['s', 10, 10, 8, 1.5], ['q', 24, 9, 30, 2.5], ['t', 24, 15, 30, 1.2], ['t', 24, 18, 26, 1.2], ['s', 10, 25, 8, 1.5], ['p', 24, 24, 30, 9]],
}

const TONES = {
  p: '#ffd9c9',
  hot: '#ff5a1f',
  ink: '#1a1a1a',
  cream: '#f4ead9',
  white: '#ffffff',
}

export default function SectionSketch({ type }) {
  const marks = SKETCHES[type] ?? [['c', 8, 8, 48, 24, 'white']]
  return (
    <svg aria-hidden="true" className="sketch" viewBox="0 0 64 40">
      {marks.map((mark, i) => (
        <Mark key={i} mark={mark} />
      ))}
    </svg>
  )
}

function Mark({ mark }) {
  const [kind, x, y, w, h, tone] = mark
  switch (kind) {
    case 'p': {
      const fill = tone === 'ink' ? TONES.ink : tone === 'cream' ? TONES.cream : TONES.p
      const rotate = tone === 'tilt' ? `rotate(-12 ${x + w / 2} ${y + h / 2})` : tone === 'tilt2' ? `rotate(14 ${x + w / 2} ${y + h / 2})` : undefined
      return (
        <g transform={rotate}>
          <rect fill={fill} height={h} rx={tone?.startsWith('tilt') ? 2 : 0} width={w} x={x} y={y} />
          {tone === 'ink' || tone === 'cream' ? null : (
            <path d={`M${x} ${y + h} L${x + w * 0.45} ${y + h * 0.55} L${x + w * 0.7} ${y + h * 0.78} L${x + w} ${y + h * 0.45} V${y + h} Z`} fill="#ffb899" />
          )}
        </g>
      )
    }
    case 'c':
      return (
        <g>
          <rect
            fill={tone === 'white' ? '#ffffff' : '#ffffff'}
            height={h}
            rx="3"
            stroke={tone === 'white' ? 'rgb(0 0 0 / 8%)' : 'none'}
            width={w}
            x={x}
            y={y}
          />
          {tone === 'p' || tone === 'hot' ? (
            <>
              <rect fill={mark[6] === 'hot' ? TONES.hot : TONES.p} height={h * 0.58} rx="2" width={w - 3} x={x + 1.5} y={y + 1.5} />
              <rect fill="#2a2a2a" height="1.6" rx=".8" width={w * 0.55} x={x + 2} y={y + h * 0.72} />
              <rect fill="#cfcfcf" height="1.2" rx=".6" width={w * 0.7} x={x + 2} y={y + h * 0.84} />
            </>
          ) : null}
          {tone === 'split' ? (
            <>
              <rect fill={TONES.p} height={h - 4} rx="2" width={w * 0.34} x={x + 2} y={y + 2} />
              <rect fill="#2a2a2a" height="2" rx="1" width={w * 0.3} x={x + w * 0.42} y={y + 5} />
              <rect fill="#9a9a9a" height="1.4" rx=".7" width={w * 0.5} x={x + w * 0.42} y={y + 10} />
              <rect fill="#9a9a9a" height="1.4" rx=".7" width={w * 0.46} x={x + w * 0.42} y={y + 13} />
              <rect fill="#9a9a9a" height="1.4" rx=".7" width={w * 0.38} x={x + w * 0.42} y={y + 16} />
            </>
          ) : null}
          {tone === 'num' ? (
            <>
              <rect fill="#ffe9a8" height={h} rx="3" width={w} x={x} y={y} />
              <rect fill="#2a2a2a" height="3" rx="1" width="5" x={x + 2.5} y={y + 3} />
              <rect fill="#6a6a6a" height="1.3" rx=".6" width={w - 5} x={x + 2.5} y={y + h - 7} />
              <rect fill="#9a9a9a" height="1.2" rx=".6" width={w - 8} x={x + 2.5} y={y + h - 4} />
            </>
          ) : null}
        </g>
      )
    case 'h':
      return <rect fill={tone === 'white' ? '#ffffff' : '#1a1a1a'} height={h} rx={h / 2} width={w} x={x} y={y} />
    case 'q':
      return <rect fill={tone === 'white' ? '#ffffff' : '#555555'} height={h} rx={h / 2} width={w} x={x} y={y} />
    case 's':
      return <rect fill={tone === 'white' ? 'rgb(255 255 255 / 70%)' : '#a8a8a8'} height={h} rx={h / 2} width={w} x={x} y={y} />
    case 't':
      if (tone === 'bars') {
        return (
          <g>
            {Array.from({ length: 8 }, (_, i) => (
              <rect fill={i < 3 ? '#1a1a1a' : '#d0d0d0'} height="1.2" key={i} rx=".6" width={w / 8 - 1.2} x={x + (i * w) / 8} y={y} />
            ))}
          </g>
        )
      }
      return <rect fill={tone === 'faint' ? '#e2e2e2' : '#b8b8b8'} height={h} rx={h / 2} width={w} x={x} y={y} />
    case 'b':
      return tone === 'solid' ? (
        <rect fill="#1a1a1a" height={h} rx={h / 2} width={w} x={x} y={y} />
      ) : (
        <rect fill={tone === 'field' ? '#ffffff' : 'none'} height={h} rx={h / 2} stroke="#1a1a1a" strokeWidth=".7" width={w} x={x} y={y} />
      )
    case 'd':
      return <circle cx={x + 3} cy={y + 3} fill="#1a1a1a" opacity={w ? 1 : 0.85} r={w ?? 3.2} />
    default:
      return null
  }
}
