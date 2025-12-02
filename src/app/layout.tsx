import './globals.css'
import '../../styles/component-styles.scss'
import '../../styles/nav.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'George Staniland - Front-end web Developer',
  description: 'Web developer based in Wellington, New Zealand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" >
      <body>
        {children}
      </body>
    </html >
  )
}
