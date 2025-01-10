import Link from 'next/link';
import { TwitterIcon } from '../../components/icons/twitter';
import { HomeIcon } from '../../components/icons/home-icons';
import { SearchIcons } from '@/components/icons/search-icons';
import { ButtonSession } from './button-session';

/**
 * Propiedades del componente Header.
 * 
 * @interface HeaderProps
 * @property {string} [className] - Clases CSS adicionales para personalizar el estilo del encabezado.
 */
interface HeaderProps {
  className?: string;
}

/**
 * Componente Header.
 * Representa el encabezado de la aplicación, que incluye un enlace a la página principal,
 * una barra de navegación con enlaces a "Inicio" y "Explorar", y un botón de sesión.
 * 
 * @async
 * @function Header
 * @param {HeaderProps} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para personalizar el estilo del encabezado.
 * @returns {Promise<JSX.Element>} - Una promesa que resuelve en el elemento JSX que representa el encabezado.
 * 
 * @example
 * // Ejemplo de uso del componente Header
 * <Header className="bg-black text-white" />
 */
async function Header({ className }: HeaderProps): Promise<JSX.Element> {
  return (
    <header
      className={`${className} pt-5 flex flex-col sticky top-0 h-fit justify-between gap-10`}
    >
      {/* Enlace a la página principal */}
      <div>
        <Link
          href="/"
          className={`
            w-[70%] p-2 rounded-full
            flex gap-2 justify-start items-center
            hover:bg-gray-700/65 transition-colors ease-linear
          `}
        >
          <TwitterIcon /> <span className="text-lg font-semibold">Chigüire.Net</span>
        </Link>

        {/* Barra de navegación */}
        <nav>
          <ul className="list-none m-0 [&>li]:mt-0">
            {/* Enlace a "Inicio" */}
            <li>
              <Link
                href={'/'}
                className={`
                  w-[50%] p-2 rounded-full
                  flex gap-2 justify-start items-center
                  hover:bg-gray-700/65 transition-colors ease-linear
                `}
              >
                <HomeIcon /> <span className="font-medium">Inicio</span>
              </Link>
            </li>

            {/* Enlace a "Explorar" */}
            <li>
              <Link
                href={'#'}
                className={`
                  w-[50%] p-2 rounded-full
                  flex gap-2 justify-start items-center
                  hover:bg-gray-700/65 transition-colors ease-linear
                `}
              >
                <SearchIcons /> <span className="font-medium">Explorar</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Botón de sesión (Iniciar sesión o Cerrar sesión) */}
      <ButtonSession />
    </header>
  );
}

/**
 * Exporta el componente Header para su uso en otros módulos.
 * 
 * @exports Header
 */
export { Header };