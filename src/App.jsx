import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout.jsx'
import SectionPage from './components/page/SectionPage.jsx'
import { useContent } from './content/useContent'
import Article from './pages/Article/Article.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Project from './pages/Project/Project.jsx'

/**
 * Route table.
 *
 * Section-built pages (Home, About, Work diary, Design Dialogue, Careers,
 * Contact) come from the content's pages, one route each; case studies
 * and articles are stories looked up by slug. Add a page to the content
 * (in the studio, or src/content/pages) and it gets a route.
 */
export default function App() {
  const { pages } = useContent()

  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.entries(pages).map(([path, page]) => (
          <Route element={<SectionPage page={page} />} key={path} path={path} />
        ))}
        <Route path="/design-dialogue/:slug" element={<Article />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
