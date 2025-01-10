'use client';

import { useTweets } from '../hooks/use-tweets';
import { PostTweet } from './post-tweet';
import { Tweets } from './tweets';
import { Session } from 'next-auth';

/**
 * Propiedades del componente TweetsSections.
 * 
 * @interface TweetsSectionsProps
 * @property {Session | null} session - Información de la sesión del usuario.
 * @property {any} tweetsData - Datos iniciales de los tweets.
 */
interface TweetsSectionsProps {
  session: Session | null;
  tweetsData: any;
}

/**
 * Componente TweetsSections.
 * Representa una sección de la aplicación donde los usuarios pueden publicar tweets y ver una lista de tweets existentes.
 * 
 * @component
 * @param {TweetsSectionsProps} props - Propiedades del componente.
 * @param {Session | null} props.session - Información de la sesión del usuario.
 * @param {any} props.tweetsData - Datos iniciales de los tweets.
 * @returns {JSX.Element} - Elemento JSX que representa la sección de tweets.
 * 
 * @example
 * // Ejemplo de uso del componente TweetsSections
 * <TweetsSections session={session} tweetsData={tweetsData} />
 */
function TweetsSections({ session, tweetsData }: TweetsSectionsProps): JSX.Element {
  // Obtiene los tweets y las funciones para actualizarlos
  const { tweets, updateTweets, updateTweetsSockets } = useTweets(tweetsData);

  // Verifica si el usuario ha iniciado sesión
  let isSession = false;
  if (session) {
    isSession = true;
  }

  return (
    <div className="border-x border-white/20 pt-5">
      {/* Encabezado con el formulario para publicar tweets */}
      <header className="min-h-40 px-6 pb-6">
        <PostTweet
          updateTweets={updateTweets}
          updateTweetsSockets={updateTweetsSockets}
          session={isSession}
          username={session?.user?.name as string}
          imageURL={session?.user?.image as string}
        />
      </header>

      {/* Sección que muestra la lista de tweets */}
      <section>
        <ul className="list-none m-0 [&>li]:mt-0 [&>li]:px-6 [&>li]:border-t [&>li]:border-white/20 border-white/20 pb-6">
          {tweets.map((tweet, index) => (
            <li key={index} className="py-2">
              <Tweets
                textMarkdown={tweet.textMarkdown}
                nickname={tweet.nickname}
                urlImage={tweet.urlImage}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/**
 * Exporta el componente TweetsSections para su uso en otros módulos.
 * 
 * @exports TweetsSections
 */
export { TweetsSections };