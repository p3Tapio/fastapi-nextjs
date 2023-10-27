'use client'

import { ReactNode } from 'react'
// import { Provider } from 'react-redux'
// import { store } from './_state/store'
import { AuthProvider } from './_state/user/authContext'
import Footer from './_components/footer/footer'
import Navigation from './_components/navigation/navigation'
import './_style/base-style.scss'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* <Provider store={store}> */}
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        {/* </Provider> */}
      </body>
    </html>
  )
}

export default RootLayout
