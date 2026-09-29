import { useEffect } from 'react'

/**
 * Opens the header search from the keyboard: ⌘K / Ctrl+K anywhere, or
 * "/" when the reader isn't already typing into something.
 */
export function useSearchShortcut(open) {
  useEffect(() => {
    function handleKeyDown(event) {
      const typing = event.target.closest?.(
        'input, textarea, select, [contenteditable="true"]',
      )
      const commandK =
        event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)
      if (commandK || (event.key === '/' && !typing)) {
        event.preventDefault()
        open()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])
}
