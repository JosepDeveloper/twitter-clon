import Link from 'next/link'
import { TwitterIcon } from '../../components/icons/twitter'
import { HomeIcon } from '../../components/icons/home-icons'

interface HeaderProps {
  className?: string
}

function Header ({ className }: HeaderProps) {
  return (
    <header className={`${className} pt-5 flex flex-col gap-5 sticky top-0 h-fit`}>
      <Link
        href='/'
        className={`
          w-[70%] p-2 rounded-full
          flex gap-2 justify-start items-center
          hover:bg-gray-700/65 transition-colors ease-linear
        `}
      >
        <TwitterIcon /> <span className='text-lg font-semibold'>Chigüire.Net</span>
      </Link>

      <nav>
        <ul className='list-none m-0 [&>li]:mt-0'>
          <li className=''>
            <Link
              href={'/'}
              className={`
                w-[50%] p-2 rounded-full
                flex gap-2 justify-start items-center
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
