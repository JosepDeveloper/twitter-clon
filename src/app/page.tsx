import { Header } from './components/header'
import { TweetsSections } from './components/tweets-sections'

export default function Home () {
  return (
    <div className='flex h-dvh'>
      <Header className='w-[20%]' />

      <main className='w-[80%]'>
        <TweetsSections />
      </main>
    </div>
  )
}
