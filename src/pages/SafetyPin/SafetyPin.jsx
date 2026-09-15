import paperTexture from '@/assets/dialogue/paper-texture.png'
import pinsPhoto from '@/assets/dialogue/safety-pins-photo.jpg'
import walterHunt from '@/assets/dialogue/walter-hunt-collage.png'
import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import Contact from '@/sections/Contact/Contact.jsx'
import ArticleBanner from '@/sections/dialogue/ArticleBanner/ArticleBanner.jsx'
import ArticleBlock, { ArticleRow } from '@/sections/dialogue/ArticleBlock/ArticleBlock.jsx'
import FinishReading from '@/sections/dialogue/FinishReading/FinishReading.jsx'
import ShowcaseBand from '@/sections/ShowcaseBand/ShowcaseBand.jsx'
import StoryOverview from '@/sections/StoryOverview/StoryOverview.jsx'

import { useZoomable } from '@/hooks/useZoomable'

import './SafetyPin.css'

/** Figma 2719:18039 – 18049 — all three carry the bookmark glyph. */
const READING = [
  {
    background: '#dcf6f8',
    glyph: 'bookmark',
    image: storyAi,
    title: ['AI is not the designer,', 'you are!'],
  },
  {
    background: '#ff694f',
    glyph: 'bookmark',
    image: storyGradients,
    title: ['Gradients are not ', 'dependable'],
  },
  {
    background: '#c79275',
    glyph: 'bookmark',
    image: story3d,
    title: ['3D slaying the design', 'industry'],
  },
]

/**
 * Figma 2719:16435 — "DD/Design Dialogue/Open Page/Desktop", desktop only.
 *
 * The article counterpart of the Suryagarh project page, built from the
 * same parts: a flush banner, the title/meta/audio card, white text cards
 * with a full-bleed band tucked between them, the reading rail, Contact.
 *
 * - No narration file exists for this article, so the player runs without
 *   a source (see StoryOverview).
 * - The frame's print-advert block (2719:16507) sits inside a 1px-tall
 *   clipping frame and never renders in Figma; dropped.
 * - Figma closes this page on Contact alone, without Exploration.
 * - The side labels read "Lorem Ipsum" in the frame; kept verbatim.
 */
export default function SafetyPin() {
  const collageRef = useZoomable(walterHunt)
  const photoRef = useZoomable(pinsPhoto)

  return (
    <div className="safetyPin_page">
      <ArticleBanner />
      <StoryOverview
        meta={[
          { label: 'Published', value: 'Dec 16, 2023' },
          { label: 'Words', value: 'Aparna Kakrania' },
        ]}
        tags={['Design Dialogue']}
        title="What links Roman togas, punk rockers, my mother and a debt of 15 USD in 1859? Only the greatest design of all time – the humble safety pin!"
      />

      {/* Figma 2719:16467 */}
      <ArticleBlock>
        <ArticleRow label="Lorem Ipsum">
          <p className="articleBlock_lead">
            Based on a fibula - an ornamental clasp which was used by the Romans to hold up their togas, the modern safety pin was “invented” by genius inventor Walter Hunt in 1849.
          </p>
          <p className="articleBlock_body">
            By twisting a single measure of wire, coiled at the center and with a clasp on one end that shielded the wearer from getting hurt – Hunt managed to do many things all at once! In his own words in the patent application he said the pin achieved, “the perfect convenience of being inserted into the dress, without danger of bending, or wounding the fingers, which renders the pin equally adapted to either ornamental, common dress or nursery uses.”
          </p>
        </ArticleRow>
        <ArticleRow label="Lorem Ipsum">
          <img
            alt="Walter Hunt, 1796 – 1858: his portrait, his 1849 safety pin patent drawing, a safety pin, and the patent’s claim"
            className="articleBlock_image"
            ref={collageRef}
            src={walterHunt}
          />
        </ArticleRow>
        <ArticleRow label="Lorem Ipsum">
          <p className="articleBlock_body">
            He sold his patent for 400 dollars and paid back his debt. But his incredible invention has had an amazing run. Along the way it has become ubiquitous in every country and culture – it’s a quick fix solution to fastening together whatever fabric needs to be fastened, it is the symbol of punk rock and rockers; it has held firm the diapers of a billion babies and the bibs of millions of runners and is an integral part of every survival kit in the world. Also, for over half a century, it has been my mother’s version of an American Express Card – she would never leave home without one in her bag!
          </p>
        </ArticleRow>
      </ArticleBlock>

      {/* Figma 2719:16491 — 840px at the 1440 frame */}
      <ShowcaseBand height="min(840px, 58.333vw)" src={paperTexture} />

      {/* Figma 2719:16492 */}
      <ArticleBlock>
        <ArticleRow label="Lorem Ipsum">
          <p className="articleBlock_body">
            For all these reasons and more – a safety pin is one of my favouritest objects in the world. It can patch things up. It is tiny, but useful and sturdy. It can fasten and mend, both literally and symbolically, and can be easily hidden or carried. It has remained largely unchanged for over 170 years – because it’s hard to improve upon. The essential design is so spare and so elegant that it does exactly what it is supposed to do, in the most efficient way. Nothing extraneous.
          </p>
          <p className="articleBlock_body">
            And so for me– the safety pin epitomises the holy grail of design. Every part of the form fulfils an important function- the sharp edge allows the garment to be pierced, the rolled clasp allows for it to be bent and stretched, the single length of wire ensures the pin will not slip out of the garment and the safety clasp means that it can be safely used. What an amazing piece of design - one that means the difference between dignity and embarrassment and between grace and awkwardness!
          </p>
        </ArticleRow>
        <ArticleRow label="Lorem Ipsum">
          <div className="articleBlock_collage">
            <img alt="" className="articleBlock_collagePhoto" ref={photoRef} src={pinsPhoto} />
            <img alt="" className="articleBlock_collageEcho" src={pinsPhoto} />
          </div>
        </ArticleRow>
        <ArticleRow label="Lorem Ipsum">
          <p className="articleBlock_body">
            I think we would all live in a more beautiful elegant world if everything in it had passed the safety pin design test. To have as much form as the function demands, to enable grace and beauty, while also being invisible. The thing is - every safety pin holds something together. By remaining unchanged and un-improvable for so long – the safety pin has also held on to time itself.
          </p>
          <p className="articleBlock_body">
            So the next time your shirt loses a button, or you pop a seam or you change your baby’s cloth diaper or you run a marathon – and you reach for a safety pin to tide you over - think of the humble object that makes it all possible. Viva la safety pin – design extraordinaire!
          </p>
        </ArticleRow>
      </ArticleBlock>

      <FinishReading cards={READING} />
      <Contact variant="transparent" />
    </div>
  )
}
