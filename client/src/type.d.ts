interface IList {
  _id: string;
  name: string;
  done: boolean;
  todos?: ITodo[];
  userId: string;
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
  cost?: string;
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
  userId?: string;
}

type CurrentUser = {
  token: string;
  userId: string;
  username: string;
}

interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AppContextInterface {
  currentUser: CurrentUser;
  setCurrentUser: Function
}

// type DateTimeFormatOptions = {
//   weekday: string;
//   year: string;
//   month: string;
//   day: string;
// }


