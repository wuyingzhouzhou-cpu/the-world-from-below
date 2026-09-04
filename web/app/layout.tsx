import {Fraunces, Inter, Lora} from 'next/font/google'
import type {Metadata} from 'next'
import {AnalyticsSlot} from '@/components/site/AnalyticsSlot'
import {siteOrigin} from '@/lib/siteUrl'
import './globals.css'
import '../styles/site.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
  preload: false,
})

const origin = siteOrigin()

export const metadata: Metadata = {
  ...(origin ? {metadataBase: new URL(origin)} : {}),
  title: {
    default: 'The World From Below',
    template: '%s',
  },
  description: 'How do ordinary people live in a world they didn\'t design?',
}

export const revalidate = 60

const fontVariables = `${fraunces.variable} ${inter.variable} ${lora.variable}`

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className={fontVariables}>
        {children}
        <AnalyticsSlot />
      </body>
    </html>
  )
}
