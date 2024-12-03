import { io } from 'socket.io-client'

const URL_SOCKET_SERVER = process.env.BACKEND_SOCKETS_URL || 'http://localhost:4000/'

const socket = io(URL_SOCKET_SERVER)

export { socket }
