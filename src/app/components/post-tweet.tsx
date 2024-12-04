/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Avatar } from '../../components/avatar'
import { TweestType } from '../types/tweet.types'
import { FormTweet } from './form-tweet'

interface PostTweetProps {
  updateTweets: (newTweet: TweestType) => void
  updateTweetsSockets: (newTweet: TweestType) => void
  session: boolean
  username: string
  imageURL: string
}

async function getUser (username: string, imageURL: string) {
  const response = await fetch(`/api/users?username=${username}`, { cache: 'no-cache' })
  const data = await response.json()

  if (data.message !== 'User not found') {
    const { data: { username, imageURL } } = data

    return { username, imageURL }
  }

  const responsePost = await fetch('/api/users', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, imageURL })
  })

  const dataPost = await responsePost.json()

  if (dataPost.message !== 'User Created Sucessfully') {
    return { username, imageURL }
  }

  return { username: dataPost.data.username, imageURL: dataPost.data.imageURL }
}

function PostTweet ({ updateTweets, session, username, imageURL, updateTweetsSockets }: PostTweetProps) {
  let avatar = 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  let name = 'Anonymous'

  if (session) {
    avatar = imageURL
    name = username
  }

  useEffect(() => {
    if (!session) return

    const fetchUserInfo = async () => {
      const infoUser = await getUser(name, avatar)

      avatar = infoUser.imageURL
      name = infoUser.username
    }

    fetchUserInfo()
  }, [name, avatar])

  return (
  <div className='flex gap-5 mt-4'>
    <div>
      <Avatar src={avatar} name={name}/>
    </div>

    <FormTweet updateTweets={updateTweets} imageURL={avatar} username={name} session={session} updateTweetsSockets={updateTweetsSockets} />
  </div>
  )
}

export { PostTweet }
