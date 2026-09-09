import { useEffect, useRef, useState } from 'react'

import ArrowCircle from '@/components/ui/ArrowCircle/ArrowCircle.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ProjectOverview.css'

/** Figma 2955:12671 – 12673 */
const TAGS = ['Branding', 'Packaging']

/**
 * Figma 2955:12659 — pull quote plus the client/project/tags meta row.
 *
 * The play button drives the same transport as the progress strip below
 * it — state lives one level up (Suryagarh.jsx / useAudioPlayer) because
 * the whole merged card is also a click-to-toggle zone. Both buttons
 * therefore stop propagation: without it the play button would toggle
 * twice and share would start playback on the way out.
 *
 * Share hands the page URL to the native share sheet where there is one
 * (mobile, mostly) and falls back to copying it to the clipboard.
 */
export default function ProjectOverview({ isPlaying = false, onTogglePlay }) {
  const [copied, setCopied] = useState(false)
  const copiedTimerRef = useRef(null)

  useEffect(() => () => clearTimeout(copiedTimerRef.current), [])

  function handlePlay(event) {
    event.stopPropagation()
    onTogglePlay?.()
  }

  async function handleShare(event) {
    event.stopPropagation()
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url })
        return
      } catch (error) {
        // Dismissing the sheet is not a failure — only fall through to
        // the clipboard when the share itself could not happen.
        if (error?.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context, permission denied):
      // nothing useful left to try, so the UI stays as it was.
    }
  }

  return (
    <section className="projectOverview_section">
      <div className="projectOverview_quoteRow">
        <p className="projectOverview_quote">
          Pappadmalji : Reframing the Familiar
        </p>
      </div>

      <div className="projectOverview_meta">
        <div className="projectOverview_metaLeft">
          <div className="projectOverview_textStack">
            <p className="projectOverview_label">Client</p>
            <p className="projectOverview_heading">Pappadmalji</p>
          </div>
          <div className="projectOverview_textStack">
            <p className="projectOverview_label">Project</p>
            <p className="projectOverview_heading">Branding & Packaging</p>
          </div>
        </div>

        <div className="projectOverview_spacer" />

        <div className="projectOverview_metaRight">
          {TAGS.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          <button
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            aria-pressed={isPlaying}
            className="projectOverview_iconButton"
            onClick={handlePlay}
            type="button"
          >
            <ArrowCircle glyph={isPlaying ? 'pause' : 'play'} />
          </button>
          <button
            aria-label={copied ? 'Link copied' : 'Share'}
            className="projectOverview_iconButton"
            data-flash={copied ? 'Link copied' : undefined}
            onClick={handleShare}
            type="button"
          >
            <ArrowCircle glyph="share" />
          </button>
        </div>
      </div>
    </section>
  )
}
