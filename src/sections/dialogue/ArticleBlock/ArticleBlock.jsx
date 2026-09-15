import './ArticleBlock.css'

/**
 * Figma 2719:16467 / 2719:16492 — an article's white card: rows of a small
 * side label beside an 880px content column, 80px apart. Rows are passed
 * in as <ArticleRow>s, with the text classes below on their children.
 */
export default function ArticleBlock({ children }) {
  return <section className="articleBlock_section">{children}</section>
}

/** Figma 2719:16468 — the 200px side label, then the content column. */
export function ArticleRow({ children, label }) {
  return (
    <div className="articleBlock_row">
      <p className="articleBlock_label">{label}</p>
      <div className="articleBlock_content">{children}</div>
    </div>
  )
}
