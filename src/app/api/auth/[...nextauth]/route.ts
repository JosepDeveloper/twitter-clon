import { OPTIONS_SESSION } from '@/lib/session';
import NextAuth from 'next-auth';

/**
 * Manejador de NextAuth.js.
 * Configura y gestiona las solicitudes GET y POST relacionadas con la autenticación.
 * Utiliza la configuración definida en `OPTIONS_SESSION`.
 * 
 * @constant {Function} handler
 */
const handler = NextAuth(OPTIONS_SESSION);

/**
 * Exporta el manejador para las solicitudes GET y POST.
 * 
 * @exports handler
 */
export { handler as GET, handler as POST };