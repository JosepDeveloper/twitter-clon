import { Avatar } from '../../components/avatar'
import { FormTweet } from './form-tweet'

function PostTweet () {
  return (
    <div className='flex gap-5 mt-4'>
      <div>
        <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' name='Jose Oviedo'/>
      </div>

      <FormTweet />
    </div>
  )
}

export { PostTweet }
