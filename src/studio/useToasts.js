import { useCallback, useRef, useState } from 'react'

/**
 * Small notes at the bottom of the screen — "Removed the card · Undo" —
 * that go away on their own after a few seconds.
 */
export function useToasts() {
  const [toasts, setToasts] = useState([])
  const id = useRef(0)

  const dismiss = useCallback(
    (key) => setToasts((list) => list.filter((t) => t.key !== key)),
    [],
  )

  const toast = useCallback(
    (message, { action, tone = 'plain', ms = 4500 } = {}) => {
      const key = ++id.current
      setToasts((list) => [...list.slice(-2), { key, message, action, tone }])
      setTimeout(() => dismiss(key), ms)
    },
    [dismiss],
  )

  return { toasts, toast, dismiss }
}
