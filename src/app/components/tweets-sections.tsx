'use client'
import { useTweets } from '../hooks/use-tweets'
import { PostTweet } from './post-tweet'
import { Tweets } from './tweets'
import { WrapperSessionPrivider } from './wrapper-session-provider'

function TweetsSections () {
  const { tweets, updateTweets } = useTweets()

  return (
    <div className='border-x border-white/20 pt-5'>
      <header className=' min-h-40 px-6 pb-6'>
        <WrapperSessionPrivider>
          <PostTweet updateTweets={updateTweets} />
        </WrapperSessionPrivider>
      </header>

      <section>
        <ul className='list-none m-0 [&>li]:mt-0 [&>li]:px-6  [&>li]:border-t [&>li]:border-white/20 border-white/20 pb-6'>
          {
            tweets.map((tweet) => (
              <li key={tweet.id} className='py-2'>
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
