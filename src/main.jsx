import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { OnboardingProvider } from './context/OnboardingContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <OnboardingProvider>
        <App />
      </OnboardingProvider>
    </HashRouter>
  </React.StrictMode>,
)
