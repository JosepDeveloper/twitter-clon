import { PostTweet } from './post-tweet'
import { Tweets } from './tweets'

const tweets = [
  {
    id: 1,
    textMarkdown: `# Esto es un ejemplo
lorem ipsum dolor ammet sit amet, consectetur adipiscing elit. 
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
    Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
    Proin porttitor, orci nec **nonummy molestie**, enim est eleifend mi, non fermentum diam nisl sit amet erat. 
    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. 
    Pellentesque hendrerit sapien. Donec enim diam, __elementum nec,__ pretium id, suscipit a, mi. 
    Nam at lectus quam. Cras ornare. Pellentesque nec nisl sit amet sem tristique cursus. 
    Proin euismod. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
    Curabitur et ligula.
  
*Ejemplo de Codigo*

\`sudo apt-get install -y vim\`

\`\`\`js

const hello = 'Hello World!'
console.log(hello)
\`\`\`
    `,
    username: '@joseoviedo',
    nickname: 'Jose Oviedo',
    urlImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 2,
    textMarkdown: `# Esto es un ejemplo
lorem ipsum dolor ammet sit amet, consectetur adipiscing elit. 
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
    Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
    Proin porttitor, orci nec **nonummy molestie**, enim est eleifend mi, non fermentum diam nisl sit amet erat. 
    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. 
    Pellentesque hendrerit sapien. Donec enim diam, __elementum nec,__ pretium id, suscipit a, mi. 
    Nam at lectus quam. Cras ornare. Pellentesque nec nisl sit amet sem tristique cursus. 
    Proin euismod. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
    Curabitur et ligula.
    
- Lista 1
- Lista 2
- Lista 3
    `,
    username: '@isaacmp',
    nickname: 'Isaac Leon',
    urlImage: 'https://i.pravatar.cc/150?u=a04258a2462d826712d'
  },
  {
    id: 3,
    textMarkdown: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur et ligula. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
    username: '@jadapecode',
    nickname: 'Javier Perez',
    urlImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  }
]

function TweetsSections () {
  return (
    <div className='border-x border-white/20 pt-5'>
      <header className=' min-h-40 px-6 pb-6'>
        <PostTweet />
      </header>

      <section>
        <ul className='list-none m-0 [&>li]:mt-0 [&>li]:px-6  [&>li]:border-t [&>li]:border-white/20 border-white/20 pb-6'>
          {
            tweets.map((tweet) => (
              <li key={tweet.id} className='py-2'>
                <Tweets
                  textMarkdown={tweet.textMarkdown}
                  username={tweet.username}
                  nickname={tweet.nickname}
                  urlImage={tweet.urlImage}
                />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export { TweetsSections }
