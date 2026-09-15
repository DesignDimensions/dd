/**
 * Generated from the project case-study frames on Figma 12357:15253 — one
 * entry per project page, its sections in the frame's own order. Rendered by
 * pages/Project; images live in src/assets/projects/<slug>/ and resolve
 * through lib/projectImages.js.
 *
 * Block types:
 *   hero      the banner — a render of the frame's hero section
 *   overview  the title card with Client / Project meta and tags
 *   text      the template's text block; variant long | mid | short | compact
 *   quote     the big pull quote; background + color where the frame paints
 *             it as a coloured band
 *   band      a full-bleed image section, rendered whole
 *   card      an inset image section, cropped to the 1120 content column
 *
 * `project` and `tags` are the frame's own overview values. Where a frame's
 * overview was left as a copy of another project's (`overviewCopiedFrom`),
 * its tags are dropped and `project` falls back to what the project's other
 * frames state, if anything. `background` is the project's card colour,
 * used as its page ground.
 */
export const PROJECT_PAGES = [
  {
    slug: 'bangla-123',
    title: 'Bangla 123',
    figma: '2719:24968',
    background: '#b0c3b4',
    project: 'Identity & Stationary',
    tags: [
      'Identity Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1800
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1580
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 750
      },
      {
        type: 'band',
        image: '09',
        width: 2880,
        height: 1480
      }
    ]
  },
  {
    slug: 'papadmalji',
    title: 'Papadmalji',
    figma: '2719:26934',
    background: '#dcf6f8',
    project: 'Branding & Packaging',
    tags: [
      'Identity Design',
      'Packaging Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 2289
      },
      {
        type: 'quote',
        background: '#ffb580',
        color: '#c24600'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '10',
        width: 1120,
        height: 1436
      },
      {
        type: 'band',
        image: '11',
        width: 1440,
        height: 740
      }
    ]
  },
  {
    slug: 'nupur-kanoi',
    title: 'Nupur Kanoi',
    figma: '2739:7927',
    background: '#859396',
    project: 'Branding & Website',
    tags: [
      'Identity Design',
      'Website Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 643
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1605
      },
      {
        type: 'quote',
        background: '#292929',
        color: '#fdfdfd'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 2250
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '10',
        width: 1440,
        height: 740
      }
    ]
  },
  {
    slug: 'godawan',
    title: 'Godawan',
    figma: '3458:4821',
    background: '#ff694f',
    project: 'Scarves & Pocket Square',
    tags: [
      'Merchandise Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1569
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 1448
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '09',
        width: 1120,
        height: 1448
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'a-pag',
    title: 'A-PAG',
    figma: '2764:12824',
    background: '#fff27a',
    project: 'Brand Identity & Website',
    tags: [],
    overviewCopiedFrom: 'Godawan',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1564
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1575
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '08',
        width: 1440,
        height: 611
      }
    ]
  },
  {
    slug: 'blossom-home',
    title: 'Blossom Home',
    figma: '2764:14628',
    background: '#c79275',
    project: 'Branding, Website & Store',
    tags: [
      'Web Design',
      'Identity Design',
      'Installation Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 2378
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1564
      },
      {
        type: 'quote',
        background: '#252525',
        color: '#ffffff'
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '09',
        width: 1120,
        height: 1120
      }
    ]
  },
  {
    slug: 'natures-miracle',
    title: 'Nature’s Miracle',
    figma: '3208:4745',
    background: '#d5dab5',
    project: 'Branding & Packaging',
    tags: [
      'Web Design',
      'Identity Design',
      'Installation Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 2378
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1176,
        height: 778
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 528
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'jujuteh',
    title: 'Jujuteh',
    figma: '3216:5209',
    background: '#d6dfff',
    project: 'Branding',
    tags: [
      'Web Design',
      'Identity Design',
      'Installation Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '03',
        width: 1440,
        height: 760
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'card',
        image: '05',
        width: 1069,
        height: 3976
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 778
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '09',
        width: 1120,
        height: 528
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'samsara',
    title: 'Samsara',
    figma: '3248:6519',
    background: '#fac97f',
    project: 'Interior decor design',
    tags: [
      'Web Design',
      'Identity Design',
      'Installation Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 1129
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 1440,
        height: 760
      },
      {
        type: 'card',
        image: '05',
        width: 1120,
        height: 2160
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 528
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 528
      },
      {
        type: 'card',
        image: '09',
        width: 1120,
        height: 778
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '11',
        width: 1120,
        height: 528
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'baba-nauratan',
    title: 'Baba Nauratan',
    figma: '3316:3557',
    background: '#dcf6f8',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1551
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 1120
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '10',
        width: 1120,
        height: 1551
      },
      {
        type: 'band',
        image: '11',
        width: 1440,
        height: 760
      }
    ]
  },
  {
    slug: 'san-lorenzo',
    title: 'San Lorenzo',
    figma: '3403:3936',
    background: '#ff694f',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Blossom Home',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'card',
        image: '05',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 1551
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'hanky-card',
    title: 'Hanky Card',
    figma: '3439:4495',
    background: '#c79275',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1551
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '06',
        width: 2880,
        height: 1520
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 1551
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      }
    ]
  },
  {
    slug: 'white-rhino',
    title: 'White Rhino',
    figma: '3715:7734',
    background: '#fac97f',
    project: 'Packaging design',
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 750
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 2352
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'quote',
        background: '#000000',
        color: '#ffffff'
      },
      {
        type: 'card',
        image: '10',
        width: 1120,
        height: 1120
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '12',
        width: 2880,
        height: 1520
      }
    ]
  },
  {
    slug: 'white-rhino-chill',
    title: 'White Rhino Chill',
    figma: '3731:17986',
    background: '#d5dab5',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1551
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'quote',
        background: '#5db18b',
        color: '#ffffff'
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 750
      }
    ]
  },
  {
    slug: 'catch-jus-love',
    title: 'Catch Jus’Love',
    figma: '3788:8476',
    background: '#d6dfff',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1376
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1564
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 3165
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '08',
        width: 2880,
        height: 1446
      }
    ]
  },
  {
    slug: 'snack-factory-kabuli',
    title: 'Snack Factory Kabuli',
    figma: '3751:33579',
    background: '#fff27a',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Bangla123',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1120
      },
      {
        type: 'quote'
      },
      {
        type: 'band',
        image: '06',
        width: 1440,
        height: 746
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 737
      }
    ]
  },
  {
    slug: 'snack-factory-bhujia',
    title: 'Snack Factory Bhujia',
    figma: '3729:26595',
    background: '#859396',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Bangla123',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1120
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'quote'
      },
      {
        type: 'band',
        image: '07',
        width: 1440,
        height: 740
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 750
      }
    ]
  },
  {
    slug: 'beehar',
    title: 'Beehar',
    figma: '4053:7945',
    background: '#dcf6f8',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 740
      },
      {
        type: 'quote',
        background: '#e3dccc',
        color: '#000000'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 1554
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '10',
        width: 1440,
        height: 750
      }
    ]
  },
  {
    slug: '15-ad',
    title: '15 AD',
    figma: '4252:9273',
    background: '#e0a968',
    project: 'Packaging',
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'quote',
        background: '#e3dccc',
        color: '#000000'
      },
      {
        type: 'band',
        image: '04',
        width: 2880,
        height: 1520
      },
      {
        type: 'card',
        image: '05',
        width: 1120,
        height: 1554
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '07',
        width: 2880,
        height: 1520
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 1554
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '10',
        width: 1120,
        height: 2358
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'band',
        image: '12',
        width: 1440,
        height: 750
      }
    ]
  },
  {
    slug: 'le-marche',
    title: 'Le Marche',
    figma: '4315:8242',
    background: '#ff694f',
    project: 'Logo Design',
    tags: [
      'Merchandise Design'
    ],
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 1440,
        height: 768
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'band',
        image: '04',
        width: 1440,
        height: 760
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Store'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 1554
      },
      {
        type: 'quote'
      },
      {
        type: 'card',
        image: '08',
        width: 1120,
        height: 750
      },
      {
        type: 'text',
        variant: 'mid',
        title: 'Title'
      },
      {
        type: 'card',
        image: '10',
        width: 1120,
        height: 1448
      }
    ]
  },
  {
    slug: 'cab',
    title: 'CAB',
    figma: '4566:8858',
    background: '#c79275',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Le Marche',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 750
      },
      {
        type: 'card',
        image: '05',
        width: 1120,
        height: 1564
      },
      {
        type: 'text',
        variant: 'short',
        title: 'Title'
      },
      {
        type: 'card',
        image: '07',
        width: 1120,
        height: 2378
      }
    ]
  },
  {
    slug: 'kunjilal',
    title: 'Kunjilal',
    figma: '4501:8252',
    background: '#d5dab5',
    project: null,
    tags: [],
    overviewCopiedFrom: 'Papadmalji',
    blocks: [
      {
        type: 'hero',
        image: 'hero'
      },
      {
        type: 'overview'
      },
      {
        type: 'band',
        image: '02',
        width: 2880,
        height: 1520
      },
      {
        type: 'text',
        variant: 'long',
        title: 'Title'
      },
      {
        type: 'card',
        image: '04',
        width: 1120,
        height: 1554
      },
      {
        type: 'text',
        variant: 'compact',
        title: 'Title'
      },
      {
        type: 'card',
        image: '06',
        width: 1120,
        height: 3173
      },
      {
        type: 'text',
        variant: 'compact',
        title: 'Title'
      },
      {
        type: 'quote',
        background: '#000000',
        color: '#ffffff'
      },
      {
        type: 'card',
        image: '09',
        width: 1120,
        height: 1120
      },
      {
        type: 'text',
        variant: 'compact',
        title: 'Title'
      },
      {
        type: 'band',
        image: '11',
        width: 2880,
        height: 1520
      }
    ]
  }
]
