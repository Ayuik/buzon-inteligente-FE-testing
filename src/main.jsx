import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FormularioRegistro } from './FormularioRegistro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormularioRegistro />
  </StrictMode>,
)
