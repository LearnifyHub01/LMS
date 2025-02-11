import { io } from 'socket.io-client';

const socketInstance = io('http://localhost:8080', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

export default socketInstance;
