import Link from 'next/link'
import { TwitterIcon } from './icons/twitter'
import { HomeIcon } from './icons/home-icons'

interface HeaderProps {
  className?: string
}

function Header ({ className }: HeaderProps) {
  return (
    <header className={`${className} pt-5 flex flex-col gap-5`}>
      <Link
        href='/'
        className={`
          w-[70%] p-2 rounded-full
          flex gap-2 justify-center items-center
          hover:bg-gray-700/65 transition-colors ease-linear
        `}
      >
        <TwitterIcon /> <span className='text-lg font-semibold'>Chigüire.Net</span>
      </Link>

      <nav>
        <ul>
          <li>
            <Link
              href={'/'}
              className={`
                w-[50%] p-2 rounded-full
                flex gap-2 items-center justify-around
                hover:bg-gray-700/65 transition-colors ease-linear
              `}
            >
              <HomeIcon /> <span className='font-medium'>Inicio</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { Header }
