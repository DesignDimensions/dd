/**
 * Talks to the studio's PHP API (cms/api), which lives next to the studio
 * at ./api/. Every change carries the session's token.
 */
const BASE = './api/?r='
let token = null

export function setToken(value) {
  token = value
}

export function getToken() {
  return token
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function api(route, { method = 'GET', body, form } = {}) {
  const headers = {}
  if (token) headers['X-Studio-Token'] = token
  if (body) headers['Content-Type'] = 'application/json'
  let res
  try {
    res = await fetch(BASE + route, {
      method,
      headers,
      credentials: 'same-origin',
      body: form ?? (body ? JSON.stringify(body) : undefined),
    })
  } catch {
    throw new ApiError(
      'Can’t reach the studio’s server. Check your connection.',
      0,
    )
  }
  const data = await res.json().catch(() => null)
  if (!res.ok)
    throw new ApiError(
      data?.error ?? `The server answered ${res.status}.`,
      res.status,
      data,
    )
  return data
}
