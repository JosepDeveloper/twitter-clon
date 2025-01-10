'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

/**
 * Propiedades del componente WrapperSessionProvider.
 * 
 * @interface WrapperSessionProviderProps
 * @property {ReactNode} children - Componentes hijos que serán envueltos por el SessionProvider.
 */
interface WrapperSessionProviderProps {
  children: ReactNode;
}

/**
 * Componente WrapperSessionProvider.
 * Envuelve a sus hijos con el `SessionProvider` de NextAuth.js, lo que permite que los componentes hijos accedan a la sesión del usuario.
 * 
 * @component
 * @param {WrapperSessionProviderProps} props - Propiedades del componente.
 * @param {ReactNode} props.children - Componentes hijos que serán envueltos por el SessionProvider.
 * @returns {JSX.Element} - Elemento JSX que representa el wrapper del SessionProvider.
 * 
 * @example
 * // Ejemplo de uso del componente WrapperSessionProvider
 * <WrapperSessionProvider>
 *   <App />
 * </WrapperSessionProvider>
 */
function WrapperSessionProvider({ children }: WrapperSessionProviderProps): JSX.Element {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

/**
 * Exporta el componente WrapperSessionProvider para su uso en otros módulos.
 * 
 * @exports WrapperSessionProvider
 */
export { WrapperSessionProvider };