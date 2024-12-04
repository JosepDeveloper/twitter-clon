import Markdown from 'react-markdown'
import reactGmf from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { Avatar } from '@/components/avatar'

interface TweetsProps {
  textMarkdown: string
  nickname: string
  urlImage: string
}

function Tweets ({ nickname, textMarkdown, urlImage }: TweetsProps) {
  return (
    <article className='p-2 flex gap-2'>
      <header>
        <Avatar src={urlImage} name={nickname} className='w-12' />
      </header>

      <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-2 items-center justify-start'>
          <h2 className='text-lg font-semibold tracki border-none scroll-m-none p-0 m-0'>{nickname}</h2>
        </div>

        <Markdown remarkPlugins={[reactGmf, remarkDirective]}>{textMarkdown}</Markdown>
      </div>
    </article>
  )
}

export { Tweets }
