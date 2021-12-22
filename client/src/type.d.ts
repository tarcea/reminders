interface IList {
  _id: string;
  name: string;
  done: boolean;
  todos?: ITodo[];
  createdAt?: string;
  updatedAt?: string;
}

interface ListProps {
  list: IList;
}

interface TodoProps {
  todo: ITodo;
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
  lists: IList[];
  todo?: ITodo;
  list?: IList;
};


