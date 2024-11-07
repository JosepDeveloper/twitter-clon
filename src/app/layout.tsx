import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chigüire.Net (Twitter Clon)',
  description: 'Un Clon de Twitter, hecho con NextJS, Redis y PostgreSQL'
}

const onest = Onest({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
            ${onest.className} antialiased
            bg-black
            px-[180px]
          `}
      >
        {children}
      </body>
    </html>
  )
}
