import { bundledDocument } from './document'

/** The studio this site reads from (`VITE_CMS_URL`, e.g.
    https://designdimensions.in/studio). Unset: the built-in content. */
export const CMS_URL = (import.meta.env.VITE_CMS_URL ?? '').replace(/\/+$/, '')

/** How long to wait for the studio before showing the built-in content. */
const TIMEOUT_MS = 6000

/**
 * The content to render: what's published in the studio, or — if no
 * studio is set, or it can't be reached in time — the content the site
 * was built with, so the site always shows something.
 */
export async function loadContent() {
  if (!CMS_URL) return bundledDocument()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${CMS_URL}/api/?r=content`, {
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`studio answered ${res.status}`)
    return withMediaUrls(await res.json(), CMS_URL)
  } catch (error) {
    console.warn(
      'Showing the built-in content — the studio could not be reached.',
      error,
    )
    return bundledDocument()
  } finally {
    clearTimeout(timer)
  }
}

/** Uploads are stored as "uploads/…" paths; the website needs them as
    full addresses on the studio's server. */
export function withMediaUrls(value, base) {
  if (typeof value === 'string')
    return value.startsWith('uploads/') ? `${base}/${value}` : value
  if (Array.isArray(value))
    return value.map((item) => withMediaUrls(item, base))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withMediaUrls(v, base)]),
    )
  }
  return value
}
