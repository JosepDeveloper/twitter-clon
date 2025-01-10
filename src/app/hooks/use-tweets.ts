import { useState } from 'react';
import { TweestType } from '../types/tweet.types';

/**
 * Hook personalizado para gestionar una lista de tweets.
 * Proporciona funciones para actualizar los tweets localmente y a través de una API.
 * 
 * @function useTweets
 * @param {TweestType[]} tweetsData - Lista inicial de tweets.
 * @returns {Object} - Un objeto que contiene la lista de tweets y funciones para actualizarlos.
 * @property {TweestType[]} tweets - Lista actual de tweets.
 * @property {Function} updateTweets - Función para agregar un nuevo tweet y enviarlo a la API.
 * @property {Function} updateTweetsSockets - Función para agregar un nuevo tweet localmente (sin enviarlo a la API).
 */
function useTweets(tweetsData: TweestType[]) {
  const [tweets, setTweets] = useState<TweestType[]>(tweetsData);

  /**
   * Agrega un nuevo tweet localmente (sin enviarlo a la API).
   * Ideal para actualizaciones en tiempo real mediante sockets.
   * 
   * @function updateTweetsSockets
   * @param {TweestType} newTweets - Nuevo tweet a agregar.
   */
  const updateTweetsSockets = (newTweets: TweestType) => {
    const tweet = {
      ...newTweets,
      id: tweets.length + 1, // Asigna un ID único al nuevo tweet
    };

    setTweets((prevTweets) => [tweet, ...prevTweets]);
  };

  /**
   * Agrega un nuevo tweet y lo envía a la API para su almacenamiento.
   * 
   * @function updateTweets
   * @param {TweestType} newTweets - Nuevo tweet a agregar.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el tweet se ha enviado y la lista se ha actualizado.
   */
  const updateTweets = async (newTweets: TweestType) => {
    const tweet = {
      ...newTweets,
      id: tweets.length + 1, // Asigna un ID único al nuevo tweet
    };

    // Envía el tweet a la API
    const response = await fetch('/api/tweets', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: tweet.textMarkdown,
        username: tweet.nickname,
      }),
    });

    // Actualiza la lista de tweets localmente
    setTweets((prevTweets) => [tweet, ...prevTweets]);
  };

  return {
    tweets,
    updateTweets,
    updateTweetsSockets,
  };
}

/**
 * Exporta el hook `useTweets` para su uso en otros módulos.
 * 
 * @exports useTweets
 */
export { useTweets };