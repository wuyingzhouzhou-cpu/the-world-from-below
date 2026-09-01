import {Fraunces, Inter, Lora} from 'next/font/google'
import type {Metadata} from 'next'
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
})

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The World From Below',
  description: 'How do ordinary people live in a world they didn\'t design?',
}

const fontVariables = `${fraunces.variable} ${inter.variable} ${lora.variable}`

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className={fontVariables}>{children}</body>
    </html>
  )
}
