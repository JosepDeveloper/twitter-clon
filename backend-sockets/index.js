import express from 'express'
import http from 'node:http'
import logger from 'morgan'
import { Server as SocketServer } from 'socket.io'

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ["https://twitter-clon-frontend-tau.vercel.app/", "https://twitter-clon-frontend-git-main-josepdevelopers-projects.vercel.app/"],
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
