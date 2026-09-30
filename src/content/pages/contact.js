import ocean from '@/assets/forms/ocean.jpg'

/**
 * Figma 2719:20388 — Contact us: a flush hero, the form as a white card
 * on the page ground, then the footer band. Placeholders are verbatim,
 * "Enter you phone number" included.
 */
export const CONTACT_PAGE = {
  ground: 'gradient',
  // How the page shows up in search (lib/search.js): as a card.
  search: {
    title: 'Contact us',
    subtitle: 'Page · Get in touch',
    image: ocean,
    background: 'rgb(255, 198, 201)',
    keywords: [
      'contact',
      'email',
      'phone',
      'address',
      'enquiry',
      'get in touch',
    ],
  },
  sections: [
    {
      type: 'formHero',
      backdrop: 'ocean',
      eyebrow: 'Get in touch',
      image: ocean,
      lines: ['This could be a start', 'to a new relation!'],
    },
    {
      type: 'form',
      heading: 'Connect with us',
      intro:
        "We're just one click away to help you take your brand or product from great to incredible. Fill in the form to share more details about your project. Or drop in for quick chai and chat. Either way, we’d love to talk.",
      label: 'Contact',
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
          label: 'What can we help you with?',
          multiline: true,
          name: 'message',
          placeholder: 'E.g. We’d like to rebrand and improve our website',
        },
      ],
    },
    { type: 'siteFooter' },
  ],
}
