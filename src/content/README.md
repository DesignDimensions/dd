# Content

Everything the site says or shows lives here, shaped the way a CMS will
hold it. Components only render what they are given; connecting a CMS
means replacing these files with fetches that return the same shapes.

## Types

| File | CMS type | What it is |
|---|---|---|
| `settings.js` | Settings (single) | Navigation, studio details, footer links, socials, and the Exploration + Contact sections every page ends on |
| `pages/*.js` | Page | A `ground` and a list of typed `sections`, plus `search` details for the search panel. Section types are listed in `components/page/sections.js` |
| `stories/*.js` | Story | A case study or an article: a `ground` and a list of typed `blocks` (types listed in `components/story/StoryPage.jsx`) |
| `projects.js` | Project | Every project: slug, title, category, colour, cover image, path |
| `projectPages.js` | (generated) | The template case studies, generated from the Figma frames; turned into stories by `stories/projectStories.js` |
| `testimonials.js` | Testimonial | One per client, linked to a project for its colour and link |
| `shared.js` | — | Sections repeated on several pages (Featured Story, footer) |

## Desktop and mobile

Where the mobile design words something differently, a section carries a
`mobile` object with just those fields; `components/page/responsive.jsx`
applies it below the desktop breakpoint. These differences come from the
Figma frames and are kept as they are until someone decides one wording.

## Adding things

- A page: add a file to `pages/` and list it in `pages/index.js` — it gets
  a route and, with `search` details, a place in search.
- A project: add it to `projects.js` (and its story), and it appears in the
  Work diary, the header preview, "More projects" and search.
- An article: add a story to `stories/` and list it in `ARTICLES`
  (`stories/index.js`) — it is served at `/design-dialogue/<slug>`.
