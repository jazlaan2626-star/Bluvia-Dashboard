import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SecurifyHero from './components/hero/SecurifyHero.tsx'
import './index.css'

const isSecurifyRoute = window.location.pathname.startsWith('/securify')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isSecurifyRoute ? <SecurifyHero /> : <App />}
  </React.StrictMode>,
)
