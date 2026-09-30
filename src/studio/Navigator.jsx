import { useState } from 'react'

import { useStudio } from './context'
import { move, slugify, uniqueSlug } from './doc'
import { Icon } from './icons.jsx'
import { SETTINGS_GROUPS, newArticleStory, newProjectStory } from './schema'
import { articleName, pageName } from './where'

/**
 * The site list: everything on the site, to jump to. Projects can be
 * searched and dragged into the order the Work diary shows them in; new
 * projects and articles start from here.
 */
export default function Navigator({ onGo, where }) {
  const { change, doc, toast } = useStudio()
  const [query, setQuery] = useState('')
  const [drag, setDrag] = useState(null)
  const [creating, setCreating] = useState(null)
  const [closed, setClosed] = useState({})

  const q = query.trim().toLowerCase()
  const projects = doc.projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => !q || project.title.toLowerCase().includes(q) || project.category?.toLowerCase().includes(q))

  const is = (kind, key) => where.kind === kind && (where.path ?? where.slug ?? where.group) === key
  const toggle = (group) => setClosed((c) => ({ ...c, [group]: !c[group] }))

  function create(kind, name) {
    const title = name.trim()
    if (!title) return
    if (kind === 'project') {
      const slug = uniqueSlug(slugify(title), doc.projects.map((p) => p.slug))
      const background = '#e8e4da'
      const story = newProjectStory(title, background)
      story.blocks = story.blocks.map((b) => (b.type === 'moreProjects' ? { ...b, current: slug } : b))
      change((d) => ({
        ...d,
        projects: [{ slug, title, category: undefined, background, tags: [], story }, ...d.projects],
      }))
      onGo({ kind: 'project', slug })
      toast(`${title} is in — first in the Work diary. Add its pictures next.`)
    } else {
      const slug = uniqueSlug(slugify(title), doc.articles.map((a) => a.slug))
      change((d) => ({
        ...d,
        articles: [
          ...d.articles,
          {
            slug,
            search: { title, subtitle: 'Design Dialogue', background: '#f3e9dc', keywords: [] },
            story: newArticleStory(title),
          },
        ],
      }))
      onGo({ kind: 'article', slug })
      toast(`${title} is started at /design-dialogue/${slug}`)
    }
    setCreating(null)
  }

  return (
    <nav aria-label="Site" className="island navigator">
      <Group closed={closed.pages} onToggle={() => toggle('pages')} title="Pages">
        {doc.pages.map((page) => (
          <Item
            active={is('page', page.path)}
            icon={page.path === '/' ? 'home' : 'page'}
            key={page.path}
            label={pageName(page)}
            onClick={() => onGo({ kind: 'page', path: page.path })}
          />
        ))}
      </Group>

      <Group
        action={
          <button aria-label="New project" className="iconButton iconButton_small" onClick={() => setCreating('project')} title="New project" type="button">
            <Icon name="plus" size={16} />
          </button>
        }
        closed={closed.projects}
        count={doc.projects.length}
        onToggle={() => toggle('projects')}
        title="Projects"
      >
        {creating === 'project' ? <Create kind="project" onCancel={() => setCreating(null)} onCreate={(name) => create('project', name)} /> : null}
        {doc.projects.length > 8 ? (
          <label className="navSearch">
            <Icon name="search" size={15} />
            <input aria-label="Find a project" onChange={(e) => setQuery(e.target.value)} placeholder="Find a project" value={query} />
            {query ? (
              <button aria-label="Clear" className="navSearch_clear" onClick={() => setQuery('')} type="button">
                <Icon name="x" size={14} />
              </button>
            ) : null}
          </label>
        ) : null}
        {projects.map(({ project, index }) => (
          <div
            className={[
              'nav_draggable',
              drag?.from === index && 'nav_dragging',
              drag?.over === index && drag.from !== index && (drag.from < index ? 'nav_dropAfter' : 'nav_dropBefore'),
            ]
              .filter(Boolean)
              .join(' ')}
            draggable={!q}
            key={project.slug}
            onDragEnd={() => setDrag(null)}
            onDragOver={(e) => {
              if (!drag) return
              e.preventDefault()
              if (drag.over !== index) setDrag({ ...drag, over: index })
            }}
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move'
              e.dataTransfer.setData('text/plain', project.slug)
              setDrag({ from: index, over: index })
            }}
            onDrop={(e) => {
              e.preventDefault()
              if (drag && drag.from !== index) {
                change((d) => ({ ...d, projects: move(d.projects, drag.from, index) }))
                toast('New order saved — the Work diary follows it.')
              }
              setDrag(null)
            }}
          >
            <Item
              active={is('project', project.slug)}
              label={project.title}
              onClick={() => onGo({ kind: 'project', slug: project.slug })}
              swatch={project.background}
            />
          </div>
        ))}
        {q && !projects.length ? <p className="nav_empty">Nothing called “{query}”.</p> : null}
      </Group>

      <Group
        action={
          <button aria-label="New article" className="iconButton iconButton_small" onClick={() => setCreating('article')} title="New article" type="button">
            <Icon name="plus" size={16} />
          </button>
        }
        closed={closed.articles}
        count={doc.articles.length}
        onToggle={() => toggle('articles')}
        title="Articles"
      >
        {creating === 'article' ? <Create kind="article" onCancel={() => setCreating(null)} onCreate={(name) => create('article', name)} /> : null}
        {doc.articles.map((article) => (
          <Item
            active={is('article', article.slug)}
            icon="article"
            key={article.slug}
            label={articleName(article)}
            onClick={() => onGo({ kind: 'article', slug: article.slug })}
          />
        ))}
      </Group>

      <Group closed={closed.everywhere} onToggle={() => toggle('everywhere')} title="Everywhere">
        <Item active={where.kind === 'testimonials'} icon="quote" label="Testimonials" onClick={() => onGo({ kind: 'testimonials' })} />
        {Object.entries(SETTINGS_GROUPS).map(([group, def]) => (
          <Item
            active={is('settings', group)}
            icon={def.icon ?? 'sliders'}
            key={group}
            label={def.label}
            onClick={() => onGo({ kind: 'settings', group })}
          />
        ))}
      </Group>
    </nav>
  )
}

function Group({ action, children, closed, count, onToggle, title }) {
  return (
    <section className="nav_group">
      <div className="nav_head">
        <button aria-expanded={!closed} className="nav_title" onClick={onToggle} type="button">
          <Icon className="nav_chevron" name="chevronDown" size={14} />
          {title}
          {count !== undefined ? <span className="nav_count">{count}</span> : null}
        </button>
        {action}
      </div>
      {closed ? null : <div className="nav_items">{children}</div>}
    </section>
  )
}

function Item({ active, icon, label, onClick, swatch }) {
  return (
    <button aria-current={active ? 'page' : undefined} className="nav_item" data-nav={label} onClick={onClick} type="button">
      {swatch ? <span className="nav_swatch" style={{ background: swatch }} /> : <Icon name={icon} size={17} />}
      <span className="nav_label">{label}</span>
    </button>
  )
}

function Create({ kind, onCancel, onCreate }) {
  const [name, setName] = useState('')
  return (
    <form
      className="nav_create"
      onSubmit={(e) => {
        e.preventDefault()
        onCreate(name)
      }}
    >
      <input
        autoFocus
        className="input"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
        placeholder={kind === 'project' ? 'Name the project' : 'Title the article'}
        value={name}
      />
      <div className="nav_createActions">
        <button className="button button_small button_primary" disabled={!name.trim()} type="submit">
          Create
        </button>
        <button className="button button_small button_ghost" onClick={onCancel} type="button">
          Cancel
        </button>
      </div>
    </form>
  )
}
