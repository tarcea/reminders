import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Sock: React.FC<{ currentId: string }> = ({ currentId }) => {
  const [message, setMessage] = useState('nothing to show');

  useEffect(() => {
    // const socket = io('http://localhost:3001');
    const socket = io(process.env.REACT_APP_API_URL!)
    socket.on('connect', () => {
      setMessage(`You connected with id: ${socket.id}`)
      currentId && socket.emit('fetch_data', currentId)
    });
    socket.on('disconnect', () => {
      console.log('disconnected')
    });
  }, [currentId]);

  return (
    <div>
      {message}
    </div>
  )
};

export default Sock;