import 'lenis/dist/lenis.css'
import './globals.css'
import '../../styles/component-styles.scss'
import '../../styles/page-styles.scss'
import '../../styles/nav.scss'


import type { Metadata } from 'next'
import EntryTransition from '@/components/EntryTransition'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'George Staniland - Software Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Chrome on mobile may inject attrs (e.g. __gcrremoteframetoken) before hydration.
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <EntryTransition>
          <SmoothScroll>{children}</SmoothScroll>
        </EntryTransition>
      </body>
    </html >
  )
}
