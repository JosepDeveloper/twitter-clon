import { getServerSession } from 'next-auth';
import { ButtonLogin } from './button-login';
import { ButtonSingOut } from './button-sing-out';
import { OPTIONS_SESSION } from '@/lib/session';

/**
 * Componente ButtonSession.
 * Determina si el usuario ha iniciado sesión y renderiza un botón para iniciar sesión o cerrar sesión.
 * 
 * @async
 * @function ButtonSession
 * @returns {Promise<JSX.Element>} - Una promesa que resuelve en el elemento JSX que representa el botón de sesión.
 * 
 * @example
 * // Ejemplo de uso del componente ButtonSession
 * <ButtonSession />
 */
async function ButtonSession(): Promise<JSX.Element> {
  // Obtiene la sesión del usuario
  const session = await getServerSession(OPTIONS_SESSION);

  // Verifica si el usuario ha iniciado sesión
  const isUserLoged = session !== null;

  return (
    <>
      {isUserLoged ? <ButtonSingOut /> : <ButtonLogin />}
    </>
  );
}

/**
 * Exporta el componente ButtonSession para su uso en otros módulos.
 * 
 * @exports ButtonSession
 */
export { ButtonSession };