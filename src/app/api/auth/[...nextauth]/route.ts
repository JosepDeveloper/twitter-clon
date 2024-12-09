import { OPTIONS_SESSION } from '@/lib/session'
import NextAuth from 'next-auth'

const handler = NextAuth(OPTIONS_SESSION)

export { handler as GET, handler as POST }
