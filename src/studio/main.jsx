import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Gate from './Gate.jsx'
import './studio.css'

createRoot(document.getElementById('studio')).render(
  <StrictMode>
    <Gate />
  </StrictMode>,
)
