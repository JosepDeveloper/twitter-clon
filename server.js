import next from 'next'
import { createServer } from 'node:http'
import { Server as SocketServer } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new SocketServer(httpServer)

  io.on('connection', (socket) => {
    socket.on('chat:message', (data) => {
      console.log('chat:message', data)
      socket.broadcast.emit('chat:message', data)
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
