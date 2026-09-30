import storyAudio from '@/assets/suryagarh/audio/story-1.mp3'
import gallery66 from '@/assets/suryagarh/gallery-66.jpg'
import gallery77 from '@/assets/suryagarh/gallery-77.jpg'
import gallerySuiteBedroom from '@/assets/suryagarh/gallery-suite-bedroom.jpg'
import grid44 from '@/assets/suryagarh/grid-44.jpg'
import grid59 from '@/assets/suryagarh/grid-59.jpg'
import heroBanner from '@/assets/suryagarh/hero-banner.png'
import imageFull from '@/assets/suryagarh/image-full.jpg'
import showcaseBand from '@/assets/suryagarh/showcase-band.jpg'

/**
 * Figma 2955:12615 — the Suryagarh case study, the one project written
 * out in full (the others still carry the template's placeholder copy;
 * see projectStories.js). A story: blocks rendered by StoryPage.
 *
 * Figma 2955:12696's gallery lives in the first text card (its second
 * full-width row was dropped), and 2955:12755's bottom row in the last
 * (its top row was dropped).
 */
export const SURYAGARH_STORY = {
  ground: '#b0c3b4',
  blocks: [
    { type: 'banner', image: heroBanner },
    {
      type: 'overview',
      title: 'Pappadmalji : Reframing the Familiar',
      meta: [
        { label: 'Client', value: 'Pappadmalji' },
        { label: 'Project', value: 'Branding & Packaging' },
      ],
      tags: ['Branding', 'Packaging'],
      audio: storyAudio,
    },
    { type: 'band', image: showcaseBand },
    // Figma 2955:12679
    {
      type: 'text',
      body: [
        {
          style: 'quote',
          text: 'Papad rarely announces itself. It arrives quietly, placed beside the meal as though it has always belonged there. Crisp, circular, dependable. It cracks under your fingers and disappears almost before you notice. No one debates it. No one asks for it by brand. It is simply assumed, familiar to the point of invisibility. And that invisibility was precisely what drew us in, because what we overlook most often is what we understand least.',
        },
        {
          style: 'paragraph',
          text: 'The makers came to us from Rajasthan, Bikaner, from landscapes shaped by spice routes that once carried more than flavour across desert miles. Papad itself has travelled centuries before reaching a dining table. It carries climate in its dryness, geography in its ingredients, and memory in its unmistakable crack. Yet as a category it had never truly been given a voice. It existed, but it did not express. We wanted to change that.',
        },
      ],
      media: [
        { layout: 'full', image: gallerySuiteBedroom },
        {
          layout: 'pair',
          items: [
            { image: gallery66, background: '#f2f2f2' },
            { image: gallery77, background: '#cfcfcf' },
          ],
        },
      ],
    },
    {
      type: 'quote',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    // Figma 2955:12708
    {
      type: 'text',
      title: 'A name with a memory',
      body: [
        {
          style: 'paragraph',
          text: 'The name came first. We called it Papadmalji. The name already held warmth, almost conversational, almost human. It felt less like a brand and more like someone you might know. Instead of treating it as a static mark, we imagined lineage. A family shaped by trade, spice, and desert towns. The turbans, the moustaches, the silhouettes were not decorative caricatures but subtle acknowledgments of Rajasthan’s mercantile past. Traders who once moved flavour across borders long before packaging did. The brand began to carry personality, not just product.',
        },
        {
          style: 'paragraph',
          text: 'But story alone was not enough. The deeper transformation came through form. In a category dominated by explanation, flavour names competing for attention and claims layered over clear plastic, we chose recognition over reading. Shape and colour began to lead. Each variant carried a distinct window cut, not merely to reveal the papad inside but to create immediate memory. A silhouette you could recognise from a distance. A colour that stayed with you longer than text ever could. The eye understood before the mind processed.',
        },
        {
          style: 'paragraph',
          text: 'The palette held its ground. Desert reds, turmeric yellows, chilli oranges, deep greens. We resisted dilution. Papadmalji is rooted in spice, and spice does not whisper. It carried mirch-masala not only in flavour but in spirit. This was never about making papad something it was not. It was about allowing it to be fully present, confident, visible and unapologetic.',
        },
      ],
    },
    { type: 'band', image: imageFull },
    // Figma 2955:12738
    {
      type: 'text',
      spacious: true,
      body: [
        {
          style: 'paragraph',
          text: 'What began as play became presence. Papadmalji began to stand differently on the shelf. It no longer blended in. It asked to be seen. Its shapes became identifiers. Its colours became recall. Without raising its voice, it became unmistakable. And in that shift, something simple revealed itself. Nothing is inherently ordinary. Not a product, not a category, not an everyday ritual.',
        },
      ],
      media: [
        { layout: 'squares', items: [{ image: grid59 }, { image: grid44 }] },
      ],
    },
    {
      type: 'quote',
      text: 'Papadmalji was never just about packaging. It was about attention, about reframing the familiar until it could finally be seen.',
    },
    { type: 'band', image: imageFull },
    { type: 'moreProjects', current: 'suryagarh' },
    { type: 'footer' },
  ],
}
