import { useState } from 'react'
import { TweestType } from '../types/tweet.types'

const TWEEST_DEFAULT = [
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

function useTweets () {
  const [tweets, setTweets] = useState(TWEEST_DEFAULT)

  const updateTweets = (newTweets: TweestType) => {
    const tweet = {
      ...newTweets,
      id: tweets.length + 1
    }

    setTweets(prevTwerst => [tweet, ...prevTwerst])
  }

  return {
    tweets,
    updateTweets
  }
}

export { useTweets }
