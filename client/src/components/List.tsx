import React, { FC, useEffect, useState } from 'react';
import './styles/List.css';
import { useParams } from 'react-router-dom';
import { getListById, getTodosByListId, deleteTodo, toggleTodoDone } from '../Api';
import Message from './Message';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import { io } from 'socket.io-client';
// import socket from './helpers/socket';

const List: FC = () => {
  const initialState: Omit<ITodo, '_id' | 'done'> = { name: '', description: '', cost: '' };
  const [formData, setFormData] = useState(initialState);
  const [list, setList] = useState<IList>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [message, setMessage] = useState<String>('');
  const [total, setTotal] = useState<number>(0);
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<string>('');
  const { listId } = useParams();

  const doneTodos: ITodo[] = (todos.length && (todos.filter(todo => todo.done))) || [];

  // const [socket, setSocket] = useState<any>()
  // const socket = io('http://localhost:3001'); // DEV
  const socket = io(process.env.REACT_APP_API_URL!); // PROD


  useEffect(() => {
    // socket.on('receive-changes', (data) => {
    //   console.log(data)
    // })
  }, []);

  useEffect(() => {
    // socket.emit('send-changes', formData)
  }, []);

  // useEffect(() => {
  //   socket.emit('send-changes', { editorId: "12345", ops: "gogu de la medgidia" })
  // }, []);

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
      setTodos(fetchedTodos.data.todos?.reverse());
      const currentTotal = fetchedTodos
        ? fetchedTodos.data.todos
          .map(item => (item.cost ? Number(item.cost) : 0))
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

  const getTodoById = (id: string) => {
    const todoToEdit = todos.filter(todo => todo._id === id)[0];
    const { name, description, cost } = todoToEdit;
    setFormData({ name, description, cost });
  };


  useEffect(() => {
    if (listId) {
      fetchListById(listId);
      fetchTodos(listId);
    }
  }, [listId, formData]);

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
      fetchTodos(listId!);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOnEditButton = (id: string) => {
    setEditTodo(true);
    setTodoId(id);
    getTodoById(id);
    window.scrollTo(0, 0)
  };

  return (
    <div>
      {message && <Message message={message} setMessage={setMessage} />}
      <div className="list__header">
        <div className="list__infos">
          <h3>{list?.name}</h3>
          {/* {todos?.length !== 0 && !editTodo && <p>Todos ({todos?.length}):</p>} */}
          {total !== 0 && !editTodo && (<p>total: {total.toFixed(2)}€</p>)}
        </div>
        {editTodo
          ? <EditTodo
            formData={formData}
            setFormData={setFormData}
            setEditTodo={setEditTodo}
            socket={socket}
            todoId={todoId}
            listId={listId!}
          />
          : <AddTodo
            fetchTodos={fetchTodos}
          />
        }
      </div>
      <div className="todos__container">
        {todos && todos.map(todo => (
          <div
            key={todo._id}
            className={todo.done ? "todo-item--done todo-item__container" : "todo-item__container"}
            onClick={() => handleToggleTodoDone(todo._id)}
          >
            <div className={todo.done ? "todo-item--text-for-done" : ""}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="todo-item__footer">
              <div>{Number(todo.cost)! > 0 && <p><b>{todo.cost}</b>€</p>}</div>
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