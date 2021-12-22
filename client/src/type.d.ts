interface IList {
  _id: string;
  name: string;
  done: boolean;
  todos?: ITodo[];
  createdAt?: string;
  updatedAt?: string;
}

interface ListProps {
  todoList: ITodoList;
}

interface ITodo {
  _id: string;
  name: string;
  description: string;
  done: boolean;
  cost?: number;
  createdAt?: string;
  updatedAt?: string;
}

type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todoLists: IList[];
  todo?: ITodo;
  todoList?: IList;
};

