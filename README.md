# Website

React + Vite, plain JSX, CSS Modules. Built section by section from Figma,
copied exactly rather than approximated.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

| Script                 | Does                                             |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Dev server with HMR                              |
| `npm run build`        | Production build to `dist/`                      |
| `npm run preview`      | Serve the production build locally               |
| `npm run lint`         | oxlint                                           |
| `npm run format`       | Prettier over the repo                           |
| `npm run section Hero` | Scaffold `src/sections/Hero/` from a Figma frame |

## Structure

```
src/
  main.jsx                  entry — mounts the router
  App.jsx                   route table
  pages/                    one folder per route; composes sections only
  sections/                 one folder per Figma frame section  <- most work lands here
  components/
    layout/                 app shell, ScrollToTop
    ui/                     genuinely reused primitives (only once reuse is real)
    dev/FigmaOverlay/       pixel-diff tool for checking a build against the frame
  styles/
    reset.css               browser defaults only, no design decisions
    tokens.css              Figma variables and styles, filled from the real file
    global.css              app-wide base
  assets/images | icons | fonts
  hooks/                    shared hooks
  lib/                      small helpers (cn)
public/figma/               1x PNG frame exports for pixel-checking (gitignored)
```

`@/` is aliased to `src/`, so `import Hero from '@/sections/Hero/Hero.jsx'`.

## The Figma workflow

Hand over a frame link or a selected frame, and each section gets built like this.

**1. Scaffold**

```bash
npm run section Hero
```

**2. Read the real values.** Everything comes off the Figma inspector —
width, height, padding, gap, font family, size, weight, line-height,
letter-spacing, colour, radius, shadow, and the exact auto-layout direction
and alignment. Nothing is rounded to a "nicer" number, and nothing gets
substituted for a value that merely looks similar.

**3. Build it.** Auto-layout maps to flex, absolute positioning stays
absolute, and the frame's own stacking order is preserved. Section CSS lives
in `<Name>.module.css` next to the JSX.

**4. Compose.** Add the section to its page in Figma's top-to-bottom order.
Pages hold no styling of their own.

**5. Verify.** Export the frame from Figma at 1x into `public/figma/`, then
mount the overlay in `src/components/layout/Layout.jsx` while comparing:

```jsx
{
  import.meta.env.DEV && <FigmaOverlay src="/figma/home.png" />
}
```

`O` toggles it, `[` and `]` change opacity, `D` switches to difference blend —
where a pixel-perfect match renders pure black and any drift glows.

### Conventions

- **Values used once** are hardcoded in that section's CSS module, exactly as
  Figma states them. **Values Figma defines as a variable or style** go into
  `src/styles/tokens.css` and are referenced with `var(--…)`. Tokens are never
  invented to tidy up a one-off number.
- **Responsive behaviour is only built from frames that exist.** If Figma has a
  desktop frame and no tablet or mobile frame, the desktop frame is what gets
  built — breakpoints are not guessed.
- **Assets** are exported from Figma rather than recreated. SVGs go in
  `src/assets/icons/`, raster in `src/assets/images/`, and any custom font
  files in `src/assets/fonts/` with an `@font-face` in `global.css`.
- **Anything ambiguous in the frame gets raised** instead of being filled in
  with a reasonable-looking assumption.

### Handing over a design

Any of these work:

- A Figma link to a specific frame (`?node-id=…` — right-click the frame →
  Copy link to selection)
- A screenshot of the frame plus the inspector panel
- Figma's Dev Mode MCP server, which reads the frame directly

The MCP server is the most accurate of the three, since it returns real
measurements instead of anything read off an image.

### Figma MCP call budget

The connected Figma account is on a **Starter** plan, which caps MCP _read_
calls at **20 per month** — not per day. `get_design_context`,
`get_screenshot`, `get_metadata`, `get_variable_defs` and `download_assets` all
count against it; `whoami` and the write tools do not.

That is tight enough to shape the workflow, so calls get batched:

- `get_design_context` is called once on the **parent page frame**, which
  returns every child section together, instead of once per section.
- `get_variable_defs` is pulled once for the whole file to fill `tokens.css`.
- `download_assets` runs once in bulk rather than per icon.
- Screenshots pasted into chat are free and don't touch the cap, so they're a
  good way to clarify a detail without spending a call.

Roughly, one full page costs 3–4 calls handled this way, versus 20+ handled
naively. The budget resets on the 1st of the month.

## What is built

**Home**, from two Figma frames:

- Desktop — [2714:8733](https://www.figma.com/design/Ur5e3EiyQocsvqbVj1tgol/DD_Website?node-id=2714-8733), 1440px artboard
- Mobile — [2715:10365](https://www.figma.com/design/Ur5e3EiyQocsvqbVj1tgol/DD_Website?node-id=2715-10365), 360px artboard

Every section exists twice, because the two frames differ in **content**, not
just in size. `<Section>.jsx` is a switcher that picks `<Section>Desktop.jsx`
or `<Section>Mobile.jsx` off `useIsMobile()`.

| Section          | Desktop node | Mobile node |
| ---------------- | ------------ | ----------- |
| `Hero`           | 2714:8734    | 2715:10545  |
| `SnackFactory`   | 2714:8744    | 2715:10544  |
| `WorkDiary`      | 2714:8758    | 2715:10684  |
| `FeaturedStory`  | 2714:8800    | 2715:10751  |
| `DesignDialogue` | 2714:8806    | 2715:11889  |
| `Exploration`    | 2714:8846    | 2715:10895  |
| `Testimonials`   | 2714:8859    | 2715:11049  |
| `Contact`        | 2715:11778   | 2715:11075  |

Shared Figma components live in `src/components/ui/` — `Tag`, `Cta` and
`IconButton` take a `size` of `desktop` or `mobile`; `ProjectCard` is the
desktop card and `ProductCardMobile` the mobile one. Headers are
`components/layout/Header` and `components/layout/HeaderMobile`.

### Motion

**There is none.** No scroll reveals, no parallax, no floating, nothing that
follows the cursor. GSAP was removed along with it, so the page ships no
animation runtime at all.

What remains is hover response, and it is pure CSS — one shared curve,
`cubic-bezier(0.22, 1, 0.36, 1)`, on every transition:

| Control                  | Hover                                                                |
| ------------------------ | -------------------------------------------------------------------- |
| `Cta`                    | white fill wipes up over the black, label crosses to black           |
| `MergeButton`            | one black capsule wipes across pill + gap + arrow; outlines dissolve |
| `Tag`                    | each variant inverts into the other                                  |
| `IconButton`             | circle fills, ring and glyph invert                                  |
| Project cards            | hovering anywhere on the card inverts its arrow                      |
| Genre / Newest chips     | invert, chevron flips with a filter                                  |
| Search bars, mobile menu | invert                                                               |
| Nav items, footer links  | a rule grows from the left                                           |
| Form fields              | background lifts                                                     |

Icon colours run through inheritable custom properties — `--icon-ring`,
`--icon-glyph`, `--icon-bg` — set on `ArrowCircle`. That is what lets a card
invert the arrow inside it without reaching across CSS-module boundaries.

Icons stay inline SVG using Figma's exact exported paths (both the arrow and
the bookmark glyph the mobile slider uses), because an `<img>` cannot
recolour.

Everything animated is colour. Nothing moves, nothing scales, so no hover
state can shift the layout the frames define.

### Where the two frames disagree

These are differences in the design, carried through as-is rather than
reconciled:

|                         | Desktop                         | Mobile                     |
| ----------------------- | ------------------------------- | -------------------------- |
| Work diary filter       | `Genre`                         | `Newest`                   |
| Work diary CTA          | `View All Projects`             | `View More Projects`       |
| Work diary cards        | 6, in three layouts             | 4, stacked                 |
| Design Dialogue eyebrow | `We dig deep`                   | `We have more for you`     |
| Design Dialogue cards   | 3 in a row                      | 4 on a horizontal slider   |
| Snack Factory tag       | `Paxkaging design`              | `Packaging Design`         |
| Featured story title    | `PAPADMALJI`                    | `Papadmalji`               |
| Exploration CTA         | `Search Now`                    | `Search now`               |
| Exploration tags        | 8                               | 7 (no `Corporate gifting`) |
| Testimonials CTA        | `View More`                     | none                       |
| Contact layout          | tags and form side by side      | stacked, tags first        |
| Root gradient           | 10 stops                        | different 10 stops         |
| Section separation      | 40px spacer after Snack Factory | 28px gap throughout        |

### Decisions worth knowing

- **Full-bleed backgrounds, centred content column.** Section backgrounds,
  the root gradient and the spacer run the full viewport width at both sizes.
  Contents stay on the frame's column via `--page-gutter` (desktop) and
  `--m-page-gutter` (mobile) in `tokens.css`. The rotated papads in
  `FeaturedStory` sit at Figma's exact offsets and sizes, anchored to the
  centred frame rather than the viewport, so they hold their designed
  position at any width. Figma bleeds both largely off the band — that is
  the design, not a bug.
- **One breakpoint, at 1024px** (`DESKTOP_MIN_WIDTH` in
  `src/lib/breakpoints.js`, mirrored in the `@media` blocks because CSS
  variables cannot be used in media conditions — change both together).
  Figma provides 1440 and 360 and nothing between, so this value is a
  judgement call, not a measurement.
- **The gaps between the two frames are interpolated**, and this is the one
  place the build is not a transcription:
  - 360→1023px runs the mobile frame. Its column is 304px at 360 exactly as
    designed, then grows with the viewport and stops at 480px.
  - 1024→1440px runs the desktop frame with its column shrinking. Card rows
    that Figma fixes at 352/736px became proportional flex, so the row still
    measures exactly 352/736 at 1440 and narrows cleanly below it.
    Hand over a tablet frame and this middle range can be made literal.
- **Copy is verbatim**, including `Paxkaging design` (2714:8755) and
  "Each one is a earned and treasured" (2714:8860). Fix them in Figma and
  they will be picked up on the next pass, rather than being silently
  corrected here.
- **Contact fields are real `<input>`s.** Figma draws them as static boxes
  with a text label; the box and text match the frame exactly and the label
  became the placeholder, so the form is actually usable.
- **Nav and footer links have no destinations** — the frame carries none.
  They render as the text Figma shows and need wiring once routes exist.
- **404 is a placeholder**, not from Figma.
- **Assets are the untouched Figma exports** (~38MB, `hero-bg.jpg` alone is
  9.5MB). Fidelity over weight, deliberately. They want compressing and
  probably `srcset` before this goes live.
- **Watch for empty exports.** `get_design_context` returned a fully
  transparent PNG for the testimonial portrait (2714:8863) — valid file,
  zero pixels. It was replaced with the real source image via
  `download_assets` → `rawImages`. If an image is silently missing after a
  re-pull, check the file has actual content before debugging CSS.

## Set up before launch

- `index.html` — page title, description, favicon, `lang`
- `src/styles/tokens.css` — fill from the Figma variables and styles
- `src/styles/global.css` — base font and colours from the Figma page styles
