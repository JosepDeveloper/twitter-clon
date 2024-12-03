import { io } from 'socket.io-client'

const URL_SOCKET_SERVER = 'https://twitter-clon-eight.vercel.app/'

const socket = io(URL_SOCKET_SERVER)

export { socket }
