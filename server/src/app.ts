import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT: string | number = process.env.PORT || 3001;
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

io.on("connection", socket => {
  console.log("New client connected" + socket.id);
  // socket.on("fetch_data", id => {
  //   TodoList.findById(id)
  //     .then(docs => {
  //       socket.emit("get_data", docs);
  //       socket.broadcast.emit("get_data", docs);
  //     })
  //     .catch(err => console.log(err));
  // });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get('/', (req, res) => {
  res.send('This is your reminder')
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});

// app.listen(PORT, () => {
//   console.log(`server listening on port ${PORT}`)
// });