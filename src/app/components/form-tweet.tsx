'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TweestType, urlImage } from '../types/tweet.types';
import { socket } from '@/lib/socket';

/**
 * Propiedades del componente FormTweet.
 * 
 * @interface FormTweetProps
 * @property {Function} updateTweets - Función para actualizar la lista de tweets en el servidor.
 * @property {Function} updateTweetsSockets - Función para actualizar la lista de tweets en tiempo real mediante sockets.
 * @property {boolean} session - Indica si el usuario ha iniciado sesión.
 * @property {string} username - Nombre de usuario del autor del tweet.
 * @property {string} imageURL - URL de la imagen de perfil del autor del tweet.
 */
interface FormTweetProps {
  updateTweets: (newTweet: TweestType) => void;
  updateTweetsSockets: (newTweet: TweestType) => void;
  session: boolean;
  username: string;
  imageURL: string;
}

/**
 * Componente FormTweet.
 * Representa un formulario para publicar tweets, con funcionalidades como ajuste automático de altura del área de texto,
 * validación de sesión, y manejo de eventos de teclado.
 * 
 * @component
 * @param {FormTweetProps} props - Propiedades del componente.
 * @param {Function} props.updateTweets - Función para actualizar la lista de tweets en el servidor.
 * @param {Function} props.updateTweetsSockets - Función para actualizar la lista de tweets en tiempo real mediante sockets.
 * @param {boolean} props.session - Indica si el usuario ha iniciado sesión.
 * @param {string} props.username - Nombre de usuario del autor del tweet.
 * @param {string} props.imageURL - URL de la imagen de perfil del autor del tweet.
 * @returns {JSX.Element} - Elemento JSX que representa el formulario para publicar tweets.
 * 
 * @example
 * // Ejemplo de uso del componente FormTweet
 * <FormTweet
 *   updateTweets={updateTweets}
 *   updateTweetsSockets={updateTweetsSockets}
 *   session={session}
 *   username={username}
 *   imageURL={imageURL}
 * />
 */
function FormTweet({
  updateTweets,
  session,
  username,
  imageURL,
  updateTweetsSockets,
}: FormTweetProps): JSX.Element {
  const [text, setText] = useState(''); // Estado para almacenar el contenido del tweet
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Referencia al área de texto
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Referencia al botón de enviar

  // Color del botón dependiendo de si hay texto en el área de texto
  const colorButton = text.length !== 0 ? 'bg-blue-600' : 'bg-[#1a4e78] text-white/50';

  /**
   * Maneja el envío del formulario.
   * 
   * @function handleSubmit
   * @param {React.FormEvent<HTMLFormElement>} event - Evento de envío del formulario.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verifica si el usuario ha iniciado sesión
    if (!session) {
      alert('Debes estar conectado para publicar un tweet');
      return;
    }

    // Crea un nuevo tweet
    const newTweet: TweestType = {
      textMarkdown: text,
      nickname: username,
      urlImage: imageURL as urlImage,
    };

    // Emite el tweet a través de sockets
    socket.emit('chat:message', JSON.stringify(newTweet));

    // Actualiza la lista de tweets en el servidor
    updateTweets(newTweet);

    // Limpia el área de texto y restablece su altura
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '80px';
    }
  };

  /**
   * Ajusta la altura del área de texto automáticamente según su contenido.
   * 
   * @function handleInput
   */
  const handleInput = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      if (text.length === 0) {
        textarea.style.height = '80px';
      }

      const height = textarea.scrollHeight;
      textarea.style.height = '80px';
      textarea.style.height = height + 'px';
    }
  };

  /**
   * Maneja el enfoque del área de texto.
   * 
   * @function handleFocus
   */
  const handleFocus = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = '80px';
    }
  };

  /**
   * Maneja eventos de teclado en el área de texto.
   * 
   * @function handleKeyDown
   * @param {KeyboardEvent<HTMLTextAreaElement>} e - Evento de teclado.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    const button = buttonRef.current;

    // Restablece la altura al borrar texto
    if (e.key === 'Backspace') {
      if (textarea) {
        textarea.style.height = '80px';
      }
    }

    // Limpia el área de texto al presionar Escape
    if (e.key === 'Escape') {
      setText('');
      if (textarea) {
        textarea.style.height = '80px';
      }
    }

    // Envía el formulario al presionar Ctrl + Enter
    if (e.ctrlKey && e.key === 'Enter' && text.length !== 0) {
      if (button) {
        button.click();
      }
    }
  };

  // Escucha eventos de sockets para actualizar la lista de tweets en tiempo real
  useEffect(() => {
    socket.on('chat:message', (data) => {
      const newTweet = JSON.parse(data);
      updateTweetsSockets(newTweet);
    });

    return () => {
      socket.off('chat:message'); // Limpia el listener al desmontar el componente
    };
  }, [updateTweetsSockets]);

  return (
    <form className="w-11/12 h-fit flex flex-col items-end gap-3" onSubmit={handleSubmit}>
      {/* Área de texto para escribir el tweet */}
      <textarea
        ref={textareaRef}
        className={`
          bg-black
          w-full min-h-20 max-h-60
          resize-none overflow-hidden
          text-xl
          border-b border-white/20
          active:outline-none focus:outline-none
        `}
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="¡¿Qué está pasando?!"
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />

      {/* Botón para publicar el tweet */}
      <button
        ref={buttonRef}
        className={`${colorButton} py-2 px-4 font-semibold rounded-full text-white`}
        disabled={text.length === 0}
      >
        Postear
      </button>
    </form>
  );
}

/**
 * Exporta el componente FormTweet para su uso en otros módulos.
 * 
 * @exports FormTweet
 */
export { FormTweet };