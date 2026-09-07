import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout.jsx'
import About from './pages/About/About.jsx'
import Home from './pages/Home/Home.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Suryagarh from './pages/Suryagarh/Suryagarh.jsx'

/**
 * Route table.
 *
 * Add a page:
 *   1. src/pages/<Name>/<Name>.jsx  (+ .css)
 *   2. a <Route> below
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/suryagarh" element={<Suryagarh />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
