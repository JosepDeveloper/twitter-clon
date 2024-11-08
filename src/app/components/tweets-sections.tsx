import { PostTweet } from './post-tweet'

function TweetsSections () {
  return (
    <div>
      <header className='border-b border-white/20 min-h-40 px-6 pb-6'>
        <PostTweet />
      </header>

      <section>
        <p>Tweets Sections</p>
      </section>
    </div>
  )
}

export { TweetsSections }
