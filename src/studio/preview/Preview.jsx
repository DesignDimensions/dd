import { useEffect, useRef, useState } from 'react'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'

import App from '@/App.jsx'
import { ContentProvider } from '@/content/ContentContext.jsx'

import './preview.css'

const ORIGIN = window.location.origin
const tell = (message) => window.parent.postMessage(message, ORIGIN)

/**
 * The studio's preview: the real website, rendered from the draft the
 * studio sends over (postMessage, same origin only). It runs in an iframe
 * sized to the chosen device, so the site's own breakpoints apply exactly
 * as they do live.
 *
 * In edit mode, hovering outlines a section and names it; clicking picks
 * it (and says which words were clicked, so the studio can open the field
 * that holds them) instead of following links. In browse mode the site
 * works as normal, and the studio follows wherever it goes.
 */
export default function Preview() {
  const [doc, setDoc] = useState(null)
  const [start, setStart] = useState(null)

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== ORIGIN) return
      if (event.data?.type === 'doc') setDoc(event.data.doc)
      if (event.data?.type === 'route') setStart((s) => s ?? event.data.path)
    }
    window.addEventListener('message', onMessage)
    tell({ type: 'ready' })
    return () => window.removeEventListener('message', onMessage)
  }, [])

  if (!doc || !start) return null

  return (
    <MemoryRouter initialEntries={[start]}>
      <ContentProvider document={doc}>
        <Bridge />
        <App />
      </ContentProvider>
    </MemoryRouter>
  )
}

function Bridge() {
  const location = useLocation()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(true)
  const [labels, setLabels] = useState([])
  const [selected, setSelected] = useState(null)
  const [hover, setHover] = useState(null)
  const [scale, setScale] = useState(1)
  const pathRef = useRef(location.pathname)

  // Messages from the studio.
  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== ORIGIN) return
      const m = event.data
      if (m?.type === 'route' && m.path !== pathRef.current) navigate(m.path)
      if (m?.type === 'mode') setEdit(m.edit)
      if (m?.type === 'outline') {
        setLabels(m.labels)
        setSelected(m.selected)
      }
      if (m?.type === 'scale') setScale(m.value)
      if (m?.type === 'reveal') reveal(m.index)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  // Tell the studio where the site went (browse mode, or a redirect).
  useEffect(() => {
    pathRef.current = location.pathname
    tell({ type: 'navigated', path: location.pathname })
  }, [location.pathname])

  // Edit mode: hover to outline, click to pick.
  useEffect(() => {
    if (!edit) return undefined
    function onMove(event) {
      setHover(targetOf(event.target))
    }
    function onClick(event) {
      const target = targetOf(event.target)
      if (!target) return
      event.preventDefault()
      event.stopPropagation()
      tell({ type: 'pick', target: target.id, text: clickedText(event.target) })
    }
    function onLeave() {
      setHover(null)
    }
    document.addEventListener('mousemove', onMove, true)
    document.addEventListener('click', onClick, true)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.classList.add('studio-editing')
    return () => {
      document.removeEventListener('mousemove', onMove, true)
      document.removeEventListener('click', onClick, true)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('studio-editing')
    }
  }, [edit])

  const hoverLabel = hover
    ? hover.id === 'header'
      ? 'Menu'
      : labels[hover.id]
    : null

  return (
    <>
      {edit && selected !== null ? (
        <Outline
          index={selected}
          kind="selected"
          label={labels[selected]}
          scale={scale}
        />
      ) : null}
      {edit && hover && hover.id !== selected ? (
        <Outline
          element={hover.element}
          kind="hover"
          label={hoverLabel}
          scale={scale}
        />
      ) : null}
    </>
  )
}

/** The page's sections in order: the children of the page wrapper. */
function sections() {
  const page = document.querySelector('main > .page_page')
  return page ? [...page.children] : []
}

/** Which section (or the header) an element belongs to. */
function targetOf(node) {
  if (!(node instanceof Element)) return null
  const header = node.closest('.header_header, .headerMobile_header')
  if (header)
    return {
      id: 'header',
      element:
        header.querySelector('.header_pill, .headerMobile_pill') ?? header,
    }
  const list = sections()
  let el = node
  while (el && el.parentElement && !list.includes(el)) el = el.parentElement
  const index = list.indexOf(el)
  return index === -1 ? null : { id: index, element: el }
}

function clickedText(node) {
  const text =
    (
      node.closest('p, h1, h2, h3, span, a, button, li, blockquote, label') ??
      node
    ).textContent ?? ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 120)
}

function reveal(index) {
  const el = sections()[index]
  if (!el) return
  el.scrollIntoView({
    behavior: 'smooth',
    block: el.offsetHeight > window.innerHeight * 0.8 ? 'start' : 'center',
  })
}

/** A frame drawn over a section, following it as the page moves. */
function Outline({ element, index, kind, label, scale }) {
  const [rect, setRect] = useState(null)

  useEffect(() => {
    let frame
    const tick = () => {
      const el = element ?? sections()[index]
      const r = el?.getBoundingClientRect()
      setRect((prev) =>
        r &&
        (!prev ||
          prev.top !== r.top ||
          prev.left !== r.left ||
          prev.width !== r.width ||
          prev.height !== r.height)
          ? { top: r.top, left: r.left, width: r.width, height: r.height }
          : r
            ? prev
            : null,
      )
      frame = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [element, index])

  if (!rect) return null
  const line = Math.max(2, Math.round(2 / scale))
  return (
    <div
      aria-hidden="true"
      className={`studioOutline studioOutline_${kind}`}
      style={{ ...rect, '--line': `${line}px`, '--chip-scale': 1 / scale }}
    >
      {label ? (
        <span className="studioOutline_chip">
          {kind === 'hover' ? `${label} · click to edit` : label}
        </span>
      ) : null}
    </div>
  )
}
