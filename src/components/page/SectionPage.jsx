import Page from '@/components/layout/Page/Page.jsx'

import { SECTIONS } from './sections'

/**
 * A page built from a list of sections (src/content/pages) — what a CMS
 * page is: a ground, then typed sections in order, each with its own
 * content. The types are the ones in ./sections.js.
 */
export default function SectionPage({ page }) {
  return (
    <Page ground={page.ground}>
      {page.sections.map(({ type, ...content }, index) => {
        const Section = SECTIONS[type]
        if (!Section) throw new Error(`Unknown section type "${type}"`)
        return <Section key={`${type}-${index}`} {...content} />
      })}
    </Page>
  )
}
