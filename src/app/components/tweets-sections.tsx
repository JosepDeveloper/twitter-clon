import { PostTweetForm } from './post-tweet-form'

function TweetsSections () {
  return (
    <div>
      <header className='border-b border-white/20 h-40 px-6 pb-6'>
        <PostTweetForm />
      </header>

      <section>
        <p>Tweets Sections</p>
      </section>
    </div>
  )
}

export { TweetsSections }
