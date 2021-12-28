import React, { FC, useEffect, useState, FormEvent } from 'react';
import './styles/list.css';
import { Link, useParams } from 'react-router-dom';
import { addTodo, getListById, getTodosByListId } from '../Api';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { name: '', description: '', cost: 0 };
  const [formData, setFormData] = useState(initialState);
  const [list, setList] = useState<IList>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { listId } = useParams();

  const fetchListById = async (id: string) => {
    try {
      const fetchedList = await getListById(id);
      setList(fetchedList.data.list);

    } catch (err) {
      console.log(err)
    }
  };

  const fetchTodos = async (id: string) => {
    try {
      const fetchedTodos = await getTodosByListId(id);
      setTodos(fetchedTodos.data.todos);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (currentId) {
      fetchListById(currentId);
      fetchTodos(currentId);
    }
    if (listId) {
      fetchListById(listId);
      fetchTodos(listId);
    }
    console.log('martor')
  }, [listId, currentId, formData]);

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
      <p>{todos?.length} -- {list?.name}</p>
      <p>Todos:</p>
      <div className="todos__container">
        {todos && todos.map(todo => (
          <div key={todo._id} className="todo-item__container">
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <p>{todo.cost}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default List;