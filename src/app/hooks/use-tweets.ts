import { useEffect, useState } from 'react'
import { TweestType } from '../types/tweet.types'

function useTweets (tweetsData: any) {
  const [tweets, setTweets] = useState<TweestType[]>(tweetsData)

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

  return {
    tweets,
    updateTweets,
    updateTweetsSockets
  }
}

export { useTweets }
