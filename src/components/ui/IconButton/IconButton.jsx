import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'

import './IconButton.css'

/**
 * Figma layer "Icon button" — 40px on desktop, 32px on mobile.
 * Hover fills the circle and inverts the glyph.
 */
export default function IconButton({ size = 40, glyph = 'arrow' }) {
  return (
    <div className="iconButton_iconButton" style={{ width: size, height: size }}>
      <ArrowCircle glyph={glyph} size={size} />
    </div>
  )
}
