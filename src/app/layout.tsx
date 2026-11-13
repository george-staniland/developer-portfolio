import 'lenis/dist/lenis.css'
import './globals.css'
import '../../styles/component-styles.scss'
import '../../styles/page-styles.scss'
import '../../styles/nav.scss'


import type { Metadata } from 'next'
import EntryTransition from '@/components/EntryTransition'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'George Staniland - Front-end web Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" >
      <body>
        <SmoothScroll>
          <EntryTransition>
            {children}
          </EntryTransition>
        </SmoothScroll>
      </body>
    </html >
  )
}
