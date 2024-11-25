import { GithubIcon } from '@/components/icons/github-icon'

function ButtonLogin () {
  return (
    <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/70 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 w-[226px] transition-colors ease-linear duration-75">
      <GithubIcon />
      Iniciar sesión con Github
    </button>
  )
}

export { ButtonLogin }
