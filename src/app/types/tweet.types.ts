/**
 * Tipo personalizado para URLs de imágenes.
 * Define un tipo que solo acepta URLs de imágenes que comiencen con:
 * - `https://i.pravatar.cc/150?u=a` seguido de cualquier cadena.
 * - `https://avatars.githubusercontent.com/` seguido de cualquier cadena.
 * 
 * @typedef {`https://i.pravatar.cc/150?u=a${string}` | `https://avatars.githubusercontent.com/${string}`} urlImage
 */
export type urlImage =
  | `https://i.pravatar.cc/150?u=a${string}`
  | `https://avatars.githubusercontent.com/${string}`;

/**
 * Interfaz que representa la estructura de un tweet.
 * 
 * @interface TweestType
 * @property {string} textMarkdown - Contenido del tweet en formato Markdown.
 * @property {string} nickname - Nombre de usuario del autor del tweet.
 * @property {urlImage} urlImage - URL de la imagen de perfil del autor del tweet.
 */
interface TweestType {
  textMarkdown: string;
  nickname: string;
  urlImage: urlImage;
}

/**
 * Exporta la interfaz `TweestType` para su uso en otros módulos.
 * 
 * @exports TweestType
 */
export type { TweestType };