import { useEffect, useState } from 'react'

import './FigmaOverlay.css'

/**
 * Dev-only pixel checker.
 *
 * Export the Figma frame at 1x as a PNG into `public/figma/`, then lay it
 * over the running page to confirm the build matches the design rather
 * than merely looking like it.
 *
 * Usage — mount once in Layout.jsx while comparing:
 *   {import.meta.env.DEV && <FigmaOverlay src="/figma/home.png" />}
 *
 * Shortcuts:  O toggles the overlay · [ / ] change opacity · D toggles difference blend
 */
export default function FigmaOverlay({ src, width }) {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState(0.5)
  const [difference, setDifference] = useState(false)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if (typing) return

      switch (event.key.toLowerCase()) {
        case 'o':
          setVisible((current) => !current)
          break
        case 'd':
          setDifference((current) => !current)
          break
        case '[':
          setOpacity((current) =>
            Math.max(0, Number((current - 0.1).toFixed(1))),
          )
          break
        case ']':
          setOpacity((current) =>
            Math.min(1, Number((current + 0.1).toFixed(1))),
          )
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!visible) return null

  return (
    <img
      alt=""
      aria-hidden="true"
      className={cn('figmaOverlay_overlay', difference && 'figmaOverlay_difference')}
      src={src}
      style={{ opacity, width }}
    />
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
