'use client';

import { LogoutIcon } from '@/components/icons/logout-icon';
import { signOut } from 'next-auth/react';

/**
 * Componente ButtonSingOut.
 * Renderiza un botón que permite a los usuarios cerrar sesión en la aplicación.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el botón de cierre de sesión.
 * 
 * @example
 * // Ejemplo de uso del componente ButtonSingOut
 * <ButtonSingOut />
 */
function ButtonSingOut(): JSX.Element {
  return (
    <button
      className="text-white bg-[#24292F] hover:bg-[#24292F]/70 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 w-[226px] transition-colors ease-linear duration-75 gap-2"
      onClick={() => signOut()}
    >
      <LogoutIcon />
      Cerrar sesión
    </button>
  );
}

/**
 * Exporta el componente ButtonSingOut para su uso en otros módulos.
 * 
 * @exports ButtonSingOut
 */
export { ButtonSingOut };