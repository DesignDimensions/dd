import building from '@/assets/forms/building.jpg'

/**
 * Figma 2719:21185 — Careers, the same template as Contact us. The
 * message box's label and placeholder are Figma's placeholders ("Lorem
 * Ipsum", and Contact's example text); kept verbatim, as is "Enter you
 * phone number".
 */
export const CAREERS_PAGE = {
  ground: 'gradient',
  // How the page shows up in search (lib/search.js): as a card.
  search: {
    title: 'Careers',
    subtitle: 'Page · Join our team',
    image: building,
    background: 'rgb(255, 234, 178)',
    keywords: ['jobs', 'hiring', 'join', 'resume', 'work with us'],
  },
  sections: [
    {
      type: 'formHero',
      backdrop: 'building',
      eyebrow: 'Careers',
      image: building,
      lines: ['Embark on a new', 'journey'],
    },
    {
      type: 'form',
      heading: 'Join our team',
      label: 'Job application',
      after: { label: 'Learn more about us', to: '/about' },
      fields: [
        { label: 'Name', name: 'name', placeholder: 'Enter your full name' },
        {
          label: 'Email Address',
          name: 'email',
          placeholder: 'Enter your email address',
          type: 'email',
        },
        {
          label: 'Phone Number',
          name: 'phone',
          placeholder: 'Enter you phone number',
          type: 'tel',
        },
        {
          kind: 'links',
          label: 'Your Portfolio/Work Samples(Optional)',
          ariaLabel: 'Portfolio link',
          name: 'portfolio',
          placeholder: 'Type the link',
          addLabel: 'Add More +',
        },
        {
          label: 'Website link',
          name: 'website',
          placeholder: 'Type the link',
          type: 'url',
        },
        { kind: 'file', label: 'Attach Resume', name: 'resume' },
        {
          label: 'Lorem Ipsum',
          multiline: true,
          name: 'message',
          placeholder: 'E.g. We’d like to rebrand and improve our website',
        },
      ],
    },
    { type: 'siteFooter' },
  ],
}
