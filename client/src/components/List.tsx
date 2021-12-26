import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getListById } from '../Api';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const [message, setMessage] = useState<String>('nothing to show');
  const [list, setList] = useState<IList>();
  const { listId } = useParams();

  const fetchListById = async (id: string) => {
    try {
      const fetchedList = await getListById(id);
      setList(fetchedList.data.list);

    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3001'); // DEV
    // const socket = io(process.env.REACT_APP_API_URL!); // PROD
    socket.on('connect', () => {
      setMessage(`You connected with id: ${socket.id}`)
      socket.emit('fetch_data', currentId)
    });
    socket.on('disconnect', () => {
      console.log('disconnected')
    });
  }, [currentId]);

  useEffect(() => {
    fetchListById(currentId);
  }, [currentId]);

  useEffect(() => {
    if (listId) {
      fetchListById(listId);
    }
  }, [listId]);

  return (
    <div>
      <p>{list?.todos?.length} -- {list?.name}</p>
      <p>{message}</p>
    </div>
  );
};

export default List;