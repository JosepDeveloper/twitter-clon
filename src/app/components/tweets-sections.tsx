import { PostTweet } from './post-tweet'
import { Tweets } from './tweets'

function TweetsSections () {
  return (
    <div>
      <header className='border-b border-white/20 min-h-40 px-6 pb-6'>
        <PostTweet />
      </header>

      <section>
        <Tweets />
      </section>
    </div>
  )
}

export { TweetsSections }
