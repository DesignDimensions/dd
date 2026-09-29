import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'
import { cn } from '@/lib/cn'
import { LATEST, normalize, search } from '@/lib/search'

import './SearchPanel.css'

/** Close to their layout spring (stiffness 320, damping 40): quick, no
    overshoot. */
const GLIDE = { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }

/** One tap to a useful search, shown whenever there are no results. */
const QUICK = [
  'Packaging',
  'Branding',
  'Identity',
  'Website',
  'Interior',
  'Article',
]

/**
 * The header pill's search mode. Reference: wepresent.wetransfer.com's
 * search (.search_wrapper), state for state, then taken further.
 *
 * - Nothing typed: a giant serif "Search" field centred in the panel,
 *   and "Explore the latest" — the three newest projects as full-bleed
 *   cards, fanned small at the foot and spreading on hover. Clicking the
 *   fan opens it up full size (the field moves up); leaving folds it.
 * - Typing: the field shrinks and pins to the top, and the matches fill
 *   a grid of the site's cards (lib/search) that scrolls under it.
 * - No match: the field shakes, as theirs, but also says so.
 *
 * Beyond theirs: quick-search chips under the field; a count of what
 * matched; results rising in one after another; the fan cards rising in
 * as the panel opens, and lifting and straightening under the pointer
 * once spread. Every move between states glides — the field and the fan
 * are FLIP-animated from where they were to where layout puts them, as
 * their framer-motion `layout` does — instead of jumping.
 *
 * Enter opens the first match; cards are links, so Tab walks them. The
 * header remounts this (by key) on every open, so each search starts
 * empty with the field focused.
 */
export default function SearchPanel({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [latestOpen, setLatestOpen] = useState(false)
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  const itemsRef = useRef(null)
  const lastRects = useRef(new Map())
  const navigate = useNavigate()

  const results = useMemo(() => (query.trim() ? search(query) : null), [query])
  const hasResults = results !== null && results.length > 0
  const noResults = results !== null && results.length === 0
  const centered = !hasResults && !latestOpen

  // Focus once the pill has mostly opened, as theirs does (300ms).
  useEffect(() => {
    const id = setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      300,
    )
    return () => clearTimeout(id)
  }, [])

  // FLIP: after each change of state, send the field and the fan from
  // where they last sat to where layout has put them now.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    for (const ref of [searchRef, itemsRef]) {
      const el = ref.current
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const from = lastRects.current.get(ref)
      lastRects.current.set(ref, rect)
      if (!from || reduce) continue
      const dx = from.left - rect.left
      const dy = from.top - rect.top
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        GLIDE,
      )
    }
  }, [centered, latestOpen, hasResults, noResults])

  function pick(term) {
    setQuery(term)
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div
      className={cn(
        'searchPanel_panel',
        !latestOpen && 'searchPanel_collapsedLatest',
        centered && 'searchPanel_centered',
        hasResults && 'searchPanel_hasResults',
      )}
    >
      <div className="searchPanel_search">
        {/* The block that moves, FLIP-animated: the outer one only centres it. */}
        <div className="searchPanel_searchInner" ref={searchRef}>
          <input
            aria-label="Search projects, stories and pages"
            autoComplete="off"
            className={cn(
              'searchPanel_input',
              noResults && 'searchPanel_error',
            )}
            enterKeyHint="go"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && hasResults) {
                navigate(results[0].to)
                onNavigate()
              }
            }}
            placeholder="Search"
            ref={inputRef}
            spellCheck={false}
            type="search"
            value={query}
          />

          {noResults ? (
            <p className="searchPanel_message">
              Nothing for “{query.trim()}” yet. Try one of these, or a project’s
              name.
            </p>
          ) : null}

          {hasResults ? null : (
            <div
              aria-label="Quick searches"
              className="searchPanel_chips"
              role="group"
            >
              {QUICK.map((term) => (
                <Tag
                  key={term}
                  onClick={() => pick(term)}
                  selected={normalize(query.trim()) === normalize(term)}
                >
                  {term}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasResults ? (
        <div className="searchPanel_results">
          <p aria-live="polite" className="searchPanel_count">
            {results.length} result{results.length === 1 ? '' : 's'} for “
            {query.trim()}”
          </p>
          <div className="searchPanel_grid">
            {results.map((result, i) => (
              <div
                className="searchPanel_result"
                key={result.to}
                onClickCapture={onNavigate}
                style={{ '--i': Math.min(i, 8) }}
              >
                <ProjectCard
                  background={result.background}
                  eyebrow={
                    result.type === 'Project' ? result.subtitle : result.type
                  }
                  fluid
                  image={result.image}
                  title={[result.title]}
                  to={result.to}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="searchPanel_latest"
          onMouseLeave={() => setLatestOpen(false)}
        >
          {latestOpen ? null : (
            <span className="searchPanel_label">Explore the latest</span>
          )}
          <ul className="searchPanel_items" ref={itemsRef}>
            {LATEST.map((result, i) => (
              <li
                className="searchPanel_item"
                key={result.to}
                onBlur={() => setLatestOpen(false)}
                onClick={() => setLatestOpen(true)}
                onClickCapture={latestOpen ? onNavigate : undefined}
                onFocus={() => setLatestOpen(true)}
                style={{ '--i': i }}
              >
                <LatestCard result={result} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** Their "Explore the latest" card: the picture fills the card, shaded,
    with the name centred over it in white and the kind of work in an
    outlined pill beneath. */
function LatestCard({ result }) {
  return (
    <Link className="searchPanel_card" to={result.to}>
      <img alt="" className="searchPanel_cardImage" src={result.image} />
      <span className="searchPanel_cardContent">
        <span className="searchPanel_cardTitle">{result.title}</span>
        {result.subtitle ? (
          <span className="searchPanel_cardTag">{result.subtitle}</span>
        ) : null}
      </span>
    </Link>
  )
}
