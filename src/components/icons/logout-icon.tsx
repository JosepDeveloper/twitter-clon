/**
 * Componente LogoutIcon.
 * Renderiza un ícono de "cerrar sesión" en formato SVG.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el ícono de "cerrar sesión".
 * 
 * @example
 * // Ejemplo de uso del componente LogoutIcon
 * <LogoutIcon />
 */
function LogoutIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
      <path d="M15 12h-12l3 -3" />
      <path d="M6 15l-3 -3" />
    </svg>
  );
}

/**
 * Exporta el componente LogoutIcon para su uso en otros módulos.
 * 
 * @exports LogoutIcon
 */
export { LogoutIcon };