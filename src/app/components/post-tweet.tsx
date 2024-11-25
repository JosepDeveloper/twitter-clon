import { useSession } from 'next-auth/react'
import { Avatar } from '../../components/avatar'
import { TweestType } from '../types/tweet.types'
import { FormTweet } from './form-tweet'

interface PostTweetProps {
  updateTweets: (newTweet: TweestType) => void
}

function PostTweet ({ updateTweets }: PostTweetProps) {
  const { data: session } = useSession()
  let avatar = 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  let name = 'Anonymous'

  if (session) {
    avatar = session.user?.image as string
    name = session.user?.name as string
  }

  return (
  <div className='flex gap-5 mt-4'>
    <div>
      <Avatar src={avatar} name={name}/>
    </div>

    <FormTweet updateTweets={updateTweets} />
  </div>
  )
}

export { PostTweet }
