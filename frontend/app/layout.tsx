import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
const nunito = Nunito({
  weight: ['300','400','700'],
  style: ['normal','italic'],
  subsets: ['vietnamese'],
  variable:'--font-nunito'
})

export const metadata: Metadata = {
  title: 'Doc Type',
  description: 'Web app for doctors to search medical records',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
