'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { signIn } from 'next-auth/react';
import useScreenSize from '../hooks/useScreenSize';


/**
 * Componente ButtonLogin.
 * Renderiza un botón que permite a los usuarios iniciar sesión utilizando GitHub como proveedor de autenticación.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el botón de inicio de sesión con GitHub.
 * 
 * @example
 * // Ejemplo de uso del componente ButtonLogin
 * <ButtonLogin />
 */
function ButtonLogin(): JSX.Element {

  const { width = 0 } = useScreenSize()

  return (
    <button
      type="button"
      className="w-[95%] text-center flex justify-center text-white bg-[#24292F] hover:bg-[#24292F]/70 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 items-center dark:focus:ring-gray-500 me-2 mb-2 transition-colors ease-linear duration-75"
      onClick={() => signIn('github')}
    >
      {width < 1195 ? (null) : <GithubIcon />}
      {width < 490 ? 'Iniciar sesion' : 'Iniciar sesion con github'}
    </button>
  );
}

/**
 * Exporta el componente ButtonLogin para su uso en otros módulos.
 * 
 * @exports ButtonLogin
 */
export { ButtonLogin };