/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { Avatar } from '../../components/avatar';
import { TweestType } from '../types/tweet.types';
import { FormTweet } from './form-tweet';

/**
 * Propiedades del componente PostTweet.
 * 
 * @interface PostTweetProps
 * @property {Function} updateTweets - Función para actualizar la lista de tweets en el servidor.
 * @property {Function} updateTweetsSockets - Función para actualizar la lista de tweets en tiempo real mediante sockets.
 * @property {boolean} session - Indica si el usuario ha iniciado sesión.
 * @property {string} username - Nombre de usuario del autor del tweet.
 * @property {string} imageURL - URL de la imagen de perfil del autor del tweet.
 */
interface PostTweetProps {
  updateTweets: (newTweet: TweestType) => void;
  updateTweetsSockets: (newTweet: TweestType) => void;
  session: boolean;
  username: string;
  imageURL: string;
}

/**
 * Obtiene o crea un usuario en la base de datos.
 * 
 * @async
 * @function getUser
 * @param {string} username - Nombre de usuario.
 * @param {string} imageURL - URL de la imagen de perfil.
 * @returns {Promise<{ username: string, imageURL: string }>} - Una promesa que resuelve en un objeto con el nombre de usuario y la URL de la imagen de perfil.
 */
async function getUser(username: string, imageURL: string) {
  // Busca el usuario en la base de datos
  const response = await fetch(`/api/users?username=${username}`, { cache: 'no-cache' });
  const data = await response.json();

  // Si el usuario existe, devuelve sus datos
  if (data.message !== 'User not found') {
    const { data: { username, imageURL } } = data;
    return { username, imageURL };
  }

  // Si el usuario no existe, lo crea en la base de datos
  const responsePost = await fetch('/api/users', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, imageURL }),
  });

  const dataPost = await responsePost.json();

  // Si el usuario se creó correctamente, devuelve sus datos
  if (dataPost.message !== 'User Created Sucessfully') {
    return { username, imageURL };
  }

  return { username: dataPost.data.username, imageURL: dataPost.data.imageURL };
}

/**
 * Componente PostTweet.
 * Permite a los usuarios publicar tweets, mostrando un avatar y un formulario para escribir el contenido del tweet.
 * Además, gestiona la obtención y creación de usuarios en la base de datos si es necesario.
 * 
 * @component
 * @param {PostTweetProps} props - Propiedades del componente.
 * @param {Function} props.updateTweets - Función para actualizar la lista de tweets en el servidor.
 * @param {Function} props.updateTweetsSockets - Función para actualizar la lista de tweets en tiempo real mediante sockets.
 * @param {boolean} props.session - Indica si el usuario ha iniciado sesión.
 * @param {string} props.username - Nombre de usuario del autor del tweet.
 * @param {string} props.imageURL - URL de la imagen de perfil del autor del tweet.
 * @returns {JSX.Element} - Elemento JSX que representa el componente para publicar tweets.
 * 
 * @example
 * // Ejemplo de uso del componente PostTweet
 * <PostTweet
 *   updateTweets={updateTweets}
 *   updateTweetsSockets={updateTweetsSockets}
 *   session={session}
 *   username={username}
 *   imageURL={imageURL}
 * />
 */
function PostTweet({
  updateTweets,
  session,
  username,
  imageURL,
  updateTweetsSockets,
}: PostTweetProps): JSX.Element {
  // Valores predeterminados para el avatar y el nombre si el usuario no ha iniciado sesión
  let avatar = 'https://i.pravatar.cc/150?u=a042581f4e29026024d';
  let name = 'Anonymous';

  // Si el usuario ha iniciado sesión, usa sus datos
  if (session) {
    avatar = imageURL;
    name = username;
  }

  /**
   * Efecto para obtener o crear el usuario en la base de datos.
   * Solo se ejecuta si el usuario ha iniciado sesión.
   */
  useEffect(() => {
    if (!session) return;

    const fetchUserInfo = async () => {
      const infoUser = await getUser(name, avatar);

      // Actualiza el avatar y el nombre con los datos del usuario
      avatar = infoUser.imageURL;
      name = infoUser.username;
    };

    fetchUserInfo();
  }, [name, avatar]);

  return (
    <div className="flex gap-5 mt-4">
      {/* Avatar del usuario */}
      <div>
        <Avatar src={avatar} name={name} />
      </div>

      {/* Formulario para publicar tweets */}
      <FormTweet
        updateTweets={updateTweets}
        imageURL={avatar}
        username={name}
        session={session}
        updateTweetsSockets={updateTweetsSockets}
      />
    </div>
  );
}

/**
 * Exporta el componente PostTweet para su uso en otros módulos.
 * 
 * @exports PostTweet
 */
export { PostTweet };