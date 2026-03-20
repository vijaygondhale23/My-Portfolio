import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
