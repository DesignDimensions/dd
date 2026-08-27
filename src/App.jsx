import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

/**
 * Route table.
 *
 * Only the desktop home frame has been handed over so far. Add a page:
 *   1. src/pages/<Name>/<Name>.jsx  (+ .module.css)
 *   2. a <Route> below
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
