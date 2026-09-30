import heroBg from '@/assets/about/hero-bg.png'
import founder from '@/assets/about/founder.jpg'
import brand01 from '@/assets/about/brand-01.png'
import brand02 from '@/assets/about/brand-02.png'
import brand03 from '@/assets/about/brand-03.png'
import brand04 from '@/assets/about/brand-04.png'
import brand05 from '@/assets/about/brand-05.png'
import brand06 from '@/assets/about/brand-06.png'
import brand07 from '@/assets/about/brand-07.png'
import brand08 from '@/assets/about/brand-08.png'
import brand09 from '@/assets/about/brand-09.png'
import brand10 from '@/assets/about/brand-10.png'
import brand11 from '@/assets/about/brand-11.png'
import brand12 from '@/assets/about/brand-12.png'
import { FOOTER } from '@/content/shared'

/** Figma 7962:21344 — Figma names each tile (Suryagarh, Godawan, White
    Rhino and so on) but renders it as an image with no label, so the
    names are carried as alt text only. */
const LOGOS = [
  { src: brand01, name: 'Logo variation' },
  { src: brand02, name: 'Logo variation' },
  { src: brand03, name: 'Catch' },
  { src: brand04, name: 'White Rhino' },
  { src: brand05, name: 'Godawan' },
  { src: brand06, name: 'Le Marche' },
  { src: brand07, name: 'San Lorenzo' },
  { src: brand08, name: 'Snack Factory' },
  { src: brand09, name: 'CAB' },
  { src: brand10, name: 'Bhujialalji' },
  { src: brand11, name: 'Suryagarh' },
  { src: brand12, name: 'Kachori Story' },
]

/**
 * Figma 7962:21156 — About us.
 */
export const ABOUT_PAGE = {
  ground: 'gradient',
  // How the page shows up in search (lib/search.js): as a card.
  search: {
    title: 'About us',
    subtitle: 'Page',
    image: heroBg,
    background: 'rgb(239, 221, 175)',
    keywords: [
      'founder',
      'Aparna Kakrania',
      'mission',
      'values',
      'philosophy',
      'brands',
      'studio',
    ],
  },
  sections: [
    {
      type: 'aboutHero',
      image: heroBg,
      label: 'Creating Design, weaving craft',
    },
    {
      type: 'aboutIntro',
      heading: 'About Us',
      intro:
        'Design, design, design and all things craft describe us the best.',
    },
    {
      type: 'founder',
      eyebrow: 'Lorem Ipsum',
      heading: 'Meet the founder',
      image: founder,
      role: 'Founder',
      name: 'Aparna Kakrania',
      bio: 'Growing up in eastern India and studying in the west, I developed a deep appreciation for our diverse cultures and crafts. At Maharani Gayatri Devi Girls School in Jaipur, my passion for vernacular design ignited. After earning a Bachelor’s in English Literature from Delhi University and studying graphic design at South Delhi Polytechnic, I launched Design Dimensions in 1997.',
    },
    {
      type: 'statement',
      heading: 'Our Mission',
      body: 'At Design Dimensions, our mission is to provide meticulously tailored and conceptually fitting design solutions to our clients. We offer a comprehensive suite of services aimed at fortifying brands with clarity, elegance, and pride.',
    },
    // Figma 7962:21256
    {
      type: 'values',
      heading: 'Our values',
      lede: 'We specializes in crafting bespoke design solutions that blend cultural richness with innovative creativity, aiming to fortify brands with impactful visual narratives.',
      columns: [
        {
          title: 'Creativity and Innovation',
          body: 'We continuously innovate to deliver unique and compelling design solutions that resonate with our clients’ audiences.',
        },
        {
          title: 'Cultural Appreciation',
          body: 'We celebrate and draw inspiration from diverse cultural traditions and crafts, integrating them into our design work to create authentic brand experiences.',
        },
        {
          title: 'Client-Centric Excellence',
          body: 'We prioritize understanding and exceeding our clients’ expectations, fostering strong partnerships built on trust, transparency, and exceptional service.',
        },
      ],
    },
    // Figma 7962:21300
    {
      type: 'values',
      heading: 'Design Philosophy',
      lede: 'At Design Dimensions, our design philosophy revolves around delivering perfection, clarity, and precision in every project, ensuring that our bold and beautiful designs empower and inspire.',
      columns: [
        {
          title: 'Refinement',
          body: 'Perfecting details with meticulous attention to achieve high-quality results.',
        },
        {
          title: 'Coherence',
          body: 'Ensuring unity and clarity across all design elements for effective communication.',
        },
        {
          title: 'Innovation',
          body: 'Embracing creativity and pushing boundaries to deliver fresh and impactful solutions.',
        },
      ],
    },
    {
      type: 'brands',
      eyebrow: 'Our Association',
      heading: 'Brands love us',
      logos: LOGOS,
    },
    FOOTER,
  ],
}
