import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import mark from '@/assets/icons/logo-header-group-1.svg'

import { api } from './api'
import Canvas from './Canvas.jsx'
import { describeChanges } from './changes'
import { StudioContext } from './context'
import { timeAgo } from './doc'
import { DEVICES } from './devices'
import { Icon } from './icons.jsx'
import Inspector from './Inspector.jsx'
import MediaLibrary from './MediaLibrary.jsx'
import Navigator from './Navigator.jsx'
import { Palette, PasswordDialog } from './Palette.jsx'
import { HistoryPanel, PublishDialog } from './Publish.jsx'
import { SETTINGS_GROUPS } from './schema'
import { Toasts } from './Toasts.jsx'
import { useDraft } from './useDraft'
import { useToasts } from './useToasts'
import {
  articleName,
  findText,
  itemName,
  listOf,
  pageName,
  previewPath,
  routesOf,
  whereFor,
} from './where'

/**
 * The studio: loads the draft (or offers to bring in the current
 * website), then the editor.
 */
export default function Studio({ onSignOut }) {
  const [draft, setDraft] = useState(undefined)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api('draft')
      .then(setDraft)
      .catch((err) => setError(err.message))
  }, [])

  async function importSite() {
    setBusy(true)
    try {
      setDraft(await api('import', { method: 'POST' }))
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  if (error) {
    return (
      <main className="blank">
        <p className="blank_error">
          <Icon name="alert" /> {error}
        </p>
      </main>
    )
  }
  if (draft === undefined) return <Skeleton />
  if (!draft.doc) {
    return (
      <main className="blank">
        <div aria-hidden="true" className="gate_mesh gate_meshSoft">
          <span className="gate_blob gate_blob1" />
          <span className="gate_blob gate_blob2" />
          <span className="gate_blob gate_blob3" />
        </div>
        <section className="welcome">
          <p className="eyebrow">Step one</p>
          <h1 className="display">
            A blank <em>studio.</em>
          </h1>
          <p className="welcome_text">
            Pull in the website as it is right now — every page, project and picture — and start
            from there. Nothing changes on the live site until you hit publish.
          </p>
          <button className="button button_primary button_big" disabled={busy} onClick={importSite} type="button">
            {busy ? 'Bringing it in…' : 'Bring in the website'} <Icon name="arrowRight" size={18} />
          </button>
        </section>
      </main>
    )
  }
  return <Editor initial={draft} onSignOut={onSignOut} />
}

/** The studio's shape while the draft loads. */
function Skeleton() {
  return (
    <div aria-busy="true" aria-label="Opening the studio" className="studio">
      <header className="topbar">
        <span className="island skel" style={{ width: 330, height: 50 }} />
        <span className="topbar_spacer" />
        <span className="island skel" style={{ width: 300, height: 50 }} />
      </header>
      <div className="workspace">
        <span className="island skel" />
        <span className="stage">
          <span className="skel skel_canvas" />
        </span>
        <span className="island skel" />
      </div>
    </div>
  )
}

function Editor({ initial, onSignOut }) {
  const draft = useDraft(initial)
  const { doc } = draft
  const { toasts, toast, dismiss } = useToasts()

  const [where, setWhere] = useState({ kind: 'page', path: '/' })
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('sections')
  const [device, setDevice] = useState('desktop')
  const [edit, setEdit] = useState(true)
  const [shownPath, setShownPath] = useState('/')
  const [reveal, setReveal] = useState(null)
  const [focusPath, setFocusPath] = useState(null)
  const [media, setMedia] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [looking, setLooking] = useState(null)
  const [published, setPublished] = useState(null)
  const [navOpen, setNavOpen] = useState(true)

  useEffect(() => {
    api('published')
      .then(setPublished)
      .catch(() => {})
  }, [])

  const list = listOf(doc, where)

  const go = useCallback(
    (next) => {
      setWhere(next)
      setSelected(null)
      setTab('sections')
      setShownPath((path) => previewPath(next, path))
      if (next.kind === 'testimonials') {
        const home = doc.pages.find((p) => p.path === '/')
        const at = home?.sections.findIndex((s) => s.type === 'testimonials') ?? -1
        if (at !== -1) setTimeout(() => setReveal({ index: at, n: Date.now() }), 400)
      }
      if (next.kind === 'settings' && ['exploration', 'contact', 'footer'].includes(next.group)) {
        const page = doc.pages.find((p) => p.path === shownPath)
        const at = page?.sections.findIndex((s) => s.type === 'footer' || s.type === 'siteFooter') ?? -1
        if (at !== -1) setTimeout(() => setReveal({ index: at, n: Date.now() }), 300)
      }
    },
    [doc.pages, shownPath],
  )

  const select = useCallback((index) => {
    setSelected(index)
    setFocusPath(null)
    if (index !== null) setReveal({ index, n: Date.now() })
  }, [])

  // Messages from the preview: a pick in edit mode, or where browsing went.
  const onMessage = useCallback(
    (message) => {
      if (message.type === 'pick') {
        if (message.target === 'header') {
          go({ kind: 'settings', group: 'navigation' })
          return
        }
        if (!list) return
        setSelected(message.target)
        setTab('sections')
        const item = list.items[message.target]
        const found = item && findText(item, message.text)
        setFocusPath(found ? [...list.path, message.target, ...found] : null)
      }
      if (message.type === 'navigated') {
        setShownPath(message.path)
        // Menu, footer and testimonials stay open while you look around.
        if (where.kind === 'settings' || where.kind === 'testimonials') return
        const next = whereFor(doc, message.path)
        if (next && previewPath(next) !== previewPath(where)) {
          setWhere(next)
          setSelected(null)
        }
      }
    },
    [doc, go, list, where],
  )

  // After a pick, open the field that holds the clicked words.
  useEffect(() => {
    if (!focusPath) return undefined
    const id = setTimeout(() => {
      for (let n = focusPath.length; n > 0; n--) {
        const el = document.querySelector(`[data-field="${focusPath.slice(0, n).join('.')}"]`)
        if (!el) continue
        const input = el.matches('input, textarea') ? el : el.querySelector('input, textarea')
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.remove('field_flash')
        void el.offsetWidth
        el.classList.add('field_flash')
        input?.focus({ preventScroll: true })
        break
      }
    }, 80)
    return () => clearTimeout(id)
  }, [focusPath, selected])

  const labels = useMemo(() => (list ? list.items.map((item) => itemName(list.schema, item)) : []), [list])

  const changes = useMemo(() => (published ? describeChanges(published.doc, doc) : []), [published, doc])

  const commands = useMemo(
    () => [
      ...doc.pages.map((p) => ({ id: `p${p.path}`, icon: p.path === '/' ? 'home' : 'page', label: pageName(p), hint: 'Page', run: () => go({ kind: 'page', path: p.path }) })),
      ...doc.projects.map((p) => ({ id: `j${p.slug}`, icon: 'project', swatch: p.background, label: p.title, hint: p.category ?? 'Project', run: () => go({ kind: 'project', slug: p.slug }) })),
      ...doc.articles.map((a) => ({ id: `a${a.slug}`, icon: 'article', label: articleName(a), hint: 'Article', run: () => go({ kind: 'article', slug: a.slug }) })),
      { id: 'testimonials', icon: 'quote', label: 'Testimonials', hint: 'On Home', run: () => go({ kind: 'testimonials' }) },
      ...Object.entries(SETTINGS_GROUPS).map(([group, def]) => ({ id: `s${group}`, icon: def.icon ?? 'sliders', label: def.label, hint: 'Everywhere', run: () => go({ kind: 'settings', group }) })),
      { id: 'media', icon: 'image', label: 'Media library', hint: 'Pictures & sounds', run: () => setMedia({}) },
      { id: 'history', icon: 'clock', label: 'History', hint: 'Past versions', run: () => setHistoryOpen(true) },
      { id: 'publish', icon: 'send', label: 'Publish', hint: 'Go live', run: () => setDialog('publish') },
      { id: 'password', icon: 'key', label: 'Change the password', hint: 'Account', run: () => setDialog('password') },
    ],
    [doc, go],
  )

  // Keyboard: undo, redo, save, go-to.
  const keys = useRef({})
  useEffect(() => {
    keys.current = { undo: draft.undo, redo: draft.redo, save: draft.saveNow }
  })
  useEffect(() => {
    function onKey(e) {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) {
        const typing = e.target.closest?.('input, textarea, select')
        if (e.key === 'Escape' && !typing && !document.querySelector('.modal')) setSelected(null)
        return
      }
      const key = e.key.toLowerCase()
      if (key === 'z' && !e.shiftKey) {
        e.preventDefault()
        keys.current.undo()
      } else if ((key === 'z' && e.shiftKey) || key === 'y') {
        e.preventDefault()
        keys.current.redo()
      } else if (key === 's') {
        e.preventDefault()
        keys.current.save()
      } else if (key === 'k') {
        e.preventDefault()
        setDialog('palette')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function signOut() {
    await draft.saveNow()
    await api('logout', { method: 'POST' }).catch(() => {})
    onSignOut()
  }

  function restore(version) {
    draft.replace(version.doc)
    toast(`Version ${version.version} is back in the draft. Publish to put it live again.`, {
      action: { label: 'Undo', run: draft.undo },
      ms: 8000,
    })
  }

  const context = useMemo(
    () => ({
      doc,
      set: draft.set,
      change: draft.change,
      undo: draft.undo,
      toast,
      routes: routesOf(doc),
      pickMedia: (options) => setMedia(options),
      reveal: focusPath,
    }),
    [doc, draft.set, draft.change, draft.undo, toast, focusPath],
  )

  const crumb = crumbFor(doc, where)
  const mac = navigator.platform.includes('Mac')

  return (
    <StudioContext.Provider value={context}>
      <div className="studio">
        <header className="topbar">
          <div className="island brand">
            <button
              aria-label={navOpen ? 'Hide the site list' : 'Show the site list'}
              aria-pressed={navOpen}
              className="iconButton"
              onClick={() => setNavOpen((o) => !o)}
              title="Site list"
              type="button"
            >
              <Icon name="sidebar" />
            </button>
            <span className="mark">
              <img alt="" src={mark} />
            </span>
            <span className="brand_name">Studio</span>
            <span aria-hidden="true" className="brand_slash">
              /
            </span>
            <button className="crumb" onClick={() => setDialog('palette')} title="Jump anywhere" type="button">
              <Icon name={crumb.icon} size={16} />
              <span className="crumb_label">{crumb.label}</span>
              <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
            </button>
          </div>

          <span className="topbar_spacer" />

          <SaveStatus status={draft.status} />

          <div className="island tools">
            <button aria-label="Undo" className="iconButton" disabled={!draft.canUndo} onClick={draft.undo} title={`Undo (${mac ? '⌘' : 'Ctrl'} Z)`} type="button">
              <Icon name="undo" />
            </button>
            <button aria-label="Redo" className="iconButton" disabled={!draft.canRedo} onClick={draft.redo} title={`Redo (${mac ? '⌘' : 'Ctrl'} ⇧ Z)`} type="button">
              <Icon name="redo" />
            </button>
            <span className="tools_rule" />
            <button aria-label="History" aria-pressed={historyOpen} className="iconButton" onClick={() => setHistoryOpen((o) => !o)} title="History" type="button">
              <Icon name="clock" />
            </button>
            <button aria-label="Media library" className="iconButton" onClick={() => setMedia({})} title="Media library" type="button">
              <Icon name="image" />
            </button>
          </div>

          <button className="publish" onClick={() => setDialog('publish')} type="button">
            <span>Publish</span>
            {changes.length ? (
              <span aria-label={`${changes.length} changes waiting`} className="publish_count">
                {changes.length}
              </span>
            ) : (
              <Icon name="arrowUpRight" size={16} />
            )}
          </button>

          <Menu onPassword={() => setDialog('password')} onSignOut={signOut} />
        </header>

        <div className={['workspace', !navOpen && 'workspace_noNav', historyOpen && 'workspace_history'].filter(Boolean).join(' ')}>
          {navOpen ? <Navigator onGo={go} where={where} /> : null}

          <main className="stage">
            {looking ? (
              <div className="looking">
                <Icon name="clock" size={16} />
                <span>
                  Viewing <strong>v{looking.version}</strong> · {timeAgo(looking.publishedAt)}
                  {looking.note ? ` · “${looking.note}”` : ''}
                </span>
                <button
                  className="button button_small button_light"
                  onClick={() => {
                    restore(looking)
                    setLooking(null)
                  }}
                  type="button"
                >
                  Bring it back
                </button>
                <button className="button button_small button_primary" onClick={() => setLooking(null)} type="button">
                  Back to draft
                </button>
              </div>
            ) : null}
            <Canvas
              device={device}
              doc={looking ? looking.doc : doc}
              dock={(scale) => (
                <Dock device={device} edit={edit} locked={Boolean(looking)} onDevice={setDevice} onEdit={setEdit} scale={scale} />
              )}
              edit={edit && !looking}
              labels={labels}
              onMessage={onMessage}
              path={shownPath}
              reveal={reveal}
              selected={selected}
            />
          </main>

          {historyOpen ? (
            <HistoryPanel
              looking={looking}
              onClose={() => {
                setHistoryOpen(false)
                setLooking(null)
              }}
              onLook={setLooking}
              onRestore={restore}
            />
          ) : looking ? null : (
            <Inspector
              onDeleted={() => go({ kind: 'page', path: '/work' })}
              onGo={go}
              onSelect={select}
              selected={selected}
              setTab={setTab}
              tab={tab}
              where={where}
            />
          )}
        </div>

        {media ? <MediaLibrary accept={media.accept} onClose={() => setMedia(null)} onPick={media.onPick} /> : null}
        {dialog === 'publish' ? (
          <PublishDialog
            changes={changes}
            onClose={() => setDialog(null)}
            onPublished={(result) => setPublished({ version: result.version, publishedAt: result.publishedAt, doc: result.doc })}
            doc={doc}
            published={published}
          />
        ) : null}
        {dialog === 'palette' ? <Palette commands={commands} onClose={() => setDialog(null)} /> : null}
        {dialog === 'password' ? <PasswordDialog onClose={() => setDialog(null)} toast={toast} /> : null}
        {draft.conflict ? <Conflict conflict={draft.conflict} onResolve={draft.resolveConflict} /> : null}
        <Toasts dismiss={dismiss} toasts={toasts} />
      </div>
    </StudioContext.Provider>
  )
}

/** What the breadcrumb says, and its icon. */
function crumbFor(doc, where) {
  if (where.kind === 'page') {
    const page = doc.pages.find((p) => p.path === where.path)
    return { icon: where.path === '/' ? 'home' : 'page', label: page ? pageName(page) : 'Page' }
  }
  if (where.kind === 'project') return { icon: 'project', label: doc.projects.find((p) => p.slug === where.slug)?.title ?? 'Project' }
  if (where.kind === 'article') return { icon: 'article', label: articleName(doc.articles.find((a) => a.slug === where.slug) ?? { slug: where.slug }) }
  if (where.kind === 'testimonials') return { icon: 'quote', label: 'Testimonials' }
  const group = SETTINGS_GROUPS[where.group]
  return { icon: group?.icon ?? 'sliders', label: group?.label ?? 'Settings' }
}

/** The floating dock under the canvas: mode, device, zoom. */
function Dock({ device, edit, locked, onDevice, onEdit, scale }) {
  return (
    <div className="dock">
      <div aria-label="Mode" className="dock_group" role="group">
        <button aria-pressed={edit && !locked} className="dock_toggle" disabled={locked} onClick={() => onEdit(true)} title="Click things on the page to edit them" type="button">
          <Icon name="pencil" size={16} /> Edit
        </button>
        <button aria-pressed={!edit || locked} className="dock_toggle" onClick={() => onEdit(false)} title="Use the site like a visitor" type="button">
          <Icon name="pointer" size={16} /> Browse
        </button>
      </div>
      <span className="dock_rule" />
      <div aria-label="Device" className="dock_group" role="group">
        {Object.entries(DEVICES).map(([key, { label }]) => (
          <button
            aria-label={label}
            aria-pressed={device === key}
            className="dock_device"
            key={key}
            onClick={() => onDevice(key)}
            title={`${label} · ${DEVICES[key].width}px`}
            type="button"
          >
            <Icon name={key} size={18} />
          </button>
        ))}
      </div>
      <span className="dock_rule" />
      <span className="dock_zoom" title="Scaled to fit">
        {Math.round(scale * 100)}%
      </span>
    </div>
  )
}

function SaveStatus({ status }) {
  const [, tick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 20000)
    return () => clearInterval(id)
  }, [])
  const view = {
    saved: { icon: 'cloud', text: status.at ? `Saved ${timeAgo(status.at)}` : 'Saved' },
    unsaved: { icon: 'pencil', text: 'Editing' },
    saving: { icon: 'cloud', text: 'Saving' },
    retrying: { icon: 'cloudOff', text: 'Offline — retrying' },
    conflict: { icon: 'alert', text: 'Saved elsewhere' },
    error: { icon: 'alert', text: status.message },
  }[status.state]
  return (
    <span className={`save save_${status.state}`} title={status.message}>
      <Icon name={view.icon} size={16} />
      {view.text}
    </span>
  )
}

function Menu({ onPassword, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])
  const item = (icon, label, run, danger) => (
    <button
      className={danger ? 'menu_item menu_itemDanger' : 'menu_item'}
      onClick={() => {
        setOpen(false)
        run()
      }}
      role="menuitem"
      type="button"
    >
      <Icon name={icon} size={17} />
      {label}
    </button>
  )
  return (
    <div className="menu" ref={ref}>
      <button aria-expanded={open} aria-haspopup="menu" aria-label="Account" className="avatar" onClick={() => setOpen((o) => !o)} type="button">
        DD
      </button>
      {open ? (
        <div className="menu_list" role="menu">
          <p className="menu_who">
            <strong>Design Dimensions</strong>
            <span>Team account</span>
          </p>
          {item('key', 'Change the password', onPassword)}
          {item('logout', 'Sign out', onSignOut, true)}
        </div>
      ) : null}
    </div>
  )
}

function Conflict({ conflict, onResolve }) {
  return (
    <div className="modal">
      <section className="dialog dialog_small" role="alertdialog">
        <span className="dialog_icon">
          <Icon name="alert" size={22} />
        </span>
        <h2 className="dialog_title">Two tabs, one draft</h2>
        <p className="dialog_text">
          Someone saved from another tab or computer {timeAgo(conflict.savedAt)}. Which version do you
          want to keep?
        </p>
        <div className="dialog_actions">
          <button className="button button_light" onClick={() => onResolve('theirs')} type="button">
            Load theirs
          </button>
          <button className="button button_primary" onClick={() => onResolve('mine')} type="button">
            Keep mine
          </button>
        </div>
      </section>
    </div>
  )
}
