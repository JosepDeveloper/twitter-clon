import { io } from 'socket.io-client';

/**
 * Instancia del cliente de Socket.IO.
 * Esta instancia se conecta automáticamente al servidor de Socket.IO en la misma URL del host desde donde se sirve la aplicación.
 * 
 * @constant {Socket} socket
 * @see https://socket.io/docs/v4/client-api/
 */
const socket = io();

/**
 * Exporta la instancia del socket para su uso en otros módulos.
 * 
 * @exports socket
 */
export { socket };