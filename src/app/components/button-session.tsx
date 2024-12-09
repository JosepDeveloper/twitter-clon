import { getServerSession } from 'next-auth'
import { ButtonLogin } from './button-login'
import { ButtonSingOut } from './button-sing-out'
import { OPTIONS_SESSION } from '@/lib/session'

async function ButtonSession () {
  const session = await getServerSession(OPTIONS_SESSION) 

  const isUserLoged = session !== null
  return (
    <>
      {
        isUserLoged
          ? <ButtonSingOut />
          : <ButtonLogin />
      }
    </>
  )
}

export { ButtonSession }
