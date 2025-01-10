import next from 'next';
import { createServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';

/**
 * Define si el entorno es de desarrollo o producción.
 * @constant {boolean} dev
 */
const dev = process.env.NODE_ENV !== 'production';

/**
 * Nombre del host donde se ejecutará el servidor.
 * @constant {string} hostname
 */
const hostname = 'localhost';

/**
 * Puerto en el que se ejecutará el servidor.
 * @constant {number} port
 */
const port = 3000;

/**
 * Instancia de la aplicación Next.js.
 * @constant {NextServer} app
 */
const app = next({ dev, hostname, port });

/**
 * Manejador de solicitudes de Next.js.
 * @constant {Function} handler
 */
const handler = app.getRequestHandler();

/**
 * Prepara la aplicación Next.js y configura el servidor HTTP con Socket.IO.
 * @async
 */
app.prepare().then(() => {
  /**
   * Servidor HTTP creado para manejar solicitudes.
   * @constant {http.Server} httpServer
   */
  const httpServer = createServer(handler);

  /**
   * Instancia del servidor Socket.IO.
   * @constant {SocketServer} io
   */
  const io = new SocketServer(httpServer);

  /**
   * Escucha el evento de conexión de un socket.
   * @event connection
   * @param {Socket} socket - Instancia del socket conectado.
   */
  io.on('connection', (socket) => {
    /**
     * Escucha el evento 'chat:message' enviado por el cliente.
     * @event chat:message
     * @param {any} data - Datos enviados por el cliente.
     */
    socket.on('chat:message', (data) => {
      console.log('chat:message', data);

      /**
       * Retransmite el mensaje a todos los clientes conectados, excepto al que lo envió.
       * @method broadcast.emit
       * @param {string} event - Nombre del evento ('chat:message').
       * @param {any} data - Datos a enviar.
       */
      socket.broadcast.emit('chat:message', data);
    });
  });

  /**
   * Maneja errores del servidor HTTP.
   * @event error
   * @param {Error} err - Error ocurrido.
   */
  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  /**
   * Inicia el servidor HTTP en el puerto especificado.
   * @method listen
   * @param {number} port - Puerto en el que escuchar.
   * @param {Function} callback - Función que se ejecuta cuando el servidor está listo.
   */
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});