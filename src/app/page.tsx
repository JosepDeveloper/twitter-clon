import { OPTIONS_SESSION } from '@/lib/session'
import { Header } from './components/header'
import { TweetsSections } from './components/tweets-sections'
import { getServerSession } from 'next-auth'
import { tursoClient } from '@/lib/db/turso-client'

const getTweets = async () => {
    const responseSQL = await tursoClient.execute(`
    SELECT 
      tweets.id, tweets.message, users.username, users.image_url 
    FROM 
      tweets
    JOIN 
      users ON tweets.user_id = users.id
    LIMIT 20 OFFSET 0;
  `)

  const tweets = responseSQL.rows.map((tweet) => ({
    id: tweet.id,
    textMarkdown: tweet.message,
    nickname: tweet.username,
    urlImage: tweet.image_url
  }))

  return tweets.reverse()
}

export default async function Home () {
  const session = await getServerSession(OPTIONS_SESSION)
  const tweets = await getTweets()

  return (
    <div className='flex h-dvh'>
      <Header className='w-[20%]' />

      <main className='w-[80%]'>
        <TweetsSections session={session} tweetsData={tweets} />
      </main>
    </div>
  )
}
