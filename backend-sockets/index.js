import express from 'express'
import http from 'node:http'
import logger from 'morgan'
import cors from 'cors'
import { Server as SocketServer } from 'socket.io'

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: [],
  },
});

app.use(logger('dev'));

io.on("connection", (socket) => {
  socket.on("chat:message", (data) => {
    socket.broadcast.emit("chat:message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
