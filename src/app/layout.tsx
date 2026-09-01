import './globals.css'
import '../../styles/component-styles.scss'
import '../../styles/page-styles.scss'
import '../../styles/nav.scss'

import type { Metadata } from 'next'
import EntryTransition from '@/components/EntryTransition'

export const metadata: Metadata = {
  title: 'George Staniland - Front-end web Developer',
  description: 'Web developer from in Wellington, New Zealand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" >
      <body>
        <EntryTransition>
         {children}
        </EntryTransition>
      </body>
    </html >
  )
}
