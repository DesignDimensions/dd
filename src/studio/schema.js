/**
 * What can be edited, and how. Every section a page can have and every
 * block a story can have is listed here with its fields; the inspector
 * builds its forms from these.
 *
 * Field types: text · textarea · lines (one per line) · image · audio ·
 * color · number · toggle · select · tags · link · project · group · list.
 * `when(item)` shows a field only when it applies; `mobile` lists the
 * fields the phone layout can word differently.
 */

const GLYPHS = [
  { value: 'arrow', label: 'Arrow' },
  { value: 'bookmark', label: 'Bookmark' },
]

/** A card in a carousel, rail or grid. */
const CARD_FIELDS = [
  { key: 'image', label: 'Picture', type: 'image' },
  {
    key: 'title',
    label: 'Title',
    type: 'lines',
    hint: 'Each line is a line on the card.',
  },
  {
    key: 'eyebrow',
    label: 'Small label',
    type: 'text',
    placeholder: 'Article',
  },
  { key: 'body', label: 'Short description', type: 'textarea' },
  { key: 'background', label: 'Card colour', type: 'color' },
  {
    key: 'glyph',
    label: 'Button icon',
    type: 'select',
    options: GLYPHS,
    optional: true,
  },
]

const cardTitle = (card) =>
  (Array.isArray(card.title) ? card.title.join(' ') : card.title) || 'Card'

const LOREM = 'Write something here.'

// ---------------------------------------------------------------------------
// Page sections
// ---------------------------------------------------------------------------

export const SECTIONS = {
  homeHero: {
    label: 'Home banner',
    about: 'The big picture at the top of Home.',
    fields: [{ key: 'image', label: 'Picture', type: 'image' }],
    template: () => ({}),
  },
  aboutHero: {
    label: 'Banner with a line',
    about: 'A dark banner picture with one line of text over it.',
    fields: [
      { key: 'image', label: 'Picture', type: 'image' },
      { key: 'label', label: 'Line over the picture', type: 'text' },
    ],
    template: () => ({ label: 'A line about us' }),
  },
  formHero: {
    label: 'Form banner',
    about: 'Picture banner with a small label and a two-line heading.',
    fields: [
      { key: 'image', label: 'Picture', type: 'image' },
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      {
        key: 'lines',
        label: 'Heading',
        type: 'lines',
        hint: 'Each line is a line in the banner.',
      },
      {
        key: 'backdrop',
        label: 'Picture treatment',
        type: 'select',
        options: [
          { value: 'building', label: 'Building — warm, cropped right' },
          { value: 'ocean', label: 'Ocean — cool, full width' },
        ],
      },
    ],
    template: () => ({
      eyebrow: 'Label',
      lines: ['A heading', 'on two lines'],
      backdrop: 'ocean',
    }),
  },
  headerBand: {
    label: 'Space for the header',
    about:
      'Empty room at the top of pages without a banner, for the floating menu.',
    fields: [],
    template: () => ({}),
  },
  projectIntro: {
    label: 'Project intro',
    about: 'A name beside a paragraph, with a tag button.',
    fields: [
      { key: 'heading', label: 'Name', type: 'text' },
      { key: 'intro', label: 'Paragraph', type: 'textarea' },
      { key: 'tag', label: 'Tag', type: 'text' },
    ],
    mobile: ['tag'],
    template: () => ({
      heading: 'Project name',
      intro: LOREM,
      tag: 'Packaging design',
    }),
  },
  aboutIntro: {
    label: 'Intro',
    about: 'A heading beside a paragraph.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Paragraph', type: 'textarea' },
    ],
    template: () => ({ heading: 'Heading', intro: LOREM }),
  },
  projectGrid: {
    label: 'Work diary grid',
    about: 'Every project as cards, in the order set under Projects.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'filterLabel', label: 'Filter button', type: 'text' },
      {
        key: 'limit',
        label: 'How many projects',
        type: 'number',
        optional: true,
        hint: 'Leave empty to show them all.',
      },
      {
        key: 'cta',
        label: 'Button',
        type: 'text',
        optional: true,
        hint: 'Leave empty for no button.',
      },
      {
        key: 'ctaTo',
        label: 'Button goes to',
        type: 'link',
        when: (s) => Boolean(s.cta),
      },
    ],
    mobile: ['filterLabel', 'cta'],
    template: () => ({
      eyebrow: 'Our pride',
      heading: 'Work diary',
      filterLabel: 'Newest',
      cta: null,
    }),
  },
  articleGrid: {
    label: 'Articles grid',
    about: 'A featured article across the top, then article cards.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
      {
        key: 'featured',
        label: 'Featured article',
        type: 'group',
        fields: [
          { key: 'image', label: 'Picture', type: 'image' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'eyebrow', label: 'Small label', type: 'text' },
          { key: 'body', label: 'Short description', type: 'textarea' },
          { key: 'background', label: 'Card colour', type: 'color' },
        ],
      },
      {
        key: 'cards',
        label: 'Cards',
        type: 'list',
        itemLabel: cardTitle,
        addLabel: 'Add a card',
        fields: [
          ...CARD_FIELDS,
          { key: 'wide', label: 'Wide card (two columns)', type: 'toggle' },
        ],
        template: () => ({
          title: ['New article'],
          eyebrow: 'Article',
          body: LOREM,
          background: '#f0f0f0',
        }),
      },
    ],
    template: () => ({
      eyebrow: 'We have more for you',
      heading: 'Design Dialogue',
      intro: LOREM,
      featured: {
        title: 'Featured article',
        eyebrow: 'Article',
        body: LOREM,
        background: '#dcf6f8',
      },
      cards: [],
    }),
  },
  featureBand: {
    label: 'Featured story',
    about: 'A big centred quote with two floating pictures.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'quote', label: 'Quote', type: 'textarea' },
      {
        key: 'image',
        label: 'Floating picture',
        type: 'image',
        hint: 'A cut-out on a transparent background works best.',
      },
      { key: 'background', label: 'Box colour on phones', type: 'color' },
    ],
    mobile: ['heading'],
    template: () => ({
      eyebrow: 'Featured Story',
      heading: 'NAME',
      quote: LOREM,
      background: '#dcf6f8',
    }),
  },
  storyCarousel: {
    label: 'Stories carousel',
    about: 'Cards that glide past on their own, zooming the one in the middle.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
      { key: 'cta', label: 'Button', type: 'text' },
      {
        key: 'cards',
        label: 'Cards',
        type: 'list',
        itemLabel: cardTitle,
        addLabel: 'Add a card',
        fields: CARD_FIELDS,
        template: () => ({
          title: ['New story'],
          eyebrow: 'Article',
          body: LOREM,
          background: '#f0f0f0',
        }),
      },
    ],
    mobile: [
      'eyebrow',
      {
        key: 'cards',
        label: 'Cards on phones',
        type: 'list',
        itemLabel: cardTitle,
        addLabel: 'Add a card',
        fields: [
          ...CARD_FIELDS.filter((f) => f.key !== 'eyebrow'),
          { key: 'cropped', label: 'Zoom the picture in', type: 'toggle' },
        ],
        template: () => ({
          title: ['New story'],
          body: LOREM,
          background: '#f0f0f0',
          glyph: 'arrow',
        }),
      },
    ],
    template: () => ({
      eyebrow: 'We dig deep',
      heading: 'Stories',
      intro: LOREM,
      cta: 'View All Stories',
      cards: [],
    }),
  },
  readingRail: {
    label: 'Reading rail',
    about: 'A row of article cards that slides on its own.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      {
        key: 'cards',
        label: 'Cards',
        type: 'list',
        itemLabel: cardTitle,
        addLabel: 'Add a card',
        fields: CARD_FIELDS,
        template: () => ({
          title: ['New article'],
          eyebrow: 'Article',
          body: LOREM,
          background: '#f0f0f0',
        }),
      },
    ],
    template: () => ({
      eyebrow: 'Come here often?',
      heading: 'Finish what you started',
      cards: [],
    }),
  },
  testimonials: {
    label: 'Testimonials',
    about: 'Client quotes that rotate on their own.',
    go: [{ label: 'Edit the quotes', where: { kind: 'testimonials' } }],
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'cta', label: 'Button', type: 'text' },
    ],
    mobile: [
      {
        key: 'headingLines',
        label: 'Heading on phones',
        type: 'lines',
        hint: 'Each line is a line on the phone.',
      },
    ],
    template: () => ({
      eyebrow: 'We believe',
      heading: 'Kind words',
      cta: 'View More',
    }),
  },
  founder: {
    label: 'Person',
    about:
      'A portrait card with a name, a role and a few lines in their words.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      {
        key: 'image',
        label: 'Portrait',
        type: 'image',
        hint: 'Shown in black and white.',
      },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'bio', label: 'In their words', type: 'textarea' },
    ],
    template: () => ({
      eyebrow: 'Meet',
      heading: 'Meet the team',
      name: 'Name',
      role: 'Role',
      bio: LOREM,
    }),
  },
  statement: {
    label: 'Statement',
    about: 'A heading over a large serif statement, on the page colours.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Statement', type: 'textarea' },
    ],
    template: () => ({ heading: 'Our Mission', body: LOREM }),
  },
  values: {
    label: 'Numbered cards',
    about: 'A heading and intro over numbered cards.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'lede', label: 'Intro', type: 'textarea' },
      {
        key: 'columns',
        label: 'Cards',
        type: 'list',
        itemLabel: (c) => c.title || 'Card',
        addLabel: 'Add a card',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'body', label: 'Text', type: 'textarea' },
        ],
        template: () => ({ title: 'New value', body: LOREM }),
      },
    ],
    template: () => ({ heading: 'Our values', lede: LOREM, columns: [] }),
  },
  brands: {
    label: 'Logo wall',
    about: 'A heading over a grid of logos.',
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      {
        key: 'logos',
        label: 'Logos',
        type: 'list',
        itemLabel: (l) => l.name || 'Logo',
        thumb: (l) => l.src,
        addLabel: 'Add a logo',
        fields: [
          { key: 'src', label: 'Logo', type: 'image' },
          {
            key: 'name',
            label: 'Name',
            type: 'text',
            hint: 'Read out by screen readers.',
          },
        ],
        template: () => ({ name: 'Brand' }),
      },
    ],
    template: () => ({
      eyebrow: 'Our Association',
      heading: 'Brands love us',
      logos: [],
    }),
  },
  form: {
    label: 'Form',
    about: 'The studio’s details beside a form.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea', optional: true },
      {
        key: 'label',
        label: 'Form name',
        type: 'text',
        hint: 'Read out by screen readers.',
      },
      {
        key: 'after',
        label: 'Link under the details',
        type: 'group',
        optional: true,
        fields: [
          { key: 'label', label: 'Link text', type: 'text' },
          { key: 'to', label: 'Goes to', type: 'link' },
        ],
      },
      {
        key: 'fields',
        label: 'Form fields',
        type: 'list',
        itemLabel: (f) => f.label || 'Field',
        addLabel: 'Add a field',
        fields: [
          {
            key: 'kind',
            label: 'Kind',
            type: 'select',
            options: [
              { value: '', label: 'Text' },
              { value: 'file', label: 'File upload' },
              { value: 'links', label: 'Links (with “Add more”)' },
            ],
          },
          { key: 'label', label: 'Label', type: 'text' },
          {
            key: 'name',
            label: 'Field name',
            type: 'text',
            hint: 'Short, no spaces — how the answer is labelled.',
          },
          {
            key: 'placeholder',
            label: 'Placeholder',
            type: 'text',
            when: (f) => f.kind !== 'file',
          },
          {
            key: 'type',
            label: 'Expects',
            type: 'select',
            when: (f) => !f.kind,
            options: [
              { value: '', label: 'Any text' },
              { value: 'email', label: 'An email address' },
              { value: 'tel', label: 'A phone number' },
              { value: 'url', label: 'A link' },
            ],
          },
          {
            key: 'multiline',
            label: 'Several lines',
            type: 'toggle',
            when: (f) => !f.kind,
          },
          {
            key: 'addLabel',
            label: '“Add more” text',
            type: 'text',
            when: (f) => f.kind === 'links',
          },
        ],
        template: () => ({
          label: 'New field',
          name: 'field',
          placeholder: '',
        }),
      },
    ],
    template: () => ({ heading: 'Get in touch', label: 'Contact', fields: [] }),
  },
  siteFooter: {
    label: 'Simple footer',
    about: 'Logo, links and social icons, the same on every page that has it.',
    go: [
      {
        label: 'Edit the footer links',
        where: { kind: 'settings', group: 'footer' },
      },
      {
        label: 'Edit the studio details',
        where: { kind: 'settings', group: 'studio' },
      },
    ],
    fields: [],
    template: () => ({}),
  },
  footer: {
    label: 'Exploration + contact footer',
    about:
      'The quick exploration and enquiry form every page ends on — the same everywhere.',
    go: [
      {
        label: 'Edit the quick exploration',
        where: { kind: 'settings', group: 'exploration' },
      },
      {
        label: 'Edit the enquiry form',
        where: { kind: 'settings', group: 'contact' },
      },
      {
        label: 'Edit the footer links',
        where: { kind: 'settings', group: 'footer' },
      },
    ],
    fields: [],
    template: () => ({}),
  },
}

// ---------------------------------------------------------------------------
// Story blocks (case studies and articles)
// ---------------------------------------------------------------------------

export const BLOCKS = {
  banner: {
    label: 'Banner',
    about: 'The big picture at the top.',
    fields: [{ key: 'image', label: 'Picture', type: 'image' }],
    template: () => ({}),
  },
  pinBanner: {
    label: 'Safety pin banner',
    about: 'The illustrated safety-pin banner.',
    fields: [],
    template: () => ({}),
  },
  overview: {
    label: 'Title card',
    about: 'The title, details, tags and narration player.',
    fields: [
      { key: 'title', label: 'Title', type: 'textarea' },
      {
        key: 'meta',
        label: 'Details',
        type: 'list',
        itemLabel: (m) => (m.label ? `${m.label}: ${m.value ?? ''}` : 'Detail'),
        addLabel: 'Add a detail',
        fields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Client' },
          { key: 'value', label: 'Value', type: 'text' },
        ],
        template: () => ({ label: 'Label', value: '' }),
      },
      { key: 'tags', label: 'Tags', type: 'tags' },
      { key: 'audio', label: 'Narration', type: 'audio', optional: true },
    ],
    template: () => ({
      title: 'Title',
      meta: [{ label: 'Client', value: '' }],
      tags: [],
    }),
  },
  band: {
    label: 'Full-width picture',
    about: 'A picture edge to edge, tucked under the card above it.',
    fields: [
      { key: 'image', label: 'Picture', type: 'image' },
      {
        key: 'height',
        label: 'Fixed height',
        type: 'text',
        optional: true,
        hint: 'Leave empty to show the whole picture.',
      },
    ],
    template: () => ({}),
  },
  text: {
    label: 'Text',
    about: 'A text card, with pictures under it if you like.',
    fields: [
      { key: 'title', label: 'Side title', type: 'text', optional: true },
      { key: 'lede', label: 'Side note', type: 'textarea', optional: true },
      {
        key: 'body',
        label: 'Paragraphs',
        type: 'list',
        itemLabel: (p) => (p.text || 'Paragraph').slice(0, 60),
        addLabel: 'Add a paragraph',
        fields: [
          {
            key: 'style',
            label: 'Style',
            type: 'select',
            options: [
              { value: 'paragraph', label: 'Regular' },
              { value: 'quote', label: 'Large serif' },
            ],
          },
          { key: 'text', label: 'Text', type: 'textarea' },
        ],
        template: () => ({ style: 'paragraph', text: LOREM }),
      },
      {
        key: 'media',
        label: 'Pictures',
        type: 'list',
        optional: true,
        itemLabel: (r) =>
          ({
            full: 'One wide picture',
            pair: 'Two side by side',
            squares: 'Two squares',
          })[r.layout] ?? 'Pictures',
        addLabel: 'Add pictures',
        fields: [
          {
            key: 'layout',
            label: 'Layout',
            type: 'select',
            options: [
              { value: 'full', label: 'One wide picture' },
              { value: 'pair', label: 'Two side by side' },
              { value: 'squares', label: 'Two squares' },
            ],
          },
          {
            key: 'image',
            label: 'Picture',
            type: 'image',
            when: (r) => r.layout === 'full',
          },
          {
            key: 'items',
            label: 'Pictures',
            type: 'list',
            max: 2,
            when: (r) => r.layout !== 'full',
            itemLabel: (_, i) => (i === 0 ? 'Left' : 'Right'),
            thumb: (p) => p.image,
            addLabel: 'Add a picture',
            fields: [
              { key: 'image', label: 'Picture', type: 'image' },
              {
                key: 'background',
                label: 'Backing colour',
                type: 'color',
                optional: true,
              },
            ],
            template: () => ({}),
          },
        ],
        template: () => ({ layout: 'full' }),
      },
      { key: 'spacious', label: 'More room around the text', type: 'toggle' },
    ],
    template: () => ({
      title: 'Title',
      body: [{ style: 'paragraph', text: LOREM }],
    }),
  },
  quote: {
    label: 'Big quote',
    about: 'A large centred quote, on the page or on its own colour band.',
    fields: [
      { key: 'text', label: 'Quote', type: 'textarea' },
      {
        key: 'background',
        label: 'Band colour',
        type: 'color',
        optional: true,
        hint: 'Leave empty to sit on the page.',
      },
      {
        key: 'color',
        label: 'Text colour',
        type: 'color',
        optional: true,
        when: (b) => Boolean(b.background),
      },
    ],
    template: () => ({ text: 'A line worth remembering.' }),
  },
  card: {
    label: 'Picture card',
    about: 'A picture in a white card.',
    fields: [{ key: 'image', label: 'Picture', type: 'image', sizes: true }],
    template: () => ({}),
  },
  article: {
    label: 'Article text',
    about: 'Rows of text and pictures with small side labels.',
    fields: [
      {
        key: 'rows',
        label: 'Rows',
        type: 'list',
        itemLabel: (r) => r.label || 'Row',
        addLabel: 'Add a row',
        fields: [
          { key: 'label', label: 'Side label', type: 'text' },
          {
            key: 'content',
            label: 'In this row',
            type: 'list',
            itemLabel: (c) =>
              ({
                lead: 'Lead paragraph',
                body: 'Paragraph',
                image: 'Picture',
                collage: 'Picture with echo',
              })[c.type] ?? 'Item',
            thumb: (c) => c.image,
            addLabel: 'Add to this row',
            fields: [
              {
                key: 'type',
                label: 'Kind',
                type: 'select',
                options: [
                  { value: 'lead', label: 'Lead paragraph' },
                  { value: 'body', label: 'Paragraph' },
                  { value: 'image', label: 'Picture' },
                  { value: 'collage', label: 'Picture with echo' },
                ],
              },
              {
                key: 'text',
                label: 'Text',
                type: 'textarea',
                when: (c) => c.type === 'lead' || c.type === 'body',
              },
              {
                key: 'image',
                label: 'Picture',
                type: 'image',
                when: (c) => c.type === 'image' || c.type === 'collage',
              },
              {
                key: 'alt',
                label: 'Describe the picture',
                type: 'text',
                optional: true,
                when: (c) => c.type === 'image',
              },
            ],
            template: () => ({ type: 'body', text: LOREM }),
          },
        ],
        template: () => ({
          label: 'Label',
          content: [{ type: 'body', text: LOREM }],
        }),
      },
    ],
    template: () => ({
      rows: [{ label: 'Label', content: [{ type: 'body', text: LOREM }] }],
    }),
  },
  moreProjects: {
    label: 'More projects',
    about: 'A rail of the other projects. Fills itself.',
    fields: [],
    template: () => ({}),
  },
  finishReading: SECTIONS.readingRail,
  footer: SECTIONS.footer,
}

// ---------------------------------------------------------------------------
// Everything else
// ---------------------------------------------------------------------------

export const SEARCH_FIELDS = [
  { key: 'title', label: 'Title in search', type: 'text' },
  { key: 'subtitle', label: 'Line under it', type: 'text' },
  { key: 'image', label: 'Picture', type: 'image' },
  { key: 'background', label: 'Card colour', type: 'color' },
  {
    key: 'keywords',
    label: 'Also found by',
    type: 'tags',
    hint: 'Words people might search for.',
  },
]

export const PROJECT_FIELDS = [
  { key: 'title', label: 'Name', type: 'text' },
  {
    key: 'category',
    label: 'Kind of work',
    type: 'text',
    optional: true,
    placeholder: 'Branding & Packaging',
  },
  {
    key: 'image',
    label: 'Cover picture',
    type: 'image',
    hint: 'Used on its card everywhere.',
  },
  {
    key: 'background',
    label: 'Project colour',
    type: 'color',
    hint: 'Its cards, and its page background.',
  },
  { key: 'tags', label: 'Search tags', type: 'tags' },
]

export const TESTIMONIAL_FIELDS = [
  {
    key: 'project',
    label: 'Project',
    type: 'project',
    hint: 'Gives the card its colour and link.',
  },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'quote', label: 'Quote', type: 'textarea' },
  { key: 'portrait', label: 'Portrait', type: 'image' },
]

export const SETTINGS_GROUPS = {
  navigation: {
    icon: 'menu',
    label: 'Menu',
    about: 'The links in the floating menu, and the words beside them.',
    fields: [
      {
        key: 'nav',
        label: 'Menu links',
        type: 'list',
        itemLabel: (n) => n.label || 'Link',
        addLabel: 'Add a link',
        fields: [
          { key: 'label', label: 'Text', type: 'text' },
          { key: 'to', label: 'Goes to', type: 'link' },
        ],
        template: () => ({ label: 'New link', to: '/' }),
      },
      { key: 'menuBlurb', label: 'Words beside the links', type: 'textarea' },
    ],
  },
  studio: {
    icon: 'building',
    label: 'Studio details',
    about: 'Shown beside the forms on Careers and Contact.',
    base: ['studio'],
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'reach', label: 'Invitation line', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'phone', label: 'Phone line', type: 'text' },
    ],
  },
  footer: {
    icon: 'footer',
    label: 'Footer',
    about: 'The footer links and social icons.',
    fields: [
      {
        key: 'footerLinks',
        label: 'Footer links',
        type: 'list',
        max: 6,
        hint: 'The footer has room for six.',
        itemLabel: (l) => l.label || 'Link',
        addLabel: 'Add a link',
        fields: [
          { key: 'label', label: 'Text', type: 'text' },
          { key: 'to', label: 'Goes to', type: 'link', optional: true },
        ],
        template: () => ({ label: 'New link', to: '/' }),
      },
      {
        key: 'socials',
        label: 'Social icons',
        type: 'list',
        itemLabel: (s) => s.label || 'Icon',
        thumb: (s) => s.icon,
        addLabel: 'Add an icon',
        fields: [
          { key: 'label', label: 'Name', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'image' },
          {
            key: 'href',
            label: 'Address',
            type: 'text',
            optional: true,
            placeholder: 'https://…',
          },
        ],
        template: () => ({ label: 'New', href: '' }),
      },
    ],
  },
  exploration: {
    icon: 'tag',
    label: 'Quick exploration',
    about: 'The row of topic tags at the end of every page.',
    base: ['exploration'],
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      {
        key: 'tags',
        label: 'Topics',
        type: 'list',
        itemLabel: (t) => t.label || 'Topic',
        addLabel: 'Add a topic',
        fields: [
          { key: 'label', label: 'Topic', type: 'text' },
          {
            key: 'variant',
            label: 'Look',
            type: 'select',
            options: [
              { value: 'outline', label: 'Outlined' },
              { value: 'filled', label: 'Filled black' },
            ],
          },
        ],
        template: () => ({ label: 'New topic', variant: 'outline' }),
      },
      { key: 'cta', label: 'Button', type: 'text' },
    ],
    mobile: ['tags', 'cta'],
  },
  contact: {
    icon: 'mail',
    label: 'Enquiry form',
    about: 'The enquiry form at the end of every page.',
    base: ['contact'],
    fields: [
      { key: 'eyebrow', label: 'Small label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'fieldsLabel', label: 'Label over the fields', type: 'text' },
      {
        key: 'interestsLabel',
        label: 'Label over the interests',
        type: 'text',
      },
      { key: 'interests', label: 'Interests', type: 'tags' },
    ],
    mobile: ['heading', 'interestsLabel', 'interests'],
  },
}

/** Starter story for a new project. */
export function newProjectStory(title, background) {
  return {
    ground: background,
    blocks: [
      { type: 'banner' },
      {
        type: 'overview',
        title: title,
        meta: [
          { label: 'Client', value: title },
          { label: 'Project', value: '' },
        ],
        tags: [],
      },
      {
        type: 'text',
        title: 'The brief',
        body: [{ style: 'paragraph', text: LOREM }],
      },
      { type: 'band' },
      { type: 'moreProjects', current: '' },
      { type: 'footer' },
    ],
  }
}

/** Starter story for a new article. */
export function newArticleStory(title) {
  return {
    ground: 'article',
    blocks: [
      { type: 'banner' },
      {
        type: 'overview',
        title,
        meta: [
          {
            label: 'Published',
            value: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          },
          { label: 'Words', value: '' },
        ],
        tags: ['Design Dialogue'],
      },
      {
        type: 'article',
        rows: [{ label: '', content: [{ type: 'lead', text: LOREM }] }],
      },
      { type: 'footer' },
    ],
  }
}
