import { ApiError, getToken } from './api'

/**
 * Uploads one file to the media library, reporting progress (0–1) as it
 * goes. Resolves with the library item: { path, name, width, height, … }.
 */
export function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('file', file)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', './api/?r=upload')
    xhr.withCredentials = true
    const token = getToken()
    if (token) xhr.setRequestHeader('X-Studio-Token', token)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total)
    }
    xhr.onload = () => {
      let data = null
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        // not JSON: fall through to the status message
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(data)
      else
        reject(
          new ApiError(
            data?.error ?? `The upload failed (${xhr.status}).`,
            xhr.status,
          ),
        )
    }
    xhr.onerror = () =>
      reject(
        new ApiError(
          'The upload didn’t reach the server. Check your connection.',
          0,
        ),
      )
    xhr.send(form)
  })
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
