import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { DEVICES } from './devices'

/**
 * The live preview: the real website (preview.html) in an iframe at the
 * device's true width, scaled down to fit, so the site's own breakpoints
 * decide the layout exactly as they will live. The draft, the route, the
 * mode and the section names are sent over as they change; picks and
 * navigation come back through `onMessage`.
 */
export default function Canvas({
  device,
  doc,
  dock,
  edit,
  labels,
  onMessage,
  path,
  reveal,
  selected,
}) {
  const frameRef = useRef(null)
  const wrapRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [box, setBox] = useState({ width: 0, height: 0 })
  const width = DEVICES[device].width
  const scale = box.width ? Math.min(1, (box.width - 48) / width) : 1

  useLayoutEffect(() => {
    const el = wrapRef.current
    const observer = new ResizeObserver(() =>
      setBox({ width: el.clientWidth, height: el.clientHeight }),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const post = useCallback(
    (message) =>
      frameRef.current?.contentWindow?.postMessage(
        message,
        window.location.origin,
      ),
    [],
  )

  useEffect(() => {
    function listen(event) {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow
      )
        return
      if (event.data?.type === 'ready') setReady(true)
      else onMessage?.(event.data)
    }
    window.addEventListener('message', listen)
    return () => window.removeEventListener('message', listen)
  }, [onMessage])

  // Order matters on first load: the draft, then where to start.
  useEffect(() => {
    if (ready && doc) post({ type: 'doc', doc })
  }, [ready, doc, post])
  useEffect(() => {
    if (ready) post({ type: 'route', path })
  }, [ready, path, post])
  useEffect(() => {
    if (ready) post({ type: 'mode', edit })
  }, [ready, edit, post])
  useEffect(() => {
    if (ready) post({ type: 'outline', labels, selected })
  }, [ready, labels, selected, post])
  useEffect(() => {
    if (ready) post({ type: 'scale', value: scale })
  }, [ready, scale, post])
  useEffect(() => {
    if (ready && reveal) post({ type: 'reveal', index: reveal.index })
  }, [ready, reveal, post])

  return (
    <div className="canvas" ref={wrapRef}>
      <div
        className="canvas_device"
        data-device={device}
        style={{ width: width * scale, height: box.height - 96 }}
      >
        <iframe
          className="canvas_frame"
          ref={frameRef}
          src="./preview.html"
          style={{
            width,
            height: (box.height - 96) / scale,
            transform: `scale(${scale})`,
          }}
          title="Live preview"
        />
        {!ready ? (
          <div className="canvas_loading">
            <span className="spinner" /> Loading the page
          </div>
        ) : null}
      </div>
      {dock?.(scale)}
    </div>
  )
}
