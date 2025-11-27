import type { Metadata, Viewport } from 'next'
import { Inter, Righteous } from 'next/font/google'

import { Toaster } from '@/components/shared/toast/sonner'
import { QueryProvider } from '@/lib/react-query/QueryProvider'

import './globals.css'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const righteous = Righteous({
  subsets: ['latin'],
  variable: '--font-righteous',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'DineLocal',
  description: 'Authentic home dining experiences connecting hosts and guests',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${righteous.variable} antialiased`}>
        <QueryProvider>
          <main>{children}</main>
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  )
}
