import React, { FC, useState, FormEvent } from 'react';
import './styles/EditTodo.css';
import { useParams } from 'react-router-dom';
import { addTodo } from '../Api';

const AddTodo: FC<{ fetchTodos: Function }> = ({ fetchTodos }) => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { name: '', description: '', cost: '' };
  const [formData, setFormData] = useState(initialState);
  const { listId } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo({ ...formData, _id: '', done: false }, listId!)
    fetchTodos(listId)
    setFormData(initialState);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div className="edit-todo__container">
      <form onSubmit={handleSubmit} className="edit-todo__form">
        <label style={{ display: "none" }}>name</label>
        <input
          type="text"
          required
          placeholder="add a new task *"
          id="name"
          value={formData.name}
          onChange={handleChange} />
        <label style={{ display: "none" }}>price</label>
        <input
          type="number"
          onWheel={event => event.currentTarget.blur()}
          id="cost"
          placeholder="task price"
          value={formData.cost}
          onChange={handleChange} />
        <label style={{ display: "none" }}>description</label>
        {/* <input
        type="text"
        placeholder="description"
        id="description"
        value={formData.description}
        onChange={handleChange} /> */}
        <input
          type="submit"
          value="add todo" />
      </form>
    </div>
  );
};

export default AddTodo;