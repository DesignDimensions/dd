import { useEffect, useMemo, useRef, useState } from 'react'

import { useStudio } from './context'
import { clone, getIn, insertAt, move, removeAt, setIn, slugify } from './doc'
import { Fields, MobileFields } from './fields.jsx'
import { Icon } from './icons.jsx'
import { PROJECT_FIELDS, SEARCH_FIELDS, SETTINGS_GROUPS, TESTIMONIAL_FIELDS } from './schema'
import SectionSketch from './SectionSketch.jsx'
import { articleName, listOf, pageName } from './where'

/**
 * The right-hand panel: whatever is being edited. For a page, project or
 * article, its sections (reorder, add, duplicate, remove) or the one
 * picked; otherwise testimonials or a group of settings.
 */
export default function Inspector({ onDeleted, onGo, onSelect, selected, tab, setTab, where }) {
  const { doc } = useStudio()
  const list = listOf(doc, where)

  if (where.kind === 'testimonials') return <TestimonialsPanel />
  if (where.kind === 'settings') return <SettingsPanel group={where.group} />
  if (!list) return <aside className="island inspector" />

  if (selected !== null && list.items[selected]) {
    return <SectionEditor index={selected} list={list} onBack={() => onSelect(null)} onGo={onGo} onSelect={onSelect} />
  }

  const head = headFor(doc, where)
  return (
    <aside className="island inspector">
      <header className="insp_head">
        <Chip {...head.chip} />
        <h2 className="insp_title">{head.title}</h2>
        <Segmented
          onChange={setTab}
          options={[
            ['sections', `Sections · ${list.items.length}`],
            ['details', where.kind === 'page' ? 'Search card' : 'Details'],
          ]}
          value={tab}
        />
      </header>
      {tab === 'details' ? <Details onDeleted={onDeleted} where={where} /> : <SectionList list={list} onSelect={onSelect} />}
    </aside>
  )
}

function headFor(doc, where) {
  if (where.kind === 'page') {
    const page = doc.pages.find((p) => p.path === where.path)
    return { chip: { icon: where.path === '/' ? 'home' : 'page', label: 'Page', tone: 'mint' }, title: pageName(page) }
  }
  if (where.kind === 'project') {
    const project = doc.projects.find((p) => p.slug === where.slug)
    return { chip: { label: 'Project', swatch: project?.background, tone: 'butter' }, title: project?.title }
  }
  const article = doc.articles.find((a) => a.slug === where.slug)
  return { chip: { icon: 'article', label: 'Article', tone: 'lilac' }, title: articleName(article) }
}

export function Chip({ icon, label, swatch, tone = 'mint' }) {
  return (
    <span className={`chip chip_${tone}`}>
      {swatch ? <span className="chip_swatch" style={{ background: swatch }} /> : <Icon name={icon} size={14} />}
      {label}
    </span>
  )
}

export function Segmented({ onChange, options, value }) {
  return (
    <div className="seg" role="tablist">
      {options.map(([key, label]) => (
        <button aria-selected={value === key} className="seg_option" key={key} onClick={() => onChange(key)} role="tab" type="button">
          {label}
        </button>
      ))}
    </div>
  )
}

/** A section's type name and the words that tell it apart. */
function parts(schema, item) {
  const def = schema[item.type]
  const detail = item.heading ?? item.title ?? item.label ?? item.eyebrow ?? item.text
  const text = Array.isArray(detail) ? detail.join(' ') : detail
  return {
    title: def?.label ?? item.type,
    sub: typeof text === 'string' && def?.fields?.length ? text : def?.fields?.length || def?.mobile ? '' : 'Looks after itself',
  }
}

// ---------------------------------------------------------------------------
// The list of sections
// ---------------------------------------------------------------------------

function SectionList({ list, onSelect }) {
  const { change, toast, undo } = useStudio()
  const [drag, setDrag] = useState(null)
  const [adding, setAdding] = useState(null)

  const update = (fn) => change((doc) => setIn(doc, list.path, fn(getIn(doc, list.path))))

  function remove(i) {
    const { title } = parts(list.schema, list.items[i])
    update((items) => removeAt(items, i))
    toast(`Removed ${title}`, { action: { label: 'Undo', run: undo } })
  }

  function add(type, at) {
    update((items) => insertAt(items, at, { type, ...list.schema[type].template() }))
    setAdding(null)
    onSelect(at)
  }

  if (adding !== null) {
    return <AddPicker onCancel={() => setAdding(null)} onPick={(type) => add(type, adding)} schema={list.schema} />
  }

  return (
    <div className="insp_body">
      <p className="hint">
        <Icon name="pointer" size={14} /> Click a section here or right on the page. Drag to reorder.
      </p>
      <ol className="rows">
        {list.items.map((item, i) => {
          const { title, sub } = parts(list.schema, item)
          return (
            <li key={i}>
              <button aria-label={`Add a section before ${title}`} className="rows_insert" onClick={() => setAdding(i)} type="button">
                <span>
                  <Icon name="plus" size={12} strokeWidth={2.4} />
                </span>
              </button>
              <div
                className={['row', drag?.from === i && 'row_dragging', drag?.over === i && drag.from !== i && (drag.from < i ? 'row_dropAfter' : 'row_dropBefore')].filter(Boolean).join(' ')}
                draggable
                onDragEnd={() => setDrag(null)}
                onDragOver={(e) => {
                  if (!drag) return
                  e.preventDefault()
                  if (drag.over !== i) setDrag({ ...drag, over: i })
                }}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', String(i))
                  setDrag({ from: i, over: i })
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  if (drag && drag.from !== i) update((items) => move(items, drag.from, i))
                  setDrag(null)
                }}
              >
                <span aria-hidden="true" className="row_grip">
                  <Icon name="grip" size={16} />
                </span>
                <button className="row_main" data-outline-item={title} onClick={() => onSelect(i)} type="button">
                  <span className="row_sketch">
                    <SectionSketch type={item.type} />
                  </span>
                  <span className="row_text">
                    <span className="row_title">{title}</span>
                    {sub ? <span className="row_sub">{sub}</span> : null}
                  </span>
                </button>
                <span className="row_actions">
                  <button aria-label="Duplicate" className="iconButton iconButton_small" onClick={() => update((items) => insertAt(items, i + 1, clone(item)))} title="Duplicate" type="button">
                    <Icon name="copy" size={16} />
                  </button>
                  <button aria-label="Remove" className="iconButton iconButton_small iconButton_danger" onClick={() => remove(i)} title="Remove" type="button">
                    <Icon name="trash" size={16} />
                  </button>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
      <button className="addButton" onClick={() => setAdding(list.items.length)} type="button">
        <Icon name="plus" size={16} /> Add a section
      </button>
    </div>
  )
}

function AddPicker({ onCancel, onPick, schema }) {
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const types = useMemo(() => {
    const seen = new Set()
    const q = query.trim().toLowerCase()
    return Object.entries(schema)
      .filter(([, def]) => (seen.has(def) ? false : seen.add(def)))
      .filter(([, def]) => !q || def.label.toLowerCase().includes(q) || def.about.toLowerCase().includes(q))
  }, [schema, query])

  return (
    <div className="insp_body picker">
      <div className="picker_head">
        <button className="back" onClick={onCancel} type="button">
          <Icon name="arrowLeft" size={16} /> Sections
        </button>
        <h3 className="picker_title">
          Add a <em>section</em>
        </h3>
        <label className="search">
          <Icon name="search" size={16} />
          <input onChange={(e) => setQuery(e.target.value)} placeholder="Search sections" ref={ref} value={query} />
        </label>
      </div>
      <div className="picker_grid">
        {types.map(([type, def]) => (
          <button className="pick" key={type} onClick={() => onPick(type)} type="button">
            <span className="pick_sketch">
              <SectionSketch type={type} />
            </span>
            <span className="pick_name">{def.label}</span>
            <span className="pick_about">{def.about}</span>
          </button>
        ))}
        {!types.length ? <p className="empty_note">No section like that — try “picture” or “text”.</p> : null}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// One section
// ---------------------------------------------------------------------------

function SectionEditor({ index, list, onBack, onGo, onSelect }) {
  const { change, toast, undo } = useStudio()
  const item = list.items[index]
  const def = list.schema[item.type]
  const path = [...list.path, index]
  const [view, setView] = useState('words')

  const update = (fn) => change((doc) => setIn(doc, list.path, fn(getIn(doc, list.path))))
  const editable = def?.fields?.length || def?.mobile

  return (
    <aside className="island inspector">
      <header className="insp_head">
        <button className="back" onClick={onBack} type="button">
          <Icon name="arrowLeft" size={16} /> Sections
        </button>
        <div className="insp_hero">
          <span className="insp_sketch">
            <SectionSketch type={item.type} />
          </span>
          <div>
            <p className="insp_count">
              {String(index + 1).padStart(2, '0')} <span>/ {String(list.items.length).padStart(2, '0')}</span>
            </p>
            <h2 className="insp_title">{def?.label ?? item.type}</h2>
          </div>
        </div>
        {def?.about ? <p className="insp_about">{def.about}</p> : null}
        {def?.mobile ? (
          <Segmented
            onChange={setView}
            options={[
              ['words', 'Words & pictures'],
              ['phone', 'On phones'],
            ]}
            value={view}
          />
        ) : null}
      </header>

      <div className="insp_body">
        {def?.go ? (
          <div className="goList">
            {def.go.map((link) => (
              <button className="goList_item" key={link.label} onClick={() => onGo(link.where)} type="button">
                <span>{link.label}</span>
                <Icon name="arrowRight" size={16} />
              </button>
            ))}
          </div>
        ) : null}
        {editable ? (
          view === 'phone' ? (
            <MobileFields fields={def.fields} keys={def.mobile} path={path} value={item} />
          ) : (
            <Fields fields={def.fields} path={path} value={item} />
          )
        ) : def?.go ? null : (
          <div className="calm">
            <Icon name="sparkle" size={22} />
            <p>Nothing to fill in here — this one looks after itself.</p>
          </div>
        )}
      </div>

      <footer className="insp_foot">
        <button
          aria-label="Move up"
          className="iconButton"
          disabled={index === 0}
          onClick={() => {
            update((items) => move(items, index, index - 1))
            onSelect(index - 1)
          }}
          title="Move up"
          type="button"
        >
          <Icon name="arrowUp" />
        </button>
        <button
          aria-label="Move down"
          className="iconButton"
          disabled={index === list.items.length - 1}
          onClick={() => {
            update((items) => move(items, index, index + 1))
            onSelect(index + 1)
          }}
          title="Move down"
          type="button"
        >
          <Icon name="arrowDown" />
        </button>
        <button
          aria-label="Duplicate"
          className="iconButton"
          onClick={() => {
            update((items) => insertAt(items, index + 1, clone(item)))
            onSelect(index + 1)
          }}
          title="Duplicate"
          type="button"
        >
          <Icon name="copy" />
        </button>
        <span className="topbar_spacer" />
        <button
          className="button button_small button_dangerGhost"
          onClick={() => {
            update((items) => removeAt(items, index))
            onBack()
            toast(`Removed ${def?.label ?? item.type}`, { action: { label: 'Undo', run: undo } })
          }}
          type="button"
        >
          <Icon name="trash" size={16} /> Remove
        </button>
      </footer>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Project / article / page details
// ---------------------------------------------------------------------------

function Details({ onDeleted, where }) {
  const { doc } = useStudio()
  if (where.kind === 'page') {
    const i = doc.pages.findIndex((p) => p.path === where.path)
    const page = doc.pages[i]
    return (
      <div className="insp_body">
        <p className="hint">
          <Icon name="search" size={14} /> How {pageName(page)} shows up when someone searches the site.
        </p>
        {page.search ? (
          <Fields fields={SEARCH_FIELDS} path={['pages', i, 'search']} value={page.search} />
        ) : (
          <p className="empty_note">This page stays out of search.</p>
        )}
      </div>
    )
  }
  if (where.kind === 'project') return <ProjectDetails onDeleted={onDeleted} slug={where.slug} />
  return <ArticleDetails onDeleted={onDeleted} slug={where.slug} />
}

function ProjectDetails({ onDeleted, slug }) {
  const { change, doc, set, toast, undo } = useStudio()
  const i = doc.projects.findIndex((p) => p.slug === slug)
  const project = doc.projects[i]
  const followsColour = !project.story.ground || project.story.ground === project.background

  // The page colour follows the project colour unless set apart.
  const overrides = {
    background: (colour) =>
      change((d) => {
        let out = setIn(d, ['projects', i, 'background'], colour)
        if (followsColour) out = setIn(out, ['projects', i, 'story', 'ground'], colour)
        return out
      }),
  }

  return (
    <div className="insp_body">
      <Fields fields={PROJECT_FIELDS} overrides={overrides} path={['projects', i]} value={project} />
      <label className="toggle">
        <input
          checked={followsColour}
          onChange={(e) => set(['projects', i, 'story', 'ground'], e.target.checked ? project.background : '#f0f0f0')}
          type="checkbox"
        />
        <span aria-hidden="true" className="toggle_track">
          <span className="toggle_thumb" />
        </span>
        <span className="toggle_label">Its page wears the project colour</span>
      </label>
      <Address
        kind="project"
        onRename={(next) => change((d) => renameProject(d, slug, next))}
        prefix="/work/"
        slug={slug}
        taken={doc.projects.map((p) => p.slug)}
      />
      <DangerZone
        label="Remove this project"
        onConfirm={() => {
          change((d) => ({ ...d, projects: removeAt(d.projects, i) }))
          onDeleted()
          toast(`Removed ${project.title}`, { action: { label: 'Undo', run: undo } })
        }}
      />
    </div>
  )
}

function ArticleDetails({ onDeleted, slug }) {
  const { change, doc, toast, undo } = useStudio()
  const i = doc.articles.findIndex((a) => a.slug === slug)
  const article = doc.articles[i]
  return (
    <div className="insp_body">
      <p className="hint">
        <Icon name="search" size={14} /> How the article shows up in search.
      </p>
      <Fields fields={SEARCH_FIELDS} path={['articles', i, 'search']} value={article.search} />
      <Address
        kind="article"
        onRename={(next) =>
          change((d) => {
            const out = JSON.parse(JSON.stringify(d).replaceAll(`"/design-dialogue/${slug}"`, `"/design-dialogue/${next}"`))
            out.articles[i] = { ...out.articles[i], slug: next }
            return out
          })
        }
        prefix="/design-dialogue/"
        slug={slug}
        taken={doc.articles.map((a) => a.slug)}
      />
      <DangerZone
        label="Remove this article"
        onConfirm={() => {
          change((d) => ({ ...d, articles: removeAt(d.articles, i) }))
          onDeleted()
          toast(`Removed ${articleName(article)}`, { action: { label: 'Undo', run: undo } })
        }}
      />
    </div>
  )
}

/** Renaming a project moves every link, testimonial and rail that points to it. */
function renameProject(doc, from, to) {
  const out = JSON.parse(JSON.stringify(doc).replaceAll(`"/work/${from}"`, `"/work/${to}"`))
  out.projects = out.projects.map((p) =>
    p.slug === from
      ? {
          ...p,
          slug: to,
          story: { ...p.story, blocks: p.story.blocks.map((b) => (b.type === 'moreProjects' ? { ...b, current: to } : b)) },
        }
      : p,
  )
  out.testimonials = out.testimonials.map((t) => (t.project === from ? { ...t, project: to } : t))
  return out
}

function Address({ kind, onRename, prefix, slug, taken }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(slug)
  const next = slugify(text)
  const clash = next !== slug && taken.includes(next)

  return (
    <div className="field">
      <span className="field_label">Web address</span>
      {editing ? (
        <form
          className="address"
          onSubmit={(e) => {
            e.preventDefault()
            if (clash || !next) return
            if (next !== slug) onRename(next)
            setEditing(false)
          }}
        >
          <span className="address_prefix">{prefix}</span>
          <input autoFocus className="field_input" onChange={(e) => setText(e.target.value)} value={text} />
          <button className="button button_small button_primary" disabled={clash} type="submit">
            Save
          </button>
        </form>
      ) : (
        <button className="address_value" onClick={() => (setText(slug), setEditing(true))} type="button">
          <Icon name="link" size={15} />
          <span>
            {prefix}
            <strong>{slug}</strong>
          </span>
          <Icon name="pencil" size={14} />
        </button>
      )}
      {editing ? (
        <span className={clash ? 'field_hint field_hintError' : 'field_hint'}>
          {clash
            ? `Another ${kind} already lives at ${prefix}${next}.`
            : 'Links across the site follow along. Old links elsewhere on the web will stop working.'}
        </span>
      ) : null}
    </div>
  )
}

function DangerZone({ label, onConfirm }) {
  const [sure, setSure] = useState(false)
  return (
    <div className="danger">
      {sure ? (
        <>
          <span>Sure? You can undo it right after.</span>
          <button className="button button_small button_danger" onClick={onConfirm} type="button">
            Yes, remove
          </button>
          <button className="button button_small button_ghost" onClick={() => setSure(false)} type="button">
            Keep it
          </button>
        </>
      ) : (
        <button className="button button_small button_dangerGhost" onClick={() => setSure(true)} type="button">
          <Icon name="trash" size={15} /> {label}
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Testimonials and settings
// ---------------------------------------------------------------------------

function TestimonialsPanel() {
  const { doc } = useStudio()
  const field = {
    key: 'testimonials',
    label: 'Quotes',
    type: 'list',
    itemLabel: (t) => [t.name, doc.projects.find((p) => p.slug === t.project)?.title].filter(Boolean).join(' · '),
    thumb: (t) => t.portrait,
    addLabel: 'Add a testimonial',
    fields: TESTIMONIAL_FIELDS,
    template: () => ({ project: doc.projects[0]?.slug, name: 'Name', role: 'Role', quote: '“Kind words.”' }),
  }
  return (
    <aside className="island inspector">
      <header className="insp_head">
        <Chip icon="quote" label="On Home" tone="blush" />
        <h2 className="insp_title">Testimonials</h2>
        <p className="insp_about">Client quotes that rotate on Home. Each wears its project’s colour.</p>
      </header>
      <div className="insp_body">
        <Fields fields={[field]} path={[]} value={doc} />
      </div>
    </aside>
  )
}

function SettingsPanel({ group }) {
  const { doc } = useStudio()
  const def = SETTINGS_GROUPS[group]
  const [view, setView] = useState('words')
  const path = ['settings', ...(def.base ?? [])]
  const value = getIn(doc, path)
  return (
    <aside className="island inspector">
      <header className="insp_head">
        <Chip icon={def.icon ?? 'sliders'} label="Everywhere" tone="sky" />
        <h2 className="insp_title">{def.label}</h2>
        <p className="insp_about">{def.about}</p>
        {def.mobile ? (
          <Segmented
            onChange={setView}
            options={[
              ['words', 'Words'],
              ['phone', 'On phones'],
            ]}
            value={view}
          />
        ) : null}
      </header>
      <div className="insp_body">
        {view === 'phone' ? (
          <MobileFields fields={def.fields} keys={def.mobile} path={path} value={value} />
        ) : (
          <Fields fields={def.fields} path={path} value={value} />
        )}
      </div>
    </aside>
  )
}
