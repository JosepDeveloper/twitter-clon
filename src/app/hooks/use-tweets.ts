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
 * @property {Function} loadMoreTweets - Función para cargar más tweets (paginación).
 * @property {boolean} loading - Indica si se están cargando más tweets.
 * @property {boolean} hasMore - Indica si hay más tweets disponibles para cargar.
 */
function useTweets(tweetsData: TweestType[]) {
  const [tweets, setTweets] = useState<TweestType[]>(tweetsData);
  const [page, setPage] = useState(1); // Página actual para la paginación
  const [loading, setLoading] = useState(false); // Estado de carga
  const [hasMore, setHasMore] = useState(true); // Indica si hay más tweets para cargar

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

  /**
   * Carga más tweets desde la API (paginación).
   * 
   * @function loadMoreTweets
   * @returns {Promise<void>} - Una promesa que se resuelve cuando se han cargado más tweets.
   */
  const loadMoreTweets = async () => {
    if (loading || !hasMore) return; // Evita cargar más si ya se está cargando o no hay más tweets

    setLoading(true);

    try {
      // Simula una llamada a la API para obtener más tweets
      const response = await fetch(`/api/tweets?page=${page + 1}`, {
        cache: 'no-cache',
      });
      const newTweets: TweestType[] = await response.json();

      if (newTweets.length > 0) {
        setTweets((prevTweets) => [...prevTweets, ...newTweets]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No hay más tweets para cargar
      }
    } catch (error) {
      console.error('Error al cargar más tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tweets,
    updateTweets,
    updateTweetsSockets,
    loadMoreTweets,
    loading,
    hasMore,
  };
}

/**
 * Exporta el hook `useTweets` para su uso en otros módulos.
 * 
 * @exports useTweets
 */
export { useTweets };