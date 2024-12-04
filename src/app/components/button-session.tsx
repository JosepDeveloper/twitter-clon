'use client'
import { useSession } from 'next-auth/react'
import { ButtonLogin } from './button-login'
import { ButtonSingOut } from './button-sing-out'

function ButtonSession () {
  const { data: session } = useSession()

  return (
    <>
      {
        session
          ? <ButtonSingOut />
          : <ButtonLogin />
      }
    </>
  )
}

export { ButtonSession }
