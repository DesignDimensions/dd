import { useEffect, useRef } from 'react'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'

import './ProjectProgress.css'

/**
 * Figma 3934:8284 — a pause control beside a track. Purely presentational:
 * play/pause state and the click-to-toggle zone live one level up (see
 * Suryagarh.jsx / useAudioPlayer) because the hover/click zone for this
 * transport spans the whole merged overview card, not just this strip.
 *
 * The fill is driven by a requestAnimationFrame loop reading
 * `audio.currentTime` directly onto the DOM (a ref, not React state) so
 * it moves every frame instead of only on `timeupdate` — that's what
 * makes it read as smooth instead of stepping.
 */
export default function ProjectProgress({ audioRef, isPlaying, src }) {
  const fillRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) return undefined

    function tick() {
      const fill = fillRef.current
      if (fill && audio.duration) {
        fill.style.width = `${(audio.currentTime / audio.duration) * 100}%`
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [audioRef, isPlaying])

  useEffect(() => {
    // Paused mid-track freezes the fill where it is; paused because the
    // track actually ended resets it, so the next play starts from 0.
    if (isPlaying || !fillRef.current || !audioRef.current?.ended) return
    fillRef.current.style.width = '0%'
  }, [isPlaying, audioRef])

  return (
    <section className="projectProgress_section">
      {src ? <audio preload="metadata" ref={audioRef} src={src} /> : null}
      <div className="projectProgress_iconButton">
        <ArrowCircle glyph={isPlaying ? 'pause' : 'play'} />
      </div>
      <div className="projectProgress_track">
        <div className="projectProgress_fill" ref={fillRef} />
      </div>
    </section>
  )
}
