import { useEffect, useRef } from 'react'

import { registerGravityZone } from '@/components/GravityCursor/gravityZoneRegistry'

/**
 * Marks an element as a "gravity zone" — while the pointer is over it,
 * <GravityCursor/> shows `label` and follows the cursor. `label` may
 * change across renders (e.g. "Play Audio" → "Pause Audio"); the latest
 * value is read on every tick, so no re-registration is needed for that.
 *
 * Returns a ref to attach to the hoverable element.
 */
export function useGravityZone(label) {
  const ref = useRef(null)
  const labelRef = useRef(label)

  useEffect(() => {
    labelRef.current = label
  }, [label])

  useEffect(() => {
    return registerGravityZone(ref.current, () => labelRef.current)
  }, [])

  return ref
}
