/**
 * Componente TwitterIcon.
 * Renderiza un ícono de Twitter (o "X") en formato SVG.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa el ícono de Twitter.
 * 
 * @example
 * // Ejemplo de uso del componente TwitterIcon
 * <TwitterIcon />
 */
function TwitterIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x "
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  
  );
}

/**
 * Exporta el componente TwitterIcon para su uso en otros módulos.
 * 
 * @exports TwitterIcon
 */
export { TwitterIcon };