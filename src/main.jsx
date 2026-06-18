import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

ReactGA.initialize('G-6TZLQS364B')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
