import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useGravityZone } from '@/hooks/useGravityZone'

import ProjectOverview from './ProjectOverview.jsx'
import ProjectProgress from './ProjectProgress.jsx'
import './StoryOverview.css'

/**
 * Figma 2955:12659 + 3934:8284 (Suryagarh) / 2719:16451 + 3980:8523
 * (Design dialogue article) — one card: title and meta above, the audio
 * progress strip below, no gap between them. The whole card is the audio
 * player's hover/click zone, not just the progress strip.
 *
 * `audio` is optional: without it useAudioPlayer still flips the transport,
 * so the controls read correctly until a narration file is wired in.
 */
export default function StoryOverview({ audio, meta, tags, title }) {
  const player = useAudioPlayer(audio)
  const zoneRef = useGravityZone(player.isPlaying ? 'Pause Audio' : 'Play Audio')

  return (
    <div className="storyOverview_group" onClick={player.toggle} ref={zoneRef}>
      <ProjectOverview
        isPlaying={player.isPlaying}
        meta={meta}
        onTogglePlay={player.toggle}
        tags={tags}
        title={title}
      />
      <ProjectProgress audioRef={player.audioRef} isPlaying={player.isPlaying} src={audio} />
    </div>
  )
}
