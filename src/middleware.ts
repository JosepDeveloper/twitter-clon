/**
 * Middleware de autenticación que protege rutas específicas.
 * Este middleware utiliza NextAuth.js para asegurar que solo los usuarios autenticados puedan acceder a las rutas definidas.
 * 
 * @module middleware
 * @default
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 */
export { default } from 'next-auth/middleware';

/**
 * Configuración del middleware.
 * Define las rutas que deben ser protegidas por el middleware de autenticación.
 * 
 * @constant {Object} config
 * @property {string[]} matcher - Un array de rutas que serán protegidas por el middleware.
 * @example
 * // Protege la ruta '/dashboard'
 * const config = { matcher: ['/dashboard'] };
 */
export const config = { matcher: ['/dashboard'] };