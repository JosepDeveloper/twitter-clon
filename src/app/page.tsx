import { OPTIONS_SESSION } from '@/lib/session';
import { Header } from './components/header';
import { TweetsSections } from './components/tweets-sections';
import { getServerSession } from 'next-auth';
import { tursoClient } from '@/lib/db/turso-client';

/**
 * Obtiene los tweets de la base de datos.
 * Realiza una consulta SQL para obtener los últimos 20 tweets, junto con la información del usuario que los publicó.
 * 
 * @async
 * @function getTweets
 * @returns {Promise<Array<Object>>} - Una promesa que resuelve en un array de objetos que representan los tweets.
 * @property {string} id - ID del tweet.
 * @property {string} textMarkdown - Contenido del tweet en formato Markdown.
 * @property {string} nickname - Nombre de usuario del autor del tweet.
 * @property {string} urlImage - URL de la imagen de perfil del autor del tweet.
 */
const getTweets = async () => {
  const responseSQL = await tursoClient.execute(`
    SELECT 
      tweets.id, tweets.message, users.username, users.image_url 
    FROM 
      tweets
    JOIN 
      users ON tweets.user_id = users.id;
  `);

  const tweets = responseSQL.rows.map((tweet) => ({
    id: tweet.id,
    textMarkdown: tweet.message,
    nickname: tweet.username,
    urlImage: tweet.image_url,
  }));

  return tweets.reverse();
};

/**
 * Página principal de la aplicación.
 * Obtiene la sesión del usuario y los tweets, y los pasa a los componentes `Header` y `TweetsSections`.
 * 
 * @async
 * @function Home
 * @returns {Promise<JSX.Element>} - Una promesa que resuelve en el elemento JSX que representa la página principal.
 */
export default async function Home() {
  // Obtiene la sesión del usuario
  const session = await getServerSession(OPTIONS_SESSION);

  // Obtiene los tweets de la base de datos
  const tweets = await getTweets();

  return (
    <div className="flex h-dvh">
      {/* Encabezado de la aplicación */}
      <Header className="w-[20%]" />

      {/* Contenido principal de la página */}
      <main className="w-[80%]">
        {/* Sección de tweets */}
        <TweetsSections session={session} tweetsData={tweets} />
      </main>
    </div>
  );
}