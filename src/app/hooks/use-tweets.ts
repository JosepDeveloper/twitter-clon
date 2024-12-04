import { useEffect, useState } from 'react'
import { TweestType } from '../types/tweet.types'

function useTweets () {
  const [tweets, setTweets] = useState<TweestType[]>([])

  const updateTweetsSockets = (newTweets: TweestType) => {
    const tweet = {
      ...newTweets,
      id: tweets.length + 1
    }

    setTweets(prevTwerst => [tweet, ...prevTwerst])
  }

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
    updateTweets,
    updateTweetsSockets
  }
}

export { useTweets }
