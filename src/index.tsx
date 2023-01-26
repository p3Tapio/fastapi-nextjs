import React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/authContext'
import App from './App'
import './style/base-style.scss'

/*
cypress, gha ?
*/

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
