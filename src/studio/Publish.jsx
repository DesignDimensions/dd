import { useEffect, useState } from 'react'

import { api } from './api'
import { timeAgo } from './doc'
import { Icon } from './icons.jsx'

/** Which little tag a line of the change list gets. */
function kindOf(line) {
  if (/project/i.test(line)) return { icon: 'project', tone: 'butter' }
  if (/article/i.test(line)) return { icon: 'article', tone: 'lilac' }
  if (/testimonial/i.test(line)) return { icon: 'quote', tone: 'blush' }
  if (/menu|footer|details/i.test(line)) return { icon: 'sliders', tone: 'sky' }
  if (/everything/i.test(line)) return { icon: 'sparkle', tone: 'hot' }
  return { icon: 'page', tone: 'mint' }
}

export function PublishDialog({ changes, onClose, onPublished, doc, published }) {
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)
  const nothing = !changes.length

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !busy && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  async function publish(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await api('publish', { method: 'POST', body: { note } })
      setDone(result)
      onPublished({ ...result, note, doc })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <section aria-label="Publish" className={done ? 'dialog dialog_shipped' : 'dialog'} role="dialog">
        {done ? (
          <div className="shipped">
            <div aria-hidden="true" className="shipped_burst">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
            <span aria-hidden="true" className="sticker">
              <Icon name="zap" size={16} /> LIVE
            </span>
            <h2 className="display display_small">
              It’s <em>out there.</em>
            </h2>
            <p className="dialog_text">
              Version {done.version} is on the website. Anyone loading a page from now on sees it.
            </p>
            <button autoFocus className="button button_primary button_big" onClick={onClose} type="button">
              Keep editing
            </button>
          </div>
        ) : (
          <form onSubmit={publish}>
            <p className="eyebrow">
              {published?.publishedAt ? `Last shipped ${timeAgo(published.publishedAt)}` : 'First time live'}
            </p>
            <h2 className="dialog_title dialog_titleBig">
              Ready to <em>ship it?</em>
            </h2>
            {nothing ? (
              <div className="calm">
                <Icon name="check" size={22} />
                <p>The draft matches what’s live. Change something first.</p>
              </div>
            ) : (
              <ul className="changes">
                {changes.map((line) => {
                  const kind = kindOf(line)
                  return (
                    <li className="changes_row" key={line}>
                      <span className={`changes_icon chip_${kind.tone}`}>
                        <Icon name={kind.icon} size={15} />
                      </span>
                      {line}
                    </li>
                  )
                })}
              </ul>
            )}
            {nothing ? null : (
              <label className="field">
                <span className="field_label">A note for History</span>
                <input
                  autoFocus
                  className="field_input"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional — e.g. new Papadmalji photos"
                  value={note}
                />
              </label>
            )}
            {error ? (
              <p className="form_error">
                <Icon name="alert" size={15} /> {error}
              </p>
            ) : null}
            <div className="dialog_actions">
              <button className="button button_ghost" onClick={onClose} type="button">
                Not yet
              </button>
              <button className="button button_hot button_big" disabled={busy || nothing} type="submit">
                {busy ? (
                  <>
                    <span className="spinner" /> Publishing
                  </>
                ) : (
                  <>
                    Publish <Icon name="arrowUpRight" size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

/**
 * Every published version. Look at one in the preview, and bring it back
 * into the draft if it's the one you want.
 */
export function HistoryPanel({ looking, onClose, onLook, onRestore }) {
  const [versions, setVersions] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    api('revisions')
      .then(setVersions)
      .catch((err) => setError(err.message))
  }, [])

  async function open(version, then) {
    setLoading(version.id)
    try {
      then(await api(`revision&id=${encodeURIComponent(version.id)}`))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <aside className="island inspector history">
      <header className="insp_head">
        <div className="history_top">
          <span className="chip chip_hot">
            <Icon name="clock" size={14} /> History
          </span>
          <button aria-label="Close history" className="iconButton" onClick={onClose} type="button">
            <Icon name="x" />
          </button>
        </div>
        <h2 className="insp_title">
          Every version <em>you’ve shipped</em>
        </h2>
      </header>
      <div className="insp_body">
        {error ? <p className="form_error">{error}</p> : null}
        {versions && !versions.length ? (
          <div className="calm">
            <Icon name="clock" size={22} />
            <p>Nothing shipped yet. Your first publish lands here.</p>
          </div>
        ) : null}
        {!versions && !error ? <span className="skel" style={{ height: 120 }} /> : null}
        <ol className="timeline">
          {versions?.map((version, i) => (
            <li className={looking?.id === version.id ? 'moment moment_active' : 'moment'} key={version.id}>
              <span aria-hidden="true" className={i === 0 ? 'moment_dot moment_dotLive' : 'moment_dot'} />
              <div className="moment_card">
                <div className="moment_line">
                  <span className="moment_version">v{version.version}</span>
                  {i === 0 ? <span className="badge badge_hot">Live now</span> : null}
                  <span className="moment_when" title={new Date(version.publishedAt).toLocaleString()}>
                    {timeAgo(version.publishedAt)}
                  </span>
                </div>
                <p className={version.note ? 'moment_note' : 'moment_note moment_noteNone'}>{version.note || 'No note'}</p>
                <div className="moment_actions">
                  <button
                    className="button button_small button_light"
                    disabled={loading === version.id}
                    onClick={() => open(version, (data) => onLook({ ...version, doc: data.doc }))}
                    type="button"
                  >
                    <Icon name="eye" size={15} /> View
                  </button>
                  <button
                    className="button button_small button_ghost"
                    disabled={loading === version.id}
                    onClick={() => open(version, (data) => onRestore({ ...version, doc: data.doc }))}
                    title={i === 0 ? 'Throw away draft changes and start again from what’s live' : 'Put this version back in the draft'}
                    type="button"
                  >
                    <Icon name="undo" size={15} /> {i === 0 ? 'Reset draft to this' : 'Bring back'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
