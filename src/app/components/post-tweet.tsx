import { Avatar } from '../../components/avatar'
import { TweestType } from '../types/tweet.types'
import { FormTweet } from './form-tweet'

interface PostTweetProps {
  updateTweets: (newTweet: TweestType) => void
}

function PostTweet ({ updateTweets }: PostTweetProps) {
  return (
    <div className='flex gap-5 mt-4'>
      <div>
        <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' name='Jose Oviedo'/>
      </div>

      <FormTweet updateTweets={updateTweets} />
    </div>
  )
}

export { PostTweet }
