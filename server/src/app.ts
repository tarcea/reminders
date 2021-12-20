import express, { Express } from 'express';
import http from 'http';
import todoRoutes from './routes';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI: string = process.env.DB_URI!;

const PORT: string | number = process.env.PORT! || 3001;
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

mongoose
  .connect(DB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => {
    throw error;
  });

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

io.on("connection", (socket: Socket) => {
  console.log("New client connected" + socket.id);
  // TODO: code for multiple sockets connected
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
