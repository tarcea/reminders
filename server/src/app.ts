import express, { Express } from 'express';
import http from 'http';
import todoRoutes from './routes';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import list from './models/list';

dotenv.config();

const DB_URI: string = process.env.DB_URI!;

const PORT: string | number = process.env.PORT! || 3001;
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server,
  {
    cors: {
      // origin: ['http://localhost:3000'], // dev
      origin: ['https://mycoolreminders.netlify.app'],// prod
    }
  }
);

mongoose
  .connect(DB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => {
    throw error;
  });

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

io.on('connection', (socket: Socket) => {
  console.log(`New client connected ${socket.id}`);
  socket.on('fetch_data', id => {
    console.log('crid', id)
    // list.findById(id.toString())
    //   .then(docs => {
    //     socket.emit('get_data', docs);
    //     socket.broadcast.emit('get_data', docs);
    //     console.log(docs)
    //   })
    //   .catch(err => console.log(err));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
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
