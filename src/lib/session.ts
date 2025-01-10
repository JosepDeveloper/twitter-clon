import GithubProvider from 'next-auth/providers/github';

/**
 * Opciones de configuración para la sesión de autenticación.
 * Define los proveedores de autenticación y sus credenciales.
 * 
 * @constant {Object} OPTIONS_SESSION
 * @property {Array} providers - Lista de proveedores de autenticación.
 * @property {Object} providers[].GithubProvider - Configuración del proveedor de GitHub.
 * @property {string} providers[].GithubProvider.clientId - ID del cliente de GitHub.
 * @property {string} providers[].GithubProvider.clientSecret - Secreto del cliente de GitHub.
 * 
 * @example
 * // Ejemplo de uso en NextAuth.js
 * import NextAuth from 'next-auth';
 * import { OPTIONS_SESSION } from './ruta/al/archivo';
 * 
 * export default NextAuth(OPTIONS_SESSION);
 */
const OPTIONS_SESSION = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};

/**
 * Exporta las opciones de configuración de la sesión para su uso en NextAuth.js.
 * 
 * @exports OPTIONS_SESSION
 */
export { OPTIONS_SESSION };