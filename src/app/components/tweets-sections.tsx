'use client'
import { useTweets } from '../hooks/use-tweets'
import { PostTweet } from './post-tweet'
import { Tweets } from './tweets'
import { Session } from 'next-auth'

function TweetsSections ({session, tweetsData}: { session: Session | null, tweetsData: any }) {
  const { tweets, updateTweets, updateTweetsSockets } = useTweets(tweetsData)

  let isSession = false

  if (session) {
    isSession = true
  }

  return (
    <div className='border-x border-white/20 pt-5'>
      <header className=' min-h-40 px-6 pb-6'>
        <PostTweet updateTweets={updateTweets} updateTweetsSockets={updateTweetsSockets} session={isSession} username={session?.user?.name as string} imageURL={session?.user?.image as string} />
      </header>

      <section>
        <ul className='list-none m-0 [&>li]:mt-0 [&>li]:px-6  [&>li]:border-t [&>li]:border-white/20 border-white/20 pb-6'>
          {
            tweets.map((tweet, index) => (
              <li key={index} className='py-2'>
                <Tweets
                  textMarkdown={tweet.textMarkdown}
                  nickname={tweet.nickname}
                  urlImage={tweet.urlImage}
                />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export { TweetsSections }
