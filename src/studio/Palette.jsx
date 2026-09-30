import { useEffect, useMemo, useRef, useState } from 'react'

import { api } from './api'
import { Icon } from './icons.jsx'

/**
 * ⌘K / Ctrl+K: type a few letters of anything — a page, a project, a
 * setting, "publish" — and press Enter to go there.
 */
export function Palette({ commands, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands.slice(0, 12)
    return commands
      .map((c) => ({
        c,
        score:
          score(c.label.toLowerCase(), q) +
          (c.hint?.toLowerCase().includes(q) ? 1 : 0),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.c)
  }, [commands, query])

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function run(command) {
    onClose()
    command.run()
  }

  return (
    <div
      className="modal modal_top"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section aria-label="Go to" className="palette" role="dialog">
        <div className="palette_bar">
          <Icon name="search" size={20} />
          <input
            autoFocus
            className="palette_input"
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              }
              if (e.key === 'Enter' && results[active]) run(results[active])
            }}
            placeholder="Jump to a page, project, setting…"
            value={query}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette_list" ref={listRef}>
          {results.map((command, i) => (
            <li key={command.id}>
              <button
                className={
                  i === active
                    ? 'palette_item palette_itemActive'
                    : 'palette_item'
                }
                onClick={() => run(command)}
                onMouseMove={() => setActive(i)}
                type="button"
              >
                <span className="palette_icon">
                  {command.swatch ? (
                    <span
                      className="nav_swatch"
                      style={{ background: command.swatch }}
                    />
                  ) : (
                    <Icon name={command.icon ?? 'arrowRight'} size={17} />
                  )}
                </span>
                <span className="palette_label">{command.label}</span>
                <span className="palette_hint">{command.hint}</span>
                <Icon className="palette_enter" name="arrowRight" size={16} />
              </button>
            </li>
          ))}
          {!results.length ? (
            <li className="palette_empty">
              Nothing by that name. Try fewer letters.
            </li>
          ) : null}
        </ul>
        <p className="palette_foot">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span className="topbar_spacer" />
          <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
        </p>
      </section>
    </div>
  )
}

/** Letters of the query in order in the label; earlier and tighter is better. */
function score(label, q) {
  if (label.startsWith(q)) return 100 - label.length
  if (label.includes(q)) return 60 - label.indexOf(q)
  let at = 0
  for (const ch of q) {
    at = label.indexOf(ch, at)
    if (at === -1) return 0
    at++
  }
  return 10
}

export function PasswordDialog({ onClose, toast }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('password', { method: 'POST', body: { current, next } })
      toast('Password changed. Let the team know the new one.')
      onClose()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        aria-label="Change the password"
        className="dialog dialog_small"
        role="dialog"
      >
        <form className="stack" onSubmit={submit}>
          <span className="dialog_icon">
            <Icon name="key" size={22} />
          </span>
          <h2 className="dialog_title">
            New <em>password</em>
          </h2>
          <p className="dialog_text">
            Everyone who edits the site uses this one password.
          </p>
          <label className="field">
            <span className="field_label">Current password</span>
            <input
              autoComplete="current-password"
              autoFocus
              className="field_input"
              onChange={(e) => setCurrent(e.target.value)}
              type="password"
              value={current}
            />
          </label>
          <label className="field">
            <span className="field_label">New password</span>
            <input
              autoComplete="new-password"
              className="field_input"
              onChange={(e) => setNext(e.target.value)}
              type="password"
              value={next}
            />
            <span className="field_hint">At least 10 characters.</span>
          </label>
          {error ? <p className="form_error">{error}</p> : null}
          <div className="dialog_actions">
            <button
              className="button button_ghost"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="button button_primary"
              disabled={busy || !current || next.length < 10}
              type="submit"
            >
              Change it
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
