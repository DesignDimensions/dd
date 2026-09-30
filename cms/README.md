# Studio

The website's own content editor. It runs on any cPanel host with PHP —
no database, no outside services — and the website reads what it
publishes.

```
cms/
  api/        the PHP backend (index.php + lib/), config.php to adjust
  app/        the studio's HTML entry points (the React code is src/studio)
  storage/    drafts, history, the password hash — never web-readable
  uploads/    the media library
```

## Build it

```bash
npm run studio:build      # → build/studio, ready to upload
npm run studio:seed       # the same, and re-export the starting content
```

`build/studio` holds everything: the studio app, the API, and `uploads/seed`
with every picture the site uses today. Rebuilding keeps `storage/` and
your uploads, so it's safe to rebuild a studio that's in use.

## Put it on cPanel

1. **Check PHP.** In cPanel → _Select PHP Version_, choose **8.1 or newer**
   and make sure `fileinfo` and `gd` are ticked (they usually are).
2. **Upload.** Zip `build/studio`, upload it with _File Manager_ into
   `public_html/`, and extract it. You now have `public_html/studio/`.
3. **Permissions.** `studio/storage` and `studio/uploads` must be writable
   by PHP (755 folders is standard on cPanel; the studio says so plainly if
   they aren't).
4. **Open it.** Visit `https://your-domain/studio/`. The first visit asks
   you to choose the team's password. Then **Bring in the current website**
   — every page, project and picture comes across, ready to edit.
5. **Publish once.** Press _Publish_. Until then there's nothing for the
   website to read, and it keeps showing the content it was built with.

Optional, for extra safety: move `storage` outside `public_html` and point
`storage_dir` in `api/config.php` at it.

## Connect the website

The website needs to know where the studio is, at build time:

- **GitHub Pages** (the current deploy): in the repository's _Settings →
  Secrets and variables → Actions → Variables_, add `VITE_CMS_URL` =
  `https://your-domain/studio`, then re-run the deploy.
- **Anywhere else**: build with `VITE_CMS_URL=https://your-domain/studio npm run build`.

If the website is on a different domain from the studio (GitHub Pages is),
list the website's address in `allowed_origins` in `studio/api/config.php`.

From then on, publishing in the studio changes the website straight away —
no rebuild. If the studio is ever unreachable, the website quietly shows
the content it was built with.

## Using it

- **Click anything on the page** to edit it: the section opens on the right
  with the field you clicked already selected. Type, and the page changes
  as you go.
- **Edit / Browse** at the top: _Edit_ makes the page clickable for
  editing; _Browse_ uses the site like a visitor, and the studio follows
  wherever you go.
- **Desktop / Tablet / Phone** shows the page at each size. Sections whose
  wording differs on phones have an _On phones_ tab.
- **Sections** can be dragged into a new order, duplicated, removed, or
  added with the thin **+** between them.
- **Pictures**: drop a file straight onto any picture field, or open the
  media library. Big photos are scaled down on upload.
- **Projects**: _+ New_ starts one with a banner, title card, text and
  picture ready to fill. Drag projects to set the Work diary's order.
- Everything **saves on its own** a moment after you stop typing.
  **Undo / redo** go back a word at a time (Ctrl Z / Ctrl Shift Z).
- **Ctrl K** jumps to any page, project or setting.
- **Publish** shows what's changing before it goes live. **History** keeps
  every published version: look at an old one, and bring it back if you
  need it.

## How it fits together

- `src/content` — the content model. `document.js` builds the whole site as
  one document; `select.js` turns a document into what the components read.
- `src/content/load.js` — the website loads the published document from the
  studio (`api/?r=content`), falling back to the built-in one.
- `src/studio` — the editor. `schema.js` describes every section and block
  and its fields; the forms are built from it.
- `cms/api` — stores the draft and published document as JSON files, keeps
  History, handles uploads and the password.

Adding a new kind of section to the site: build the component, add it to
`src/components/page/sections.js`, and describe its fields in
`src/studio/schema.js` — the studio can then add and edit it.
