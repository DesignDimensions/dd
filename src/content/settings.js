import instagram from '@/assets/forms/instagram.svg'
import linkedin from '@/assets/forms/linkedin.svg'
import mail from '@/assets/forms/mail.svg'
import whatsapp from '@/assets/forms/whatsapp.svg'

/**
 * Site-wide content — the CMS's global "settings": navigation, the studio's
 * details, the footer links and socials, and the two sections every page
 * closes on (FooterZone: Exploration + Contact).
 *
 * Where the mobile frame words something differently, `mobile` holds the
 * phone's version (see responsive()). Kept as the frames state them.
 */

/** Header menu. Figma gives the nav no destinations, so only the items
    that have a page are links. */
export const NAV_ITEMS = [
  { label: 'Work diary', to: '/work' },
  { label: 'Design dialogue', to: '/design-dialogue' },
  { label: 'About us', to: '/about' },
]

/** The third column of the header menu — the studio's mission, as About
    words it. */
export const MENU_BLURB =
  'At Design Dimensions, our mission is to provide meticulously tailored and conceptually fitting design solutions to our clients. We offer a comprehensive suite of services aimed at fortifying brands with clarity, elegance, and pride.'

/** Figma 2719:20415 / 2719:20416 — "Kailash ll" verbatim. */
export const STUDIO = {
  name: 'Design Dimensions',
  email: 'info@designdimensions.in',
  reach:
    'Let’s chat about your amazing ideas and projects directly, reach out to us',
  address:
    'M-283, Ground Floor, Block M, Greater Kailash ll, Greater Kailash, New Delhi-110048',
  phone: 'Ph: +91 96250 12486',
}

/** The footer's link grid (Contact and SiteFooter). Items without a page
    have no destination. */
export const FOOTER_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'Work diary', to: '/work' },
  { label: 'Design dialogue', to: '/design-dialogue' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Privacy policy', to: null },
]

/** Figma 2719:20460 – 20466. Only mail has a destination in the frames
    (the studio's address); the others wait on their profile URLs. */
export const SOCIALS = [
  { label: 'Instagram', icon: instagram, href: null },
  { label: 'Email', icon: mail, href: 'mailto:info@designdimensions.in' },
  { label: 'WhatsApp', icon: whatsapp, href: null },
  { label: 'LinkedIn', icon: linkedin, href: null },
]

/**
 * Figma 2714:8846 (desktop) / 2715:10895 (mobile). Tag fill states are
 * taken exactly from the frames — "Packaging design" and "Web design" are
 * the filled chips. Mobile drops "Corporate gifting", capitalises two
 * tags differently and reads "Search now".
 */
export const EXPLORATION = {
  heading: 'Let’s do a quick exploration!',
  tags: [
    { label: 'Packaging design', variant: 'filled' },
    { label: 'Identity design', variant: 'outline' },
    { label: 'Web design', variant: 'filled' },
    { label: 'Installation design', variant: 'outline' },
    { label: 'Communication design', variant: 'outline' },
    { label: 'Social media', variant: 'outline' },
    { label: 'Brand films', variant: 'outline' },
    { label: 'Corporate gifting', variant: 'outline' },
  ],
  cta: 'Search Now',
  mobile: {
    tags: [
      { label: 'Packaging design', variant: 'filled' },
      { label: 'Identity design', variant: 'outline' },
      { label: 'Web design', variant: 'filled' },
      { label: 'Installation design', variant: 'outline' },
      { label: 'Communication design', variant: 'outline' },
      { label: 'Social Media', variant: 'outline' },
      { label: 'Brand Films', variant: 'outline' },
    ],
    cta: 'Search now',
  },
}

/** The enquiry section. The mobile frame orders and words its interests
    differently, and puts the interests before the fields. */
export const CONTACT = {
  eyebrow: 'Feel free to connect!',
  heading: 'This could be a start of a new relation',
  fieldsLabel: 'Your Information',
  interestsLabel: 'Pick your interest',
  interests: [
    'Identity design',
    'Packaging design',
    'Web design',
    'Communication design',
    'Social media',
    'Brand film',
    'Corporate gifting',
    'Wedding cards',
  ],
  mobile: {
    heading: 'This could be a start of a new relation.',
    interestsLabel: 'Pick Your Interest',
    interests: [
      'Packaging design',
      'Identity design',
      'Web design',
      'Installation design',
      'Communication design',
      'Social Media',
      'Brand Films',
    ],
  },
}
