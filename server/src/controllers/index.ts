import { Response, Request } from 'express';
import { ITodo, ITodoList } from '../types/todo';
import mongoose from 'mongoose';
import Todo from '../models/todo';
import TodoList from '../models/todoList';

const getTodoLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoLists: ITodoList[] = await TodoList.find();
    console.log(todoLists)
    res.status(200).json({ todoLists });
  } catch (error) {
    throw error;
  }
};

const addTodoList = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodoList, 'name' | 'status'>;
    const todoList: ITodoList = new TodoList({
      name: body.name,
      status: body.status,
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
      'name' | 'description' | 'cost' | 'status'
    >;
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      cost: body.cost,
      status: body.status,
    });
    await TodoList.updateOne({ _id: listId }, { $push: { todos: todo } });

    res.status(201).json({ message: 'new todo added' });
  } catch (error) {
    throw error;
  }
};

export {
  getTodoLists,
  addTodoList,
  addTodo
};