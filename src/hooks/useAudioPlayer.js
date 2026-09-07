import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Minimal play/pause/ended state machine around an <audio> element,
 * shared between whatever renders the transport UI (ProjectProgress) and
 * whatever owns the click-to-toggle zone around it (which may be a
 * larger wrapper than the transport itself).
 */
export function useAudioPlayer(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    function handleEnded() {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !src) {
      // No source yet — still flip the transport so the tag/icon read
      // correctly once a real file is wired in.
      setIsPlaying((playing) => !playing)
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      const playback = audio.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying, src])

  return { audioRef, isPlaying, toggle }
}
