import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout.jsx'
import About from './pages/About/About.jsx'
import Careers from './pages/Careers/Careers.jsx'
import ContactUs from './pages/ContactUs/ContactUs.jsx'
import Dialogue from './pages/Dialogue/Dialogue.jsx'
import Home from './pages/Home/Home.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Project from './pages/Project/Project.jsx'
import SafetyPin from './pages/SafetyPin/SafetyPin.jsx'
import Suryagarh from './pages/Suryagarh/Suryagarh.jsx'
import Work from './pages/Work/Work.jsx'

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
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/design-dialogue" element={<Dialogue />} />
        <Route path="/design-dialogue/safety-pin" element={<SafetyPin />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/suryagarh" element={<Suryagarh />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
