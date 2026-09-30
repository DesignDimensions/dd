import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// The website's styles, in the same order as src/main.jsx.
import '@/styles/sections.css'

import Preview from './Preview.jsx'
import '@/styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
)
