import React, { FC, FormEvent } from 'react';
import './styles/EditTodo.css';
import { updateTodo } from '../Api';

const EditTodo: FC<{ formData: any, setFormData: Function, socket: any, todoId: string, listId: string, setEditTodo: Function }> = ({ formData, setFormData, socket, todoId, listId, setEditTodo }) => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { description: '', name: '', cost: '' };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTodo(listId, todoId, formData)
    setEditTodo(false);
    console.log('edit', formData)
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
        <label>Task name</label>
        <input
          type="text"
          required
          placeholder="add a new task *"
          id="name"
          value={formData.name}
          onChange={handleChange} />
        <label>Task price</label>
        <input
          type="number"
          id="cost"
          placeholder="task price"
          value={formData.cost}
          onChange={handleChange} />
        <label>Short description</label>
        <textarea
          placeholder="description"
          id="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value.toLowerCase() })} />
        <input
          type="submit"
          value="edit todo" />
        <div
          onClick={() => setEditTodo(false)}
          className="edit-todo--quit"
        >
          x
        </div>
      </form>
    </div>
  );
};

export default EditTodo;