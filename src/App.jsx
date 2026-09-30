import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout.jsx'
import SectionPage from './components/page/SectionPage.jsx'
import { PAGES } from './content/pages'
import Article from './pages/Article/Article.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Project from './pages/Project/Project.jsx'

/**
 * Route table.
 *
 * Section-built pages (Home, About, Work diary, Design Dialogue, Careers,
 * Contact) come from src/content/pages, one route each; case studies and
 * articles are stories looked up by slug (src/content/stories).
 *
 * Add a page: add its content to src/content/pages and it gets a route.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.entries(PAGES).map(([path, page]) => (
          <Route element={<SectionPage page={page} />} key={path} path={path} />
        ))}
        <Route path="/design-dialogue/:slug" element={<Article />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
