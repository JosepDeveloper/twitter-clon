'use client';

import { usePathname } from 'next/navigation';

/**
 * Componente SearchIcons.
 * Renderiza un ícono de "búsqueda" en formato SVG.
 * El grosor del trazo (`strokeWidth`) se ajusta dependiendo de si la ruta actual es `/search`.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el ícono de "búsqueda".
 * 
 * @example
 * // Ejemplo de uso del componente SearchIcons
 * <SearchIcons />
 */
function SearchIcons(): JSX.Element {
  const route = usePathname();

  // Define el grosor del trazo según la ruta actual
  const size = route === '/search' ? 2.5 : 1.8;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={size}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-search"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  );
}

/**
 * Exporta el componente SearchIcons para su uso en otros módulos.
 * 
 * @exports SearchIcons
 */
export { SearchIcons };