import './QuoteBig.css'

/** Figma 2955:12729 — a single large centred pull quote. */
export default function QuoteBig({ children }) {
  return (
    <section className="quoteBig_section">
      <p className="quoteBig_quote">{children}</p>
    </section>
  )
}
