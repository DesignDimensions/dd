import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { clone, getIn, insertAt, move, removeAt, setIn } from './doc'
import { useStudio } from './context'
import { Icon } from './icons.jsx'
import { uploadFile } from './media'

/**
 * Forms built from the schema (schema.js): `<Fields>` renders a list of
 * field definitions for an object at a path in the draft, one control per
 * type. Every change goes straight into the draft, so the preview follows
 * each keystroke.
 */
export function Fields({ fields, overrides, value, path }) {
  return (
    <div className="fields">
      {fields.map((field) =>
        field.when && !field.when(value ?? {}) ? null : (
          <Field
            field={field}
            key={field.key}
            onChange={overrides?.[field.key]}
            path={[...path, field.key]}
            value={value?.[field.key]}
          />
        ),
      )}
    </div>
  )
}

/**
 * The phone wording for a section: each field the phone layout can say
 * differently, following the desktop wording until given its own.
 */
export function MobileFields({ fields, keys, value, path }) {
  const { set } = useStudio()
  const mobile = value?.mobile ?? {}
  const defs = keys
    .map((key) =>
      typeof key === 'string' ? fields.find((f) => f.key === key) : key,
    )
    .filter(Boolean)

  return (
    <div className="fields">
      {defs.map((field) => {
        const own = mobile[field.key] !== undefined
        return (
          <div className="mobileField" key={field.key}>
            <div className="mobileField_head">
              <span className="field_label">{field.label}</span>
              <button
                className="linkButton"
                onClick={() =>
                  set(
                    [...path, 'mobile'],
                    own
                      ? withoutKey(mobile, field.key)
                      : {
                          ...mobile,
                          [field.key]: clone(value?.[field.key] ?? ''),
                        },
                  )
                }
                type="button"
              >
                {own ? 'Use the desktop wording' : 'Word it differently'}
              </button>
            </div>
            {own ? (
              <Field
                bare
                field={field}
                path={[...path, 'mobile', field.key]}
                value={mobile[field.key]}
              />
            ) : (
              <p className="mobileField_same">
                Same as desktop{preview(value?.[field.key])}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function withoutKey(object, key) {
  const copy = { ...object }
  delete copy[key]
  return Object.keys(copy).length ? copy : undefined
}

function preview(value) {
  if (typeof value === 'string' && value)
    return ` — “${value.length > 48 ? value.slice(0, 48) + '…' : value}”`
  if (Array.isArray(value) && typeof value[0] === 'string')
    return ` — “${value.join(' ').slice(0, 48)}”`
  return ''
}

function Field({ field, path, value, bare = false, onChange: override }) {
  const { set } = useStudio()
  const id = useId()
  const onChange = override ?? ((next) => set(path, next))
  const control = (
    <Control
      field={field}
      id={id}
      onChange={onChange}
      path={path}
      value={value}
    />
  )

  if (
    field.type === 'list' ||
    field.type === 'group' ||
    field.type === 'toggle' ||
    bare
  )
    return control

  return (
    <div className="field" data-field={path.join('.')}>
      <label className="field_label" htmlFor={id}>
        {field.label}
      </label>
      {control}
      {field.hint ? <span className="field_hint">{field.hint}</span> : null}
    </div>
  )
}

function Control({ field, id, onChange, path, value }) {
  switch (field.type) {
    case 'text':
      return (
        <input
          className="field_input"
          id={id}
          onChange={(e) =>
            onChange(
              field.optional && e.target.value === ''
                ? undefined
                : e.target.value,
            )
          }
          placeholder={field.placeholder ?? (field.optional ? 'None' : '')}
          type="text"
          value={value ?? ''}
        />
      )
    case 'textarea':
      return (
        <AutoText
          id={id}
          onChange={(text) =>
            onChange(field.optional && text === '' ? undefined : text)
          }
          placeholder={field.placeholder ?? (field.optional ? 'None' : '')}
          value={value ?? ''}
        />
      )
    case 'lines':
      return (
        <AutoText
          id={id}
          onChange={(text) => onChange(text.split('\n'))}
          value={Array.isArray(value) ? value.join('\n') : (value ?? '')}
        />
      )
    case 'number':
      return (
        <input
          className="field_input field_inputNarrow"
          id={id}
          min="0"
          onChange={(e) =>
            onChange(e.target.value === '' ? undefined : Number(e.target.value))
          }
          placeholder={field.optional ? 'All' : ''}
          type="number"
          value={value ?? ''}
        />
      )
    case 'toggle':
      return (
        <Toggle
          checked={Boolean(value)}
          label={field.label}
          onChange={onChange}
        />
      )
    case 'select':
      return (
        <select
          className="field_input field_select"
          id={id}
          onChange={(e) =>
            onChange(e.target.value === '' ? undefined : e.target.value)
          }
          value={value ?? ''}
        >
          {field.optional && !field.options.some((o) => o.value === '') ? (
            <option value="">Default</option>
          ) : null}
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    case 'color':
      return (
        <ColorField
          id={id}
          onChange={onChange}
          optional={field.optional}
          value={value}
        />
      )
    case 'image':
    case 'audio':
      return (
        <MediaField
          field={field}
          id={id}
          onChange={onChange}
          path={path}
          value={value}
        />
      )
    case 'tags':
      return <TagsField id={id} onChange={onChange} value={value ?? []} />
    case 'link':
      return (
        <LinkField
          id={id}
          onChange={onChange}
          optional={field.optional}
          value={value}
        />
      )
    case 'project':
      return <ProjectField id={id} onChange={onChange} value={value} />
    case 'group':
      return <GroupField field={field} path={path} value={value} />
    case 'list':
      return <ListField field={field} path={path} value={value ?? []} />
    default:
      return null
  }
}

/** A textarea that grows with what's written in it. */
function AutoText({ id, onChange, placeholder, value }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + 2}px`
  }, [value])
  return (
    <textarea
      className="field_input field_textarea"
      id={id}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      ref={ref}
      rows={1}
      value={value}
    />
  )
}

function Toggle({ checked, label, onChange }) {
  return (
    <label className="toggle">
      <input
        checked={checked}
        onChange={(e) => onChange(e.target.checked || undefined)}
        type="checkbox"
      />
      <span aria-hidden="true" className="toggle_track">
        <span className="toggle_thumb" />
      </span>
      <span className="toggle_label">{label}</span>
    </label>
  )
}

// ---------- colour ----------

function toHex(color) {
  if (!color) return '#ffffff'
  if (color.startsWith('#'))
    return color.length === 4
      ? `#${[...color.slice(1)].map((c) => c + c).join('')}`
      : color.slice(0, 7)
  const m = color.match(/\d+(\.\d+)?/g)
  if (!m) return '#ffffff'
  return `#${m
    .slice(0, 3)
    .map((n) => Math.round(Number(n)).toString(16).padStart(2, '0'))
    .join('')}`
}

/** The colours already used on the site, to pick from. */
function usePalette() {
  const { doc } = useStudio()
  return useMemo(() => {
    const found = new Map()
    JSON.stringify(doc).replace(
      /"(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]*\))"/g,
      (_, c) => {
        const hex = toHex(c).toLowerCase()
        found.set(hex, (found.get(hex) ?? 0) + 1)
        return ''
      },
    )
    return [...found.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map(([hex]) => hex)
  }, [doc])
}

function ColorField({ id, onChange, optional, value }) {
  const [open, setOpen] = useState(false)
  const palette = usePalette()
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div className="color" ref={ref}>
      <button
        aria-expanded={open}
        className="color_button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span
          className={value ? 'color_swatch' : 'color_swatch color_none'}
          style={{ background: value || undefined }}
        />
        <span className="color_value">{value || 'None'}</span>
      </button>
      {open ? (
        <div className="color_popover">
          <div className="color_palette">
            {palette.map((hex) => (
              <button
                aria-label={hex}
                className="color_chip"
                key={hex}
                onClick={() => {
                  onChange(hex)
                  setOpen(false)
                }}
                style={{ background: hex }}
                title={hex}
                type="button"
              />
            ))}
          </div>
          <div className="color_custom">
            <input
              aria-label="Pick any colour"
              className="color_native"
              onChange={(e) => onChange(e.target.value)}
              type="color"
              value={toHex(value)}
            />
            <input
              aria-label="Colour code"
              className="field_input"
              onChange={(e) => onChange(e.target.value || undefined)}
              spellCheck={false}
              value={value ?? ''}
            />
          </div>
          {optional && value ? (
            <button
              className="linkButton"
              onClick={() => onChange(undefined)}
              type="button"
            >
              No colour
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

// ---------- media ----------

function MediaField({ field, id, onChange, path, value }) {
  const { pickMedia, set, toast } = useStudio()
  const [over, setOver] = useState(false)
  const [progress, setProgress] = useState(null)
  const audio = field.type === 'audio'

  // A picture card stores its size, so the page can hold its shape.
  const choose = (item) => {
    onChange(item.path)
    if (field.sizes && item.width) {
      const parent = path.slice(0, -1)
      set([...parent, 'width'], item.width)
      set([...parent, 'height'], item.height)
    }
  }

  async function drop(event) {
    event.preventDefault()
    setOver(false)
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    try {
      choose(await uploadFile(file, setProgress))
      toast(`Uploaded ${file.name}`)
    } catch (error) {
      toast(error.message, { tone: 'error' })
    } finally {
      setProgress(null)
    }
  }

  const pick = () => pickMedia({ accept: audio ? 'audio' : 'image', onPick: choose })
  const name = value ? value.split('/').pop() : ''

  return (
    <div
      className={['media', over && 'media_over'].filter(Boolean).join(' ')}
      onDragLeave={() => setOver(false)}
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDrop={drop}
    >
      {value && !audio ? (
        <>
          <div className="media_preview">
            <img alt="" src={value} />
            <div className="media_overlay">
              <button className="button button_small button_light" id={id} onClick={pick} type="button">
                <Icon name="image" size={15} /> Replace
              </button>
              {field.optional ? (
                <button aria-label="Remove" className="button button_small button_light button_square" onClick={() => onChange(undefined)} title="Remove" type="button">
                  <Icon name="trash" size={15} />
                </button>
              ) : null}
            </div>
          </div>
          <p className="media_meta" title={name}>
            {name}
          </p>
        </>
      ) : value && audio ? (
        <div className="media_sound">
          <span className="media_soundIcon">
            <Icon name="music" size={18} />
          </span>
          <audio className="media_player" controls preload="none" src={value} />
          <button aria-label="Remove" className="iconButton iconButton_small" onClick={() => onChange(undefined)} title="Remove" type="button">
            <Icon name="x" size={15} />
          </button>
        </div>
      ) : (
        <button className="media_drop" id={id} onClick={pick} type="button">
          <span className="media_dropIcon">
            <Icon name="upload" size={18} />
          </span>
          <span>
            <strong>Drop a {audio ? 'sound' : 'picture'}</strong> or pick one from the library
          </span>
        </button>
      )}
      {progress !== null ? (
        <span className="media_progress">
          <span style={{ width: `${progress * 100}%` }} />
        </span>
      ) : null}
    </div>
  )
}

// ---------- tags ----------

function TagsField({ id, onChange, value }) {
  const [text, setText] = useState('')
  const add = () => {
    const tag = text.trim().replace(/,$/, '')
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setText('')
  }
  return (
    <div className="tags" onClick={() => document.getElementById(id)?.focus()}>
      {value.map((tag, i) => (
        <span className="tags_chip" key={tag}>
          {tag}
          <button
            aria-label={`Remove ${tag}`}
            className="tags_remove"
            onClick={() => onChange(removeAt(value, i))}
            type="button"
          >
            <Icon name="x" size={12} strokeWidth={2.2} />
          </button>
        </span>
      ))}
      <input
        className="tags_input"
        id={id}
        onBlur={add}
        onChange={(e) =>
          e.target.value.endsWith(',')
            ? (setText(e.target.value), add())
            : setText(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            add()
          } else if (e.key === 'Backspace' && !text && value.length) {
            onChange(value.slice(0, -1))
          }
        }}
        placeholder={value.length ? '' : 'Type and press Enter'}
        value={text}
      />
    </div>
  )
}

// ---------- links and projects ----------

function LinkField({ id, onChange, optional, value }) {
  const { routes } = useStudio()
  const known = routes.some((r) => r.path === value)
  const [custom, setCustom] = useState(!known && Boolean(value))

  if (custom) {
    return (
      <div className="linkField">
        <input
          className="field_input"
          id={id}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder="/page or https://…"
          value={value ?? ''}
        />
        <button
          className="linkButton"
          onClick={() => setCustom(false)}
          type="button"
        >
          Pick a page
        </button>
      </div>
    )
  }
  return (
    <select
      className="field_input field_select"
      id={id}
      onChange={(e) => {
        if (e.target.value === '__custom') setCustom(true)
        else onChange(e.target.value || (optional ? null : undefined))
      }}
      value={value ?? ''}
    >
      {optional ? <option value="">Nowhere (not a link)</option> : null}
      {!value && !optional ? <option value="">Choose…</option> : null}
      {['Pages', 'Projects', 'Articles'].map((group) => (
        <optgroup key={group} label={group}>
          {routes
            .filter((r) => r.group === group)
            .map((r) => (
              <option key={r.path} value={r.path}>
                {r.label}
              </option>
            ))}
        </optgroup>
      ))}
      <option value="__custom">Another address…</option>
    </select>
  )
}

function ProjectField({ id, onChange, value }) {
  const { doc } = useStudio()
  return (
    <select
      className="field_input field_select"
      id={id}
      onChange={(e) => onChange(e.target.value)}
      value={value ?? ''}
    >
      {doc.projects.map((p) => (
        <option key={p.slug} value={p.slug}>
          {p.title}
        </option>
      ))}
    </select>
  )
}

// ---------- groups and lists ----------

function GroupField({ field, path, value }) {
  const { set } = useStudio()
  if (!value && field.optional) {
    return (
      <div className="group group_empty">
        <span className="field_label">{field.label}</span>
        <button
          className="button button_small button_light"
          onClick={() =>
            set(
              path,
              Object.fromEntries(
                field.fields.map((f) => [f.key, f.type === 'link' ? '/' : '']),
              ),
            )
          }
          type="button"
        >
          <Icon name="plus" size={14} /> Add
        </button>
      </div>
    )
  }
  return (
    <fieldset className="group">
      <legend className="group_legend">
        {field.label}
        {field.optional ? (
          <button
            className="linkButton"
            onClick={() => set(path, undefined)}
            type="button"
          >
            Remove
          </button>
        ) : null}
      </legend>
      <Fields fields={field.fields} path={path} value={value} />
    </fieldset>
  )
}

function ListField({ field, path, value }) {
  const { change, reveal, toast, undo } = useStudio()
  const [open, setOpen] = useState(null)

  // A click on the preview can point inside one of the items: open it.
  useEffect(() => {
    if (!reveal || reveal.length <= path.length) return
    if (
      path.every((key, i) => reveal[i] === key) &&
      typeof reveal[path.length] === 'number'
    ) {
      setOpen(reveal[path.length])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal])
  const [drag, setDrag] = useState(null)
  const full = field.max && value.length >= field.max

  const update = (fn) =>
    change((doc) => setIn(doc, path, fn(getIn(doc, path) ?? [])))

  function remove(i) {
    const label = itemLabel(field, value[i], i)
    update((list) => removeAt(list, i))
    setOpen(null)
    toast(`Removed “${label}”`, { action: { label: 'Undo', run: undo } })
  }

  function add() {
    update((list) => [...list, field.template ? field.template() : {}])
    setOpen(value.length)
  }

  return (
    <div className="list" data-field={path.join('.')}>
      <div className="list_head">
        <span className="field_label">{field.label}</span>
        <span className="list_count">{value.length}</span>
      </div>
      {field.hint ? <span className="field_hint">{field.hint}</span> : null}
      <ol className="list_items">
        {value.map((item, i) => (
          <li
            className={[
              'list_item',
              open === i && 'list_itemOpen',
              drag?.from === i && 'list_itemDragging',
              drag?.over === i &&
                drag.from !== i &&
                (drag.from < i ? 'list_itemDropAfter' : 'list_itemDropBefore'),
            ]
              .filter(Boolean)
              .join(' ')}
            key={i}
            onDragOver={(e) => {
              if (drag === null) return
              e.preventDefault()
              if (drag.over !== i) setDrag({ ...drag, over: i })
            }}
            onDrop={(e) => {
              e.preventDefault()
              if (drag && drag.from !== i) {
                update((list) => move(list, drag.from, i))
                if (open === drag.from) setOpen(i)
              }
              setDrag(null)
            }}
          >
            <div className="list_row">
              <span
                aria-hidden="true"
                className="list_handle"
                draggable
                onDragEnd={() => setDrag(null)}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', String(i))
                  setDrag({ from: i, over: i })
                }}
                title="Drag to reorder"
              >
                <Icon name="grip" size={16} />
              </span>
              <button
                className="list_toggle"
                onClick={() => setOpen(open === i ? null : i)}
                type="button"
              >
                {field.thumb && field.thumb(item) ? (
                  <img alt="" className="list_thumb" src={field.thumb(item)} />
                ) : null}
                <span className="list_label">{itemLabel(field, item, i)}</span>
                <Icon className="list_chevron" name="chevronDown" size={16} />
              </button>
              <span className="list_actions">
                <button
                  aria-label="Move up"
                  className="iconButton iconButton_small"
                  disabled={i === 0}
                  onClick={() => update((list) => move(list, i, i - 1))}
                  title="Move up"
                  type="button"
                >
                  <Icon name="arrowUp" size={15} />
                </button>
                <button
                  aria-label="Move down"
                  className="iconButton iconButton_small"
                  disabled={i === value.length - 1}
                  onClick={() => update((list) => move(list, i, i + 1))}
                  title="Move down"
                  type="button"
                >
                  <Icon name="arrowDown" size={15} />
                </button>
                <button
                  aria-label="Duplicate"
                  className="iconButton iconButton_small"
                  disabled={full}
                  onClick={() =>
                    update((list) => insertAt(list, i + 1, clone(item)))
                  }
                  title="Duplicate"
                  type="button"
                >
                  <Icon name="copy" size={15} />
                </button>
                <button
                  aria-label="Remove"
                  className="iconButton iconButton_small iconButton_danger"
                  onClick={() => remove(i)}
                  title="Remove"
                  type="button"
                >
                  <Icon name="trash" size={15} />
                </button>
              </span>
            </div>
            {open === i ? (
              <div className="list_body">
                <Fields
                  fields={field.fields}
                  path={[...path, i]}
                  value={item}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <button className="addButton addButton_small" disabled={full} onClick={add} type="button">
        <Icon name="plus" size={15} />
        {full ? `That’s all there’s room for` : (field.addLabel ?? 'Add')}
      </button>
    </div>
  )
}

function itemLabel(field, item, i) {
  const label = field.itemLabel ? field.itemLabel(item, i) : null
  return (typeof label === 'string' && label.trim()) || `Item ${i + 1}`
}
