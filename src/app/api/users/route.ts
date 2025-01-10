import { tursoClient } from '@/lib/db/turso-client';
import { userSchema } from './schemas/user';

/**
 * Manejador GET para obtener información de un usuario.
 * Realiza una consulta a la base de datos para obtener los datos de un usuario específico basado en su nombre de usuario.
 * 
 * @async
 * @function GET
 * @param {Request} request - Objeto de solicitud HTTP.
 * @returns {Promise<Response>} - Una promesa que resuelve en una respuesta JSON con los datos del usuario encontrado o un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud
 * GET /api/users?username=usuario123
 * 
 * // Ejemplo de respuesta exitosa
 * {
 *   message: 'User found',
 *   data: { username: 'usuario123', imageURL: 'https://example.com/avatar.jpg' }
 * }
 * 
 * // Ejemplo de respuesta de error
 * {
 *   message: 'User not found'
 * }
 */
export async function GET(request: Request): Promise<Response> {
  // Obtiene el parámetro de consulta 'username' de la URL
  const { searchParams } = new URL(request.url);
  const usernameParams = searchParams.get('username');

  // Realiza una consulta SQL para obtener los datos del usuario
  const responseSQL = await tursoClient.execute({
    sql: 'SELECT * FROM users WHERE username = (:username)',
    args: { username: usernameParams },
  });

  // Si no se encuentra el usuario, devuelve un error 404
  if (responseSQL.rows.length === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  // Extrae el nombre de usuario y la URL de la imagen del primer resultado
  const { username, image_url: imageURL } = responseSQL.rows[0];

  // Devuelve una respuesta JSON con los datos del usuario
  return Response.json(
    { message: 'User found', data: { username, imageURL } },
    { status: 200 },
  );
}

/**
 * Manejador POST para crear un nuevo usuario.
 * Valida los datos de entrada y luego inserta un nuevo usuario en la base de datos.
 * 
 * @async
 * @function POST
 * @param {Request} request - Objeto de solicitud HTTP.
 * @returns {Promise<Response>} - Una promesa que resuelve en una respuesta JSON indicando el resultado de la operación.
 * 
 * @example
 * // Ejemplo de solicitud
 * {
 *   username: 'usuario123',
 *   imageURL: 'https://example.com/avatar.jpg'
 * }
 * 
 * // Ejemplo de respuesta exitosa
 * {
 *   message: 'User Created Sucessfully',
 *   data: { username: 'usuario123', imageURL: 'https://example.com/avatar.jpg' }
 * }
 * 
 * // Ejemplo de respuesta de error
 * {
 *   message: 'Invalid data'
 * }
 */
export async function POST(request: Request): Promise<Response> {
  // Obtiene el cuerpo de la solicitud
  const body = await request.json();

  // Valida los datos de entrada utilizando el esquema de Zod
  const userData = await userSchema.safeParseAsync(body);

  // Si la validación falla, devuelve un error 400
  if (!userData.success) {
    return Response.json({ message: 'Invalid data' }, { status: 400 });
  }

  // Extrae el nombre de usuario y la URL de la imagen de los datos validados
  const { username, imageURL } = userData.data;

  try {
    // Inserta el nuevo usuario en la base de datos
    await tursoClient.execute({
      sql: 'INSERT INTO users (username, image_url) VALUES (:username, :imageURL)',
      args: { username, imageURL },
    });
  } catch {
    // Si ocurre un error al insertar, devuelve un error 500
    return Response.json({ message: 'Error inserting data' }, { status: 500 });
  }

  // Devuelve una respuesta JSON indicando que el usuario se creó correctamente
  return Response.json(
    { message: 'User Created Sucessfully', data: { username, imageURL } },
    { status: 200 },
  );
}