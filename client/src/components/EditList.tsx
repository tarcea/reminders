import React, { FC, useEffect, useState, FormEvent } from 'react';
import { io } from 'socket.io-client';
import { } from '../Api';

// const socket = io('http://localhost:3001'); // DEV
// const socket = io(process.env.REACT_APP_API_URL!); // PROD

const EditList = () => {
  const initialState: Omit<IList, '_id' | 'done'> = { name: '' };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState<String>('nothing to show');
  /*
    socket.on('emit_data', data => {
      setFormData({ ...formData, ...data });
    });
    useEffect(() => {
      socket.on('connect', () => {
        setMessage(`You connected with id: ${socket.id}`);
        // socket.on('change_data', formData => {
        //   setFormData(formData)
        // });
        socket.emit('edit_data', formData)
        // socket.on('disconnect', () => {
        //   console.log('disconnected')
        // });
      });
      console.log('martor')
      return () => {
        socket.disconnect();
      };
    }, []); */
};

export default EditList;