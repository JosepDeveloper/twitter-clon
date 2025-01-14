import { tursoClient } from '@/lib/db/turso-client';
import { z } from 'zod';

/**
 * Manejador GET para obtener tweets.
 * Realiza una consulta a la base de datos para obtener los últimos 20 tweets, junto con la información del usuario que los publicó.
 * 
 * @async
 * @function GET
 * @returns {Promise<Response>} - Una promesa que resuelve en una respuesta JSON con los tweets encontrados.
 * 
 * @example
 * // Ejemplo de respuesta
 * {
 *   message: 'Tweets found',
 *   data: [
 *     { id: 1, textMarkdown: '¡Hola mundo!', nickname: 'usuario123', urlImage: 'https://example.com/avatar.jpg' },
 *     ...
 *   ]
 * }
 */
export async function GET(): Promise<Response> {
  // Realiza una consulta SQL para obtener los últimos 20 tweets
  const responseSQL = await tursoClient.execute(`
    SELECT 
      tweets.id, tweets.message, users.username, users.image_url 
    FROM 
      tweets
    JOIN 
      users ON tweets.user_id = users.id
    LIMIT 20 OFFSET 0;
  `);

  // Mapea los resultados de la consulta a un formato más amigable
  const tweets = responseSQL.rows.map((tweet) => ({
    id: tweet.id,
    textMarkdown: tweet.message,
    nickname: tweet.username,
    urlImage: tweet.image_url,
  }));

  console.log(tweets)

  // Devuelve una respuesta JSON con los tweets encontrados
  return Response.json({ message: 'Tweets found', data: tweets.reverse() });
}

/**
 * Esquema de validación para los datos de un tweet.
 * 
 * @constant {z.ZodObject} tweetsSchema
 * @property {z.ZodString} username - Nombre de usuario del autor del tweet.
 * @property {z.ZodString} message - Contenido del tweet.
 */
const tweetsSchema = z.object({
  username: z.string(),
  message: z.string(),
});

/**
 * Manejador POST para crear un nuevo tweet.
 * Valida los datos de entrada, verifica si el usuario existe y luego inserta el tweet en la base de datos.
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
 *   message: '¡Hola mundo!'
 * }
 * 
 * // Ejemplo de respuesta exitosa
 * {
 *   message: 'Tweet Created Sucessfully'
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
  const data = await tweetsSchema.safeParseAsync(body);

  // Si la validación falla, devuelve un error 400
  if (!data.success) {
    return Response.json({ message: 'Invalid data' }, { status: 400 });
  }

  // Busca al usuario en la base de datos
  const responseSQL = await tursoClient.execute({
    sql: 'SELECT * FROM users WHERE username = (:username)',
    args: { username: data.data.username },
  });

  // Si el usuario no existe, devuelve un error 404
  if (responseSQL.rows.length === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  // Obtiene el primer usuario encontrado
  const [user] = responseSQL.rows;

  // Inserta el nuevo tweet en la base de datos
  await tursoClient.execute({
    sql: 'INSERT INTO tweets(message, user_id) VALUES (:message, :id)',
    args: { message: data.data.message, id: user.id },
  });

  // Devuelve una respuesta JSON indicando que el tweet se creó correctamente
  return Response.json({ message: 'Tweet Created Sucessfully' });
}