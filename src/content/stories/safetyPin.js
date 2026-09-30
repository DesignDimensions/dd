import paperTexture from '@/assets/dialogue/paper-texture.png'
import pinsPhoto from '@/assets/dialogue/safety-pins-photo.jpg'
import walterHunt from '@/assets/dialogue/walter-hunt-collage.png'
import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'

const BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/**
 * Figma 2719:16435 — the Design Dialogue article, a story rendered by
 * StoryPage like the project case studies.
 *
 * - No narration file exists for it, so the player runs without a source.
 * - The frame's print-advert block (2719:16507) sits inside a 1px-tall
 *   clipping frame and never renders in Figma; dropped.
 * - Figma closes on Contact alone; it closes on the full FooterZone
 *   instead, as Home does.
 * - The side labels read "Lorem Ipsum" in the frame; kept verbatim.
 */
export const SAFETY_PIN_STORY = {
  ground: 'article',
  // How the article shows up in search (lib/search.js): as a card.
  search: {
    title: 'The humble safety pin',
    subtitle: 'Design Dialogue · Aparna Kakrania',
    image: pinsPhoto,
    background: '#f3e9dc',
    keywords: [
      'safety pin',
      'Walter Hunt',
      'fibula',
      'Roman togas',
      'punk',
      'design dialogue',
      'article',
    ],
  },
  blocks: [
    { type: 'pinBanner' },
    {
      type: 'overview',
      title:
        'What links Roman togas, punk rockers, my mother and a debt of 15 USD in 1859? Only the greatest design of all time – the humble safety pin!',
      meta: [
        { label: 'Published', value: 'Dec 16, 2023' },
        { label: 'Words', value: 'Aparna Kakrania' },
      ],
      tags: ['Design Dialogue'],
    },
    // Figma 2719:16467
    {
      type: 'article',
      rows: [
        {
          label: 'Lorem Ipsum',
          content: [
            {
              type: 'lead',
              text: 'Based on a fibula - an ornamental clasp which was used by the Romans to hold up their togas, the modern safety pin was “invented” by genius inventor Walter Hunt in 1849.',
            },
            {
              type: 'body',
              text: 'By twisting a single measure of wire, coiled at the center and with a clasp on one end that shielded the wearer from getting hurt – Hunt managed to do many things all at once! In his own words in the patent application he said the pin achieved, “the perfect convenience of being inserted into the dress, without danger of bending, or wounding the fingers, which renders the pin equally adapted to either ornamental, common dress or nursery uses.”',
            },
          ],
        },
        {
          label: 'Lorem Ipsum',
          content: [
            {
              type: 'image',
              image: walterHunt,
              alt: 'Walter Hunt, 1796 – 1858: his portrait, his 1849 safety pin patent drawing, a safety pin, and the patent’s claim',
            },
          ],
        },
        {
          label: 'Lorem Ipsum',
          content: [
            {
              type: 'body',
              text: 'He sold his patent for 400 dollars and paid back his debt. But his incredible invention has had an amazing run. Along the way it has become ubiquitous in every country and culture – it’s a quick fix solution to fastening together whatever fabric needs to be fastened, it is the symbol of punk rock and rockers; it has held firm the diapers of a billion babies and the bibs of millions of runners and is an integral part of every survival kit in the world. Also, for over half a century, it has been my mother’s version of an American Express Card – she would never leave home without one in her bag!',
            },
          ],
        },
      ],
    },
    // Figma 2719:16491 — 840px at the 1440 frame
    { type: 'band', image: paperTexture, height: 'min(840px, 58.333vw)' },
    // Figma 2719:16492
    {
      type: 'article',
      rows: [
        {
          label: 'Lorem Ipsum',
          content: [
            {
              type: 'body',
              text: 'For all these reasons and more – a safety pin is one of my favouritest objects in the world. It can patch things up. It is tiny, but useful and sturdy. It can fasten and mend, both literally and symbolically, and can be easily hidden or carried. It has remained largely unchanged for over 170 years – because it’s hard to improve upon. The essential design is so spare and so elegant that it does exactly what it is supposed to do, in the most efficient way. Nothing extraneous.',
            },
            {
              type: 'body',
              text: 'And so for me– the safety pin epitomises the holy grail of design. Every part of the form fulfils an important function- the sharp edge allows the garment to be pierced, the rolled clasp allows for it to be bent and stretched, the single length of wire ensures the pin will not slip out of the garment and the safety clasp means that it can be safely used. What an amazing piece of design - one that means the difference between dignity and embarrassment and between grace and awkwardness!',
            },
          ],
        },
        {
          label: 'Lorem Ipsum',
          content: [{ type: 'collage', image: pinsPhoto }],
        },
        {
          label: 'Lorem Ipsum',
          content: [
            {
              type: 'body',
              text: 'I think we would all live in a more beautiful elegant world if everything in it had passed the safety pin design test. To have as much form as the function demands, to enable grace and beauty, while also being invisible. The thing is - every safety pin holds something together. By remaining unchanged and un-improvable for so long – the safety pin has also held on to time itself.',
            },
            {
              type: 'body',
              text: 'So the next time your shirt loses a button, or you pop a seam or you change your baby’s cloth diaper or you run a marathon – and you reach for a safety pin to tide you over - think of the humble object that makes it all possible. Viva la safety pin – design extraordinaire!',
            },
          ],
        },
      ],
    },
    // Figma 2719:18039 – 18049 — all three carry the bookmark glyph.
    {
      type: 'finishReading',
      eyebrow: 'Come here often?',
      heading: 'Finish what you started',
      cards: [
        {
          background: '#dcf6f8',
          body: BODY,
          eyebrow: 'Article',
          glyph: 'bookmark',
          image: storyAi,
          title: ['AI is not the designer,', 'you are!'],
        },
        {
          background: '#ff694f',
          body: BODY,
          eyebrow: 'Article',
          glyph: 'bookmark',
          image: storyGradients,
          title: ['Gradients are not ', 'dependable'],
        },
        {
          background: '#c79275',
          body: BODY,
          eyebrow: 'Article',
          glyph: 'bookmark',
          image: story3d,
          title: ['3D slaying the design', 'industry'],
        },
      ],
    },
    { type: 'footer' },
  ],
}
