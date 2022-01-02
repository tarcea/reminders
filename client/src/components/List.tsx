import React, { FC, useEffect, useState, FormEvent, MouseEvent } from 'react';
import './styles/list.css';
import { Link, useParams } from 'react-router-dom';
import { addTodo, getListById, getTodosByListId, deleteTodo, toggleTodoDone } from '../Api';
import Message from './Message';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { name: '', description: '', cost: 0 };
  const [formData, setFormData] = useState(initialState);
  const [list, setList] = useState<IList>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [message, setMessage] = useState<String>('');
  const [total, setTotal] = useState<number>(0);
  const { listId } = useParams();

  const doneTodos: ITodo[] = (todos.length && (todos.filter(todo => todo.done))) || [];

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
      setTodos(fetchedTodos.data.todos.reverse());
      const currentTotal = fetchedTodos
        ? fetchedTodos.data.todos
          .map(item => (item.cost ? item.cost : 0))
          .reduce(
            (prev, next) =>
              Number(prev !== undefined ? prev : 0) +
              Number(next !== undefined ? next : 0),
            0
          )
        : 0;
      setTotal(currentTotal)
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
  }, [listId, currentId, formData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo({ ...formData, _id: '', done: false }, listId!)
    setFormData(initialState);
    setMessage('new todo added')
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(listId!, todoId);
      setMessage(`todo deleted`);
      fetchTodos(listId!);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleTodoDone = async (todoId: string) => {
    try {
      await toggleTodoDone(listId!, todoId);
      // setMessage(`toggled todo`);
      fetchTodos(listId!);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOnEditButton = (id: string) => {
    console.log(id)
  };

  return (
    <div>
      {message && <Message message={message} setMessage={setMessage} />}
      <form onSubmit={handleSubmit}>
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
          id="cost"
          placeholder="add a price for your task"
          value={formData.cost}
          onChange={handleChange} />
        <label style={{ display: "none" }}>description</label>
        <input
          type="text"
          placeholder="description"
          id="description"
          value={formData.description}
          onChange={handleChange} />
        <input
          type="submit"
          value="add todo" />
      </form>
      <h3>{list?.name}</h3>
      {todos?.length !== 0 && <p>Todos ({todos?.length}):</p>}
      {total !== 0 && (<p>Total cost: {total}</p>)}
      <div className="todos__container">
        {todos && todos.map(todo => (
          <div
            key={todo._id}
            className={todo.done ? "todo-item--done todo-item__container" : "todo-item__container"}
            onClick={() => handleToggleTodoDone(todo._id)}
          >
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            {todo.cost! > 0 && <p>cost: <b>{todo.cost}</b>€</p>}
            <div className="todo-item--actions">
              <button
                type="button"
                className="todo-item__button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo._id);
                }}
              >
                delete
              </button>
              <button
                type="button"
                className="todo-item__button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOnEditButton(todo._id);
                }}
              >
                edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="todo-list__pill">
        {todos.length}
        /
        {doneTodos.length}
      </div>
    </div >
  );
};

export default List;