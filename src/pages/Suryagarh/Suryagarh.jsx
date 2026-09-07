import storyAudio from '@/assets/suryagarh/audio/story-1.mp3'
import gallery66 from '@/assets/suryagarh/gallery-66.jpg'
import gallery77 from '@/assets/suryagarh/gallery-77.jpg'
import gallerySuiteBedroom from '@/assets/suryagarh/gallery-suite-bedroom.jpg'
import grid44 from '@/assets/suryagarh/grid-44.jpg'
import grid59 from '@/assets/suryagarh/grid-59.jpg'
import imageFull from '@/assets/suryagarh/image-full.jpg'
import showcaseBand from '@/assets/suryagarh/showcase-band.jpg'
import Contact from '@/sections/Contact/Contact.jsx'
import Exploration from '@/sections/Exploration/Exploration.jsx'
import MoreProjects from '@/sections/suryagarh/MoreProjects/MoreProjects.jsx'
import ProjectBanner from '@/sections/suryagarh/ProjectBanner/ProjectBanner.jsx'
import ProjectOverview from '@/sections/suryagarh/ProjectOverview/ProjectOverview.jsx'
import ProjectProgress from '@/sections/suryagarh/ProjectProgress/ProjectProgress.jsx'
import ProjectTextBlock from '@/sections/suryagarh/ProjectTextBlock/ProjectTextBlock.jsx'
import QuoteBig from '@/sections/suryagarh/QuoteBig/QuoteBig.jsx'
import ShowcaseBand from '@/sections/suryagarh/ShowcaseBand/ShowcaseBand.jsx'

import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useGravityZone } from '@/hooks/useGravityZone'
import { useZoomable } from '@/hooks/useZoomable'

import './Suryagarh.css'

/**
 * Figma 2955:12615 — "DD/Work Diary/Blossom Home/Desktop", desktop only.
 *
 * The frame's own header (2955:12616) is a plain bar rather than the
 * floating pill built for Home/About, so it is dropped in favour of the
 * already-built <Header/>, same as every other page. Everything below it
 * is new to this page.
 *
 * Presentation follows Home/About exactly: the banner runs flush to the
 * viewport, everything below it is a white box on a #f0f0f0 ground with
 * shared --page-inset padding, --section-gap between boxes, and
 * --section-radius corners (MoreProjects keeps Figma's own 40px radius
 * as a deliberate exception — see MoreProjects.css).
 */
export default function Suryagarh() {
  const player = useAudioPlayer(storyAudio)
  const overviewZoneRef = useGravityZone(player.isPlaying ? 'Pause Audio' : 'Play Audio')

  // Figma 2955:12696 — GalleryTrio's top two rows, now living inside the
  // first ProjectTextBlock's card instead of their own section (see
  // ProjectTextBlock's `media` prop); its second full-width row
  // (galleryMg9724) was dropped rather than kept anywhere.
  const bedroomRef = useZoomable(gallerySuiteBedroom)
  const img66Ref = useZoomable(gallery66)
  const img77Ref = useZoomable(gallery77)

  // Figma 2955:12755 — ImageGrid's bottom row, now inside the last text
  // block's card; its top row (grid-33, grid-62) was dropped.
  const grid59Ref = useZoomable(grid59)
  const grid44Ref = useZoomable(grid44)

  return (
    <div className="suryagarh_page">
      <ProjectBanner />

      {/* Figma 2955:12659 + 3934:8284 — one card: quote/meta above, the
          progress strip below, no gap between them. The whole card is the
          audio player's hover/click zone, not just the progress strip. */}
      <div className="suryagarh_overviewGroup" onClick={player.toggle} ref={overviewZoneRef}>
        <ProjectOverview />
        <ProjectProgress audioRef={player.audioRef} isPlaying={player.isPlaying} src={storyAudio} />
      </div>
      <ShowcaseBand src={showcaseBand} />
      {/* Figma 2955:12679 */}
      <ProjectTextBlock
        media={
          <>
            <div className="projectTextBlock_mediaFull">
              <img
                alt=""
                className="projectTextBlock_mediaImage"
                ref={bedroomRef}
                src={gallerySuiteBedroom}
              />
            </div>
            <div className="projectTextBlock_mediaPair">
              <div className="projectTextBlock_mediaHalf" style={{ backgroundColor: '#f2f2f2' }}>
                <img alt="" className="projectTextBlock_mediaImage" ref={img66Ref} src={gallery66} />
              </div>
              <div className="projectTextBlock_mediaHalf" style={{ backgroundColor: '#cfcfcf' }}>
                <img alt="" className="projectTextBlock_mediaImage" ref={img77Ref} src={gallery77} />
              </div>
            </div>
          </>
        }
      >
        <p className="projectTextBlock_quote">
          Papad rarely announces itself. It arrives quietly, placed beside the meal as though it has always belonged there. Crisp, circular, dependable. It cracks under your fingers and disappears almost before you notice. No one debates it. No one asks for it by brand. It is simply assumed, familiar to the point of invisibility. And that invisibility was precisely what drew us in, because what we overlook most often is what we understand least.
        </p>
        <p className="projectTextBlock_paragraph">
          The makers came to us from Rajasthan, Bikaner, from landscapes shaped by spice routes that once carried more than flavour across desert miles. Papad itself has travelled centuries before reaching a dining table. It carries climate in its dryness, geography in its ingredients, and memory in its unmistakable crack. Yet as a category it had never truly been given a voice. It existed, but it did not express. We wanted to change that.
        </p>
      </ProjectTextBlock>
      <QuoteBig>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna.
      </QuoteBig>
      {/* Figma 2955:12708 */}
      <ProjectTextBlock showLeft>
        <p className="projectTextBlock_paragraph">
          The name came first. We called it Papadmalji. The name already held warmth, almost conversational, almost human. It felt less like a brand and more like someone you might know. Instead of treating it as a static mark, we imagined lineage. A family shaped by trade, spice, and desert towns. The turbans, the moustaches, the silhouettes were not decorative caricatures but subtle acknowledgments of Rajasthan’s mercantile past. Traders who once moved flavour across borders long before packaging did. The brand began to carry personality, not just product.
        </p>
        <p className="projectTextBlock_paragraph">
          But story alone was not enough. The deeper transformation came through form. In a category dominated by explanation, flavour names competing for attention and claims layered over clear plastic, we chose recognition over reading. Shape and colour began to lead. Each variant carried a distinct window cut, not merely to reveal the papad inside but to create immediate memory. A silhouette you could recognise from a distance. A colour that stayed with you longer than text ever could. The eye understood before the mind processed.
        </p>
        <p className="projectTextBlock_paragraph">
          The palette held its ground. Desert reds, turmeric yellows, chilli oranges, deep greens. We resisted dilution. Papadmalji is rooted in spice, and spice does not whisper. It carried mirch-masala not only in flavour but in spirit. This was never about making papad something it was not. It was about allowing it to be fully present, confident, visible and unapologetic.
        </p>

      </ProjectTextBlock>
      <ShowcaseBand  src={imageFull} />
      {/* Figma 2955:12738 */}
      <ProjectTextBlock
        media={
          <div className="projectTextBlock_mediaPair">
            <div className="projectTextBlock_mediaSquareHalf">
              <img alt="" className="projectTextBlock_mediaImage" ref={grid59Ref} src={grid59} />
            </div>
            <div className="projectTextBlock_mediaSquareHalf">
              <img alt="" className="projectTextBlock_mediaImage" ref={grid44Ref} src={grid44} />
            </div>
          </div>
        }
        spacious
      >
        <p className="projectTextBlock_paragraph">
          What began as play became presence. Papadmalji began to stand differently on the shelf. It no longer blended in. It asked to be seen. Its shapes became identifiers. Its colours became recall. Without raising its voice, it became unmistakable. And in that shift, something simple revealed itself. Nothing is inherently ordinary. Not a product, not a category, not an everyday ritual.
        </p>
      </ProjectTextBlock>
      <QuoteBig>
        Papadmalji was never just about packaging. It was about attention,
        about reframing the familiar until it could finally be seen.
      </QuoteBig>
      <ShowcaseBand flush src={imageFull} />
      <MoreProjects />
      {/* Footer zone: both transparent and full bleed, run together as one
          continuous band sitting on the page ground (see Suryagarh.css). */}
      <div className="suryagarh_footerZone">
        <Exploration variant="transparent" />
        <Contact variant="transparent" />
      </div>
    </div>
  )
}
