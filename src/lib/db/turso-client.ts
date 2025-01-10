import { createClient } from '@libsql/client';

/**
 * Cliente de base de datos Turso.
 * Este cliente se configura con la URL de la base de datos y un token de autenticación.
 * 
 * @constant {Object} tursoClient
 * @property {string} url - URL de la base de datos Turso.
 * @property {string} authToken - Token de autenticación para acceder a la base de datos.
 * 
 * @example
 * // Ejemplo de uso del cliente Turso
 * import { tursoClient } from './ruta/al/archivo';
 * 
 * async function fetchData() {
 *   const result = await tursoClient.execute('SELECT * FROM users');
 *   console.log(result.rows);
 * }
 */
const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

/**
 * Exporta el cliente de base de datos Turso para su uso en otros módulos.
 * 
 * @exports tursoClient
 */
export { tursoClient };