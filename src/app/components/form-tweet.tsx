'use client'
import { KeyboardEvent, useRef, useState } from 'react'
import { TweestType, urlImage } from '../types/tweet.types'

interface FormTweetProps {
  updateTweets: (newTweet: TweestType) => void
  session: boolean
  username: string
  imageURL: string
}

function FormTweet ({ updateTweets, session, username, imageURL }: FormTweetProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const colorButton = text.length !== 0 ? 'bg-blue-600' : 'bg-[#1a4e78] text-white/50'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!session) {
      alert('Debes estar conectado para publicar un tweet')
      return
    }

    const newTweet: TweestType = {
      textMarkdown: text,
      nickname: username,
      urlImage: imageURL as urlImage
    }

    updateTweets(newTweet)
    setText('')

    if (textareaRef.current) {
      textareaRef.current.style.height = '80px'
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current

    if (textarea) {
      if (text.length === 0) {
        textarea.style.height = '80px'
      }

      const height = textarea.scrollHeight
      textarea.style.height = '80px'
      textarea.style.height = height + 'px'
    }
  }

  const handleFocus = () => {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = '80px'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current
    const button = buttonRef.current

    if (e.key === 'Backspace') {
      if (textarea) { textarea.style.height = '80px' }
    }

    if (e.key === 'Escape') {
      setText('')
      if (textarea) { textarea.style.height = '80px' }
    }

    if (e.ctrlKey && e.key === 'Enter' && text.length !== 0) {
      if (button) {
        button.click()
      }
    }
  }
  return (
    <form className="w-11/12 h-fit flex flex-col items-end gap-3" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
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
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      >
      </textarea>

      <button
        ref={buttonRef}
        className={`${colorButton} py-2 px-4 font-semibold rounded-full text-white`}
        disabled={text.length === 0}
      >
        Postear
      </button>
    </form>
  )
}

export { FormTweet }
