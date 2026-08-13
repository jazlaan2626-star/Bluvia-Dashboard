import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SecurifyHero from './components/hero/SecurifyHero.tsx'
import BluviaHero from './components/hero/BluviaHero.tsx'
import './index.css'

const path = window.location.pathname
const isSecurifyRoute = path.startsWith('/securify')
const isBluviaHeroRoute = path.startsWith('/bluvia-hero')

function Root() {
  if (isSecurifyRoute) return <SecurifyHero />
  if (isBluviaHeroRoute) return <BluviaHero />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
