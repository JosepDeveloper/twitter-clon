import Markdown from 'react-markdown';
import reactGmf from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { Avatar } from '@/components/avatar';

/**
 * Propiedades del componente Tweets.
 * 
 * @interface TweetsProps
 * @property {string} textMarkdown - Contenido del tweet en formato Markdown.
 * @property {string} nickname - Nombre de usuario del autor del tweet.
 * @property {string} urlImage - URL de la imagen de perfil del autor del tweet.
 */
interface TweetsProps {
  textMarkdown: string;
  nickname: string;
  urlImage: string;
}

/**
 * Componente Tweets.
 * Representa un tweet individual, mostrando el avatar del usuario, su nombre y el contenido del tweet en formato Markdown.
 * 
 * @component
 * @param {TweetsProps} props - Propiedades del componente.
 * @param {string} props.textMarkdown - Contenido del tweet en formato Markdown.
 * @param {string} props.nickname - Nombre de usuario del autor del tweet.
 * @param {string} props.urlImage - URL de la imagen de perfil del autor del tweet.
 * @returns {JSX.Element} - Elemento JSX que representa un tweet.
 * 
 * @example
 * // Ejemplo de uso del componente Tweets
 * <Tweets
 *   textMarkdown="¡Hola mundo! Este es un **tweet** de ejemplo."
 *   nickname="usuario123"
 *   urlImage="https://i.pravatar.cc/150?u=usuario123"
 * />
 */
function Tweets({ nickname, textMarkdown, urlImage }: TweetsProps): JSX.Element {
  return (
    <article className="p-2 flex gap-2">
      {/* Avatar del usuario */}
      <header>
        <Avatar src={urlImage} name={nickname} className="w-12" />
      </header>

      {/* Contenido del tweet */}
      <div className="flex flex-col gap-2 w-full">
        {/* Nombre de usuario */}
        <div className="flex gap-2 items-center justify-start">
          <h2 className="text-lg font-semibold tracki border-none scroll-m-none p-0 m-0">
            {nickname}
          </h2>
        </div>

        {/* Contenido del tweet en formato Markdown */}
        <Markdown remarkPlugins={[reactGmf, remarkDirective]}>
          {textMarkdown}
        </Markdown>
      </div>
    </article>
  );
}

/**
 * Exporta el componente Tweets para su uso en otros módulos.
 * 
 * @exports Tweets
 */
export { Tweets };