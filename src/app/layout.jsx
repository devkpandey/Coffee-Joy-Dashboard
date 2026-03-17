import './globals.css'
import ClientReduxWrapper from './redux/ClientReduxWrapper'

export const metadata = {
  title: 'Larkon – Ecommerce Admin',
  description: 'Larkon ecommerce admin dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClientReduxWrapper>
          {children}
      </ClientReduxWrapper>
      </body>
    </html>
  )
}