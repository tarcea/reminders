import axios, { AxiosResponse } from "axios";

// const apiUrl: string = process.env.REACT_APP_API_URL!; // PROD
const apiUrl: string = 'http://localhost:3001'; //DEV

const token = localStorage.token ? JSON.parse(localStorage.getItem('token')!) : '';
const config = { headers: { 'Authorization': token!, 'Access-Control-Allow-Origin': '*' } }

export const getLists = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log('ss', config)
    const lists: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists`, config
    );
    console.log(lists)
    return lists;
  } catch (error) {
    throw error;
  }
};

export const getListById = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const list: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists/${id}`, config
    );
    return list;
  } catch (error) {
    throw error;
  }
};

export const addList = async (
  formData: IList
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const list: Omit<IList, "_id"> = {
      name: formData.name,
      done: false,
      userId: formData.userId
    };

    const saveList: AxiosResponse<ApiDataType> = await axios.post(
      `${apiUrl}/lists`,
      list, config
    );
    return saveList;
  } catch (error) {
    throw error;
  }
};

export const deleteList = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log(`${apiUrl}/lists/${id}`)
    const deletedTodoList: AxiosResponse<ApiDataType> = await axios.delete(
      `${apiUrl}/lists/${id}`
    );
    return deletedTodoList;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (
  formData: ITodo,
  listId: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      done: false,
      cost: formData.cost,
    };

    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      `${apiUrl}/lists/${listId}/todos`,
      todo, config
    );
    return saveTodo;
  } catch (error) {
    throw error;
  }
};

export const getTodosByListId = async (listId: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists/${listId}/todos`, config);
    return todos;
  } catch (error) {
    throw error;
  }
};

export const toggleTodoDone = async (
  listId: string,
  todoId: string
) => {
  try {
    await axios.put(
      `${apiUrl}/lists/${listId}/todos/${todoId}/toggle`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (
  listId: string,
  todoId: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${apiUrl}/lists/${listId}/todos/${todoId}`
    );
    return deletedTodo;
  } catch (error) {
    throw error;
  }
};

export const login = async (
  username: string,
  password: string
) => {
  try {
    const data = { username, password }
    const resp: AxiosResponse = await axios.post(
      `${apiUrl}/users/login`, data
    );
    localStorage.setItem('token', JSON.stringify(resp.data.token));
    localStorage.setItem('userId', JSON.stringify(resp.data.userId));
    localStorage.setItem('username', JSON.stringify(resp.data.username));
    return resp.data
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const data = { username, password, email }
    const resp: AxiosResponse = await axios.post(
      `${apiUrl}/users/signup`, data
    );
    localStorage.setItem('token', JSON.stringify(resp.data.token));
    localStorage.setItem('userId', JSON.stringify(resp.data.userId));
    localStorage.setItem('username', JSON.stringify(resp.data.username));
    return resp.data
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (
  listId: string,
  todoId: string,
  data: ITodo
) => {
  try {
    const todo = await axios.put(
      `${apiUrl}/lists/${listId}/todos/${todoId}`, data, config
    );
    // socket.emit('todoChanged', todo.data.todo, listId);
  } catch (error) {
    throw error;
  }
};
