'use client'
import { useEffect, useState } from 'react'
import { TweestType } from '../types/tweet.types'

interface FormTweetProps {
  updateTweets: (newTweet: TweestType) => void
}

function FormTweet ({ updateTweets }: FormTweetProps) {
  const [text, setText] = useState('')

  const colorButton = text.length !== 0 ? 'bg-blue-600' : 'bg-[#1a4e78] text-white/50'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)

    const newTweet: TweestType = {
      textMarkdown: text,
      username: '@joseoviedo',
      nickname: 'Jose Oviedo',
      urlImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
    }

    updateTweets(newTweet)
    setText('')
  }

  useEffect(() => {
    const textarea = document.getElementById('tweet-input')
    const button = document.getElementById('tweet-button')

    textarea?.addEventListener('input', () => {
      if (text.length === 0) {
        textarea.style.height = '80px'
      }

      const height = textarea.scrollHeight
      textarea.style.height = '80px'
      textarea.style.height = height + 'px'
    })

    textarea?.addEventListener('focus', () => {
      textarea.style.height = '80px'
    })

    textarea?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setText('')
      }

      if (e.ctrlKey && e.key === 'Enter' && text.length !== 0) {
        button?.click()
      }
    })
  }, [text])

  return (
    <form className="w-11/12 h-fit flex flex-col items-end gap-3" onSubmit={handleSubmit}>
      <textarea
        id='tweet-input'
        className={`
          bg-black
          w-full min-h-20 max-h-60
          resize-none overflow-hidden
          text-xl
          border-b border-white/20
          active:outline-none focus:outline-none
        `}
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="¡¿Qué está pasando?!"
      >
      </textarea>

      <button
        id='tweet-button'
        className={`${colorButton} py-2 px-4 font-semibold rounded-full text-white`}
        disabled={text.length === 0}
      >
        Postear
      </button>
    </form>
  )
}

export { FormTweet }
