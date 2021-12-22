import { Response, Request } from 'express';
import { ITodo, ITodoList } from '../types/todo';
import mongoose from 'mongoose';
import Todo from '../models/todo';
import TodoList from '../models/todoList';

const getTodoLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoLists: ITodoList[] = await TodoList.find();
    res.status(200).json({ todoLists });
  } catch (error) {
    throw error;
  }
};

const addTodoList = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodoList, 'name' | 'done'>;
    const todoList: ITodoList = new TodoList({
      name: body.name,
      done: body.done,
    });

    const newTodoList: ITodoList = await todoList.save();

    res.status(201).json({
      message: 'new list added',
      todoList: newTodoList
    });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const listId = req.params.id;
    const body = req.body as Pick<
      ITodo,
      'name' | 'description' | 'cost' | 'done'
    >;
    console.log(body)
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      cost: body.cost,
      done: body.done,
    });
    await TodoList.updateOne({ _id: listId }, { $push: { todos: todo } });

    res.status(201).json({ message: 'new todo added', todo });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // const listId = new mongoose.Types.ObjectId(req.params.listId);
    const todoId = new mongoose.Types.ObjectId(req.params.todoId);
    const { listId } = req.params;

    await TodoList.updateOne(
      { _id: listId },
      {
        $pull: { todos: { _id: todoId } }
      }
    ).exec();
    res.status(200).json({
      message: 'todo deleted'
    });
  } catch (error) {
    throw error;
  }
};

const deleteList = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: allow list deletion just if the todos array is empty or all todos are done
    const { listId } = req.params;

    await TodoList.findOneAndDelete(
      { _id: listId }
    ).exec();
    res.status(200).json({
      message: 'list deleted'
    });
  } catch (error) {
    throw error;
  }
};

export {
  getTodoLists,
  addTodoList,
  addTodo,
  deleteTodo,
  deleteList,
};
