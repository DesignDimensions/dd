/**
 * Immutable edits on the content document by path — an array of keys and
 * indexes, e.g. ['pages', 0, 'sections', 2, 'heading']. Only the objects
 * along the path are copied, so unchanged parts keep their identity (the
 * preview and the undo history stay cheap).
 */

export function getIn(value, path) {
  return path.reduce(
    (node, key) => (node == null ? undefined : node[key]),
    value,
  )
}

export function setIn(value, path, next) {
  if (path.length === 0) return next
  const [key, ...rest] = path
  const current = value ?? (typeof key === 'number' ? [] : {})
  const child = setIn(current[key], rest, next)
  if (Array.isArray(current)) {
    const copy = current.slice()
    copy[key] = child
    return copy
  }
  const copy = { ...current }
  if (child === undefined) delete copy[key]
  else copy[key] = child
  return copy
}

export function updateIn(value, path, fn) {
  return setIn(value, path, fn(getIn(value, path)))
}

export function insertAt(list, index, item) {
  const copy = list.slice()
  copy.splice(index, 0, item)
  return copy
}

export function removeAt(list, index) {
  return list.filter((_, i) => i !== index)
}

export function move(list, from, to) {
  const copy = list.slice()
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

export function clone(value) {
  return structuredClone(value)
}

/** "Papad & Co's Story!" → "papad-co-s-story" */
export function slugify(text) {
  return (
    String(text)
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'untitled'
  )
}

/** A slug not yet in `taken`: "name", then "name-2", "name-3"… */
export function uniqueSlug(base, taken) {
  let slug = base
  for (let n = 2; taken.includes(slug); n++) slug = `${base}-${n}`
  return slug
}

/** "3 minutes ago", "yesterday", "12 Sep". */
export function timeAgo(iso, now = Date.now()) {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  const seconds = Math.round((now - then) / 1000)
  if (seconds < 20) return 'just now'
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60)
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return hours === 1 ? 'an hour ago' : `${hours} hours ago`
  const days = Math.round(hours / 24)
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: days > 300 ? 'numeric' : undefined,
  })
}
