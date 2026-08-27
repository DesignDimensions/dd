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

### Reference: wepresent.wetransfer.com

Presentation is modelled on wepresent. The values below were read out of
its own stylesheet rather than eyeballed, and live in `tokens.css`:

|                   | wepresent                                 | here                                |
| ----------------- | ----------------------------------------- | ----------------------------------- |
| Content column    | `--wrapper-max-width: 1120px`             | `--content-width` (already matched) |
| Page gutter       | `--h-padding: 20px → 40px`                | `--page-inset`                      |
| Section rhythm    | `--section-content-gap: 20px → 42px`      | `--section-gap`                     |
| Section radius    | `--rounded-4: 24px`                       | `--section-radius`                  |
| Card radius       | `--rounded-3: 16px`                       | `--card-radius`                     |
| Card media radius | `--rounded-2: 8px`                        | `--card-media-radius`               |
| Rest shadow       | `drop-shadow(0 10px 19px rgb(0 0 0/4%))`  | `--elevation-rest`                  |
| Hover shadow      | `drop-shadow(0 30px 30px rgb(0 0 0/15%))` | `--elevation-hover`                 |
| Image zoom        | `scale(1.15)` over `.5s`                  | `--card-zoom`                       |
| Shadow transition | `filter .3s`                              | same                                |
| Curve             | `cubic-bezier(.165,.84,.44,1)`            | `--ease-ref`                        |

Nothing in that table was chosen by eye. Section radius is one value at every
width rather than stepping 24 → 40 across the breakpoint, and cards sit one
step below sections on the same scale (16 under 24). The stepping and the
mismatched radii were what made the spacing read as arbitrary.

Radii outside this scale are Figma component values rather than layout
spacing: the 20px chips and tags, 28px form fields, 32px testimonial
portrait, 12px CTA.

**Two kinds of section.** The page is framed down both sides and along the
bottom — but not the top, so the header and hero sit flush against the
viewport edge. Sections fall into one of two treatments, never a mix of
widths within one:

| Treatment          | Sections                                                  | Why                                                  |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------- |
| Full bleed, square | Hero, Snack Factory, Featured Story, Exploration, Contact | Top block, or fill that is already the page gradient |
| Boxed              | Work diary, Design Dialogue, Testimonials                 | Fill is their own — white or `#fafafa`               |

Featured Story, Exploration and Contact are transparent rather than filled.
That is not a styling choice: the root gradient's stops are `#ffeab2`,
`#ffc6c9` and `#efddaf` — exactly the fills Figma gives those three. Painting
them again over a gradient that already carries those colours is what
produced mismatched rounded corners at the joins.

Everything that bleeds is square. A rounded corner on a full-width block
sits at a different x than a rounded corner on a boxed one, and the eye
reads that step as a mistake. Figma's 40px bottom radius on Snack Factory is
dropped for this reason — restore it by putting `border-bottom-*-radius`
back on `.section` if you want the curve.

Boxed sections carry `--section-radius` and `--elevation-section`, matching
`.section-wrapper.has-background` in the reference.

Bleeding sections sit outside the page padding, so they use `--bleed-gutter`
to absorb it. Verified: both treatments put their content on an identical
column at every width, so it never steps in or out as you scroll.

**Carousels.** The three-card rows are rails. Cards hold their exact 352px
frame width and the rail scrolls when they no longer fit, instead of the
cards shrinking below the design — so the row is pixel-exact at 1280 and up,
and scrollable below. Controls only render when there is somewhere to
scroll; native scroll and trackpad swipe work regardless.

**Card hover** is the reference behaviour exactly: the shadow lifts from
elevation-1 to elevation-3 over 0.3s while the image scales to 1.15 over
0.5s, both on their curve. (This restores the image zoom removed earlier —
now matched to a specific reference rather than invented.)

### Motion

Beyond the hover behaviour above there is none — no scroll reveals, no
parallax, no floating, nothing following the cursor, and no animation
runtime in the bundle.

Every other control inverts on hover, pure CSS: CTAs, tags, icon buttons,
the Genre and Newest chips, both search bars, the mobile menu, nav items and
footer links (a rule grows from the left), and form fields.

Icon colours run through inheritable custom properties — `--icon-ring`,
`--icon-glyph`, `--icon-bg` — so a card can invert the arrow inside it
without reaching across CSS-module boundaries. Icons are inline SVG using
Figma's exact exported paths, because an `<img>` cannot recolour.

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
