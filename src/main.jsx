import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Shared section styles load before every component's stylesheet, so a
// section's own rules override them; global.css loads after (its hero
// overlap rule has to win over the sections').
import './styles/sections.css'

import App from './App.jsx'
import { ContentProvider } from './content/ContentContext.jsx'
import { loadContent } from './content/load'
import './styles/global.css'

// The content comes first — from the studio when one is set (VITE_CMS_URL),
// otherwise what the site was built with — then the site renders it.
loadContent().then((content) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ContentProvider document={content}>
          <App />
        </ContentProvider>
      </BrowserRouter>
    </StrictMode>,
  )
})
