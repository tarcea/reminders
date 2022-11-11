import { io } from 'socket.io-client';

export const apiUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL!
  : 'http://localhost:3001';

export const socket = io(apiUrl);
