import React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'state/user/authContext'
import { Provider } from 'react-redux'
import { store } from 'state/store'
import App from './App'
import './style/base-style.scss'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)
