import { OPTIONS_SESSION } from '@/lib/session';
import { Header } from './components/header';
import { TweetsSections } from './components/tweets-sections';
import { getServerSession } from 'next-auth';
import { tursoClient } from '@/lib/db/turso-client';

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

export default async function Home() {
  const session = await getServerSession(OPTIONS_SESSION);
  const tweets = await getTweets();

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 mx-auto h-dvh">
      {/* Contenido principal de la página (arriba en móvil, a la derecha en desktop) */}
      <main className="w-full sm:w-[60%] order-1 sm:order-2 overflow-y-auto scrollbar-hide h-[calc(100vh-4rem)] sm:h-[calc(100vh-2rem)] max-h-[100%] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {/* Sección de tweets */}
        <TweetsSections session={session} tweetsData={tweets} />
      </main>

      {/* Encabezado de la aplicación (abajo en móvil, a la izquierda en desktop) */}
      <Header className="w-full px-2 sm:px-[15px] z-2 bg-black sm:sticky sm:top-0 sm:left-0 sm:w-[20%] order-2 sm:order-1 fixed bottom-0 sm:relative" />
    </div>
  );
}