import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { api } from './api'
import { useStudio } from './context'
import { Icon } from './icons.jsx'
import { formatBytes, uploadFile } from './media'

/**
 * Every picture and sound on the site. Drop files anywhere on it to
 * upload; pick one to use it (when opened from a field); pictures no
 * longer used anywhere can be deleted.
 */
export default function MediaLibrary({ accept = 'image', onClose, onPick }) {
  const { toast } = useStudio()
  const [items, setItems] = useState(null)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [uploads, setUploads] = useState([])
  const [over, setOver] = useState(false)
  const [focused, setFocused] = useState(null)
  const [confirming, setConfirming] = useState(null)
  const inputRef = useRef(null)

  const load = useCallback(() => {
    api('media')
      .then(setItems)
      .catch((error) => toast(error.message, { tone: 'error' }))
  }, [toast])

  useEffect(load, [load])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const shown = useMemo(() => {
    if (!items) return []
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const isAudio = item.type?.startsWith('audio')
      if (accept === 'image' && isAudio) return false
      if (accept === 'audio' && !isAudio) return false
      if (filter === 'used' && !item.used) return false
      if (filter === 'unused' && item.used) return false
      return !q || item.name.toLowerCase().includes(q)
    })
  }, [items, filter, query, accept])

  async function upload(files) {
    const list = [...files]
    if (!list.length) return
    setUploads(list.map((f) => ({ name: f.name, progress: 0 })))
    let last = null
    for (const [i, file] of list.entries()) {
      try {
        last = await uploadFile(file, (p) =>
          setUploads((u) =>
            u.map((x, j) => (j === i ? { ...x, progress: p } : x)),
          ),
        )
      } catch (error) {
        toast(`${file.name}: ${error.message}`, { tone: 'error', ms: 7000 })
      }
    }
    setUploads([])
    load()
    if (last) {
      setFocused(last.path)
      toast(
        list.length > 1
          ? `Uploaded ${list.length} files`
          : `Uploaded ${last.name}`,
      )
    }
  }

  async function remove(item) {
    setConfirming(null)
    try {
      await api('delete-media', { method: 'POST', body: { path: item.path } })
      setItems((list) => list.filter((x) => x.path !== item.path))
      toast(`Deleted ${item.name}`)
    } catch (error) {
      toast(error.message, { tone: 'error' })
    }
  }

  const unusedCount = items?.filter((i) => !i.used).length ?? 0

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        aria-label="Media library"
        className={over ? 'library library_over' : 'library'}
        onDragLeave={(e) => e.currentTarget === e.target && setOver(false)}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          upload(e.dataTransfer.files)
        }}
        role="dialog"
      >
        <header className="library_head">
          <div className="library_titles">
            <h2 className="dialog_title">
              {onPick ? (
                <>
                  Pick a <em>{accept === 'audio' ? 'sound' : 'picture'}</em>
                </>
              ) : (
                <>
                  Media <em>library</em>
                </>
              )}
            </h2>
            <p className="dialog_text">
              {items ? `${items.length} files` : 'Loading…'}
              {unusedCount ? ` · ${unusedCount} not used anywhere` : ''} · drop files anywhere here
            </p>
          </div>
          <button aria-label="Close" className="iconButton iconButton_close" onClick={onClose} type="button">
            <Icon name="x" />
          </button>
          <div className="library_tools">
            <label className="search">
              <Icon name="search" size={16} />
              <input aria-label="Find a file" onChange={(e) => setQuery(e.target.value)} placeholder="Find by name" value={query} />
            </label>
            <div aria-label="Show" className="chips" role="group">
              {[
                ['all', 'Everything'],
                ['used', 'In use'],
                ['unused', 'Not used'],
              ].map(([key, label]) => (
                <button aria-pressed={filter === key} className="chips_option" key={key} onClick={() => setFilter(key)} type="button">
                  {label}
                </button>
              ))}
            </div>
            <span className="topbar_spacer" />
            <button className="button button_primary" onClick={() => inputRef.current.click()} type="button">
              <Icon name="upload" size={16} /> Upload
            </button>
            <input
              accept={accept === 'audio' ? 'audio/mpeg' : 'image/*'}
              hidden
              multiple
              onChange={(e) => upload(e.target.files)}
              ref={inputRef}
              type="file"
            />
          </div>
        </header>

        {uploads.length ? (
          <ul className="library_uploads">
            {uploads.map((u) => (
              <li key={u.name}>
                <span>{u.name}</span>
                <span className="library_bar">
                  <span style={{ width: `${Math.round(u.progress * 100)}%` }} />
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="library_grid">
          {shown.map((item) => (
            <figure
              className={focused === item.path ? 'tile tile_focused' : 'tile'}
              key={item.path}
              onMouseEnter={() => setFocused(item.path)}
            >
              <button
                className="tile_pick"
                onClick={() => {
                  if (onPick) {
                    onPick(item)
                    onClose()
                  } else setFocused(item.path)
                }}
                title={onPick ? 'Use this' : item.name}
                type="button"
              >
                {item.type?.startsWith('audio') ? (
                  <span className="tile_audio"><Icon name="music" size={30} /></span>
                ) : (
                  <img alt="" loading="lazy" src={item.path} />
                )}
                {onPick ? (
                  <span className="tile_use">
                    <Icon name="check" size={14} strokeWidth={2.2} /> Use this
                  </span>
                ) : null}
              </button>
              <figcaption className="tile_caption">
                <span className="tile_name">{item.name}</span>
                <span className="tile_meta">
                  {item.width ? `${item.width}×${item.height} · ` : ''}
                  {formatBytes(item.bytes)}
                </span>
                <span className="tile_foot">
                  {item.used ? (
                    <span className="badge badge_ok">In use</span>
                  ) : (
                    <span className="badge badge_quiet">Not used</span>
                  )}
                  {!item.used ? (
                    <button
                      className={confirming === item.path ? 'tile_delete tile_deleteSure' : 'tile_delete'}
                      onBlur={() => setConfirming(null)}
                      onClick={() => (confirming === item.path ? remove(item) : setConfirming(item.path))}
                      type="button"
                    >
                      <Icon name="trash" size={14} />
                      {confirming === item.path ? 'Sure?' : null}
                    </button>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          ))}
          {items && !shown.length ? (
            <p className="library_empty">
              {query || filter !== 'all'
                ? 'Nothing matches.'
                : 'Nothing here yet. Drop files anywhere on this panel to upload them.'}
            </p>
          ) : null}
        </div>
        {over ? (
          <div className="library_drop">
            <span>
              Drop it <em>here</em>
            </span>
          </div>
        ) : null}
      </section>
    </div>
  )
}
