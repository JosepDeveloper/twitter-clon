'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

function WrapperSessionPrivider ({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export { WrapperSessionPrivider }
