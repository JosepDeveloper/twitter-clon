import Image from 'next/image';

/**
 * Propiedades del componente Avatar.
 * @interface AvatarProps
 * @property {string} src - URL de la imagen del avatar.
 * @property {string} name - Texto alternativo para la imagen (atributo `alt`).
 * @property {string} [className] - Clases CSS adicionales para personalizar el estilo del avatar.
 */
interface AvatarProps {
  src: string;
  name: string;
  className?: string;
}

/**
 * Componente Avatar.
 * Muestra una imagen redondeada con un tamaño fijo de 48x48 píxeles.
 * 
 * @component
 * @param {AvatarProps} props - Propiedades del componente.
 * @param {string} props.src - URL de la imagen del avatar.
 * @param {string} props.name - Texto alternativo para la imagen (atributo `alt`).
 * @param {string} [props.className] - Clases CSS adicionales para personalizar el estilo del avatar.
 * @returns {JSX.Element} - Elemento JSX que representa el avatar.
 * 
 * @example
 * // Ejemplo de uso del componente Avatar
 * <Avatar src="/path/to/image.jpg" name="John Doe" className="border-2 border-white" />
 */
function Avatar({ src, name, className }: AvatarProps): JSX.Element {
  return (
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      className={`rounded-full ${className}`}
    />
  );
}

/**
 * Exporta el componente Avatar para su uso en otros módulos.
 * 
 * @exports Avatar
 */
export { Avatar };