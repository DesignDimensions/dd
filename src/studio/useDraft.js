import { useCallback, useEffect, useRef, useState } from 'react'

import { api } from './api'
import { setIn } from './doc'

const SAVE_AFTER_MS = 900
const RETRY_AFTER_MS = 5000
const MERGE_TYPING_MS = 700
const MAX_UNDO = 200

/**
 * The draft being edited: the document, undo/redo, and autosave.
 *
 * Edits apply instantly (the preview follows along); the draft is saved
 * a moment after typing stops. Keystrokes into the same field within a
 * short pause become one undo step, so undo goes back a word, not a
 * letter. A save that fails is retried; a save that finds someone else
 * saved first stops and asks (`conflict`).
 */
export function useDraft(initial) {
  const [doc, setDoc] = useState(initial.doc)
  const [status, setStatus] = useState({ state: 'saved', at: initial.savedAt })
  const [conflict, setConflict] = useState(null)
  const [stack, setStack] = useState({ undo: 0, redo: 0 })

  const version = useRef(initial.version)
  const past = useRef([])
  const future = useRef([])
  const lastEdit = useRef({ key: null, at: 0 })
  const timer = useRef(null)
  const latest = useRef(initial.doc)
  const saving = useRef(false)
  const dirty = useRef(false)
  const blocked = useRef(false)
  const saveRef = useRef(() => {})

  const schedule = useCallback((ms, fn) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      timer.current = null
      fn()
    }, ms)
  }, [])

  const save = useCallback(async () => {
    clearTimeout(timer.current)
    timer.current = null
    if (saving.current || !dirty.current || blocked.current) return
    saving.current = true
    dirty.current = false
    setStatus({ state: 'saving' })
    try {
      const saved = await api('save', {
        method: 'POST',
        body: { doc: latest.current, baseVersion: version.current },
      })
      version.current = saved.version
      if (!dirty.current) setStatus({ state: 'saved', at: saved.savedAt })
    } catch (error) {
      dirty.current = true
      if (error.status === 409) {
        blocked.current = true
        setConflict(error.data?.draft ?? null)
        setStatus({ state: 'conflict' })
      } else if (error.status === 401 || error.status === 403) {
        blocked.current = true
        setStatus({ state: 'error', message: error.message })
      } else {
        setStatus({ state: 'retrying', message: error.message })
        schedule(RETRY_AFTER_MS, () => saveRef.current())
      }
    } finally {
      saving.current = false
      if (dirty.current && !blocked.current && !timer.current)
        schedule(SAVE_AFTER_MS, () => saveRef.current())
    }
  }, [schedule])

  useEffect(() => {
    saveRef.current = save
  }, [save])

  const touched = useCallback(() => {
    dirty.current = true
    setStack({ undo: past.current.length, redo: future.current.length })
    setStatus((s) => (blocked.current ? s : { state: 'unsaved' }))
    schedule(SAVE_AFTER_MS, save)
  }, [save, schedule])

  const commit = useCallback(
    (next, mergeKey) => {
      if (next === latest.current) return
      const now = Date.now()
      const merge =
        mergeKey &&
        lastEdit.current.key === mergeKey &&
        now - lastEdit.current.at < MERGE_TYPING_MS
      if (!merge) {
        past.current = [...past.current.slice(-MAX_UNDO), latest.current]
        future.current = []
      }
      lastEdit.current = { key: mergeKey ?? null, at: now }
      latest.current = next
      setDoc(next)
      touched()
    },
    [touched],
  )

  /** Set a value at a path. Typing into one field merges into one undo step. */
  const set = useCallback(
    (path, value) => commit(setIn(latest.current, path, value), path.join('.')),
    [commit],
  )

  /** Replace the document with a function of the current one (one undo step). */
  const change = useCallback((fn) => commit(fn(latest.current)), [commit])

  /** Undo (back) or redo (forward) one step. */
  const step = useCallback(
    (back) => {
      const from = back ? past : future
      if (!from.current.length) return
      const target = back
        ? past.current[past.current.length - 1]
        : future.current[0]
      if (back) {
        past.current = past.current.slice(0, -1)
        future.current = [latest.current, ...future.current]
      } else {
        future.current = future.current.slice(1)
        past.current = [...past.current, latest.current]
      }
      lastEdit.current = { key: null, at: 0 }
      latest.current = target
      setDoc(target)
      touched()
    },
    [touched],
  )

  const undo = useCallback(() => step(true), [step])
  const redo = useCallback(() => step(false), [step])

  /** After a conflict: take the other copy, or keep ours and save over it. */
  const resolveConflict = useCallback(
    (keep) => {
      if (!conflict) return
      version.current = conflict.version
      blocked.current = false
      if (keep === 'theirs') {
        latest.current = conflict.doc
        setDoc(conflict.doc)
        past.current = []
        future.current = []
        setStack({ undo: 0, redo: 0 })
        dirty.current = false
        setStatus({ state: 'saved', at: conflict.savedAt })
      } else {
        dirty.current = true
        schedule(0, save)
      }
      setConflict(null)
    },
    [conflict, save, schedule],
  )

  /** Replace the whole draft (restoring from History) as one undo step. */
  const replace = useCallback((next) => commit(next), [commit])

  // Warn before leaving with changes not yet saved.
  useEffect(() => {
    function beforeUnload(event) {
      if (dirty.current || saving.current) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return {
    doc,
    set,
    change,
    replace,
    undo,
    redo,
    canUndo: stack.undo > 0,
    canRedo: stack.redo > 0,
    status,
    saveNow: save,
    conflict,
    resolveConflict,
  }
}
