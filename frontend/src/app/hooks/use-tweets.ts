import { useEffect, useState } from 'react'
import { TweestType } from '../types/tweet.types'

function useTweets () {
  const [tweets, setTweets] = useState<TweestType[]>([])

  const updateTweets = async (newTweets: TweestType) => {
    const tweet = {
      ...newTweets,
      id: tweets.length + 1
    }

    const response = await fetch('/api/tweets', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: tweet.textMarkdown, username: tweet.nickname })
    })
    const data = await response.json()

    console.log(data)
    setTweets(prevTwerst => [tweet, ...prevTwerst])
  }

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch('/api/tweets', { cache: 'no-cache' })
      const tweets = await response.json()

      setTweets(tweets.data)
    }

    getTweets()
  }, [])

  return {
    tweets,
    updateTweets
  }
}

export { useTweets }
