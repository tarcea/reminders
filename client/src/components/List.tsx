import React, { FC, useEffect, useState, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { addTodo, getListById } from '../Api';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { name: '', description: '', cost: 0 };
  const [formData, setFormData] = useState(initialState);
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
    // const socket = io('http://localhost:3001'); // DEV
    const socket = io(process.env.REACT_APP_API_URL!); // PROD
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo({ ...formData, _id: '', done: false }, listId!)
    setFormData(initialState);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div>
      <p>{list?.todos?.length} -- {list?.name}</p>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange} />
        <label>description</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={handleChange} />
        <label>price</label>
        <input
          type="number"
          id="cost"
          value={formData.cost}
          onChange={handleChange} />
        <input
          type="submit"
          value="add todo" />
      </form>
    </div>
  );
};

export default List;