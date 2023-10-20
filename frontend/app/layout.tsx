import { ReactNode } from 'react'
import Footer from './_components/footer/footer'
import Navigation from './_components/navigation/navigation'
import './_style/base-style.scss'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
