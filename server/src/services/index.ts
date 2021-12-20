import { Response, Request } from 'express';
import { ITodo, ITodoList } from '../types/todo';
import mongoose from "mongoose";
import Todo from './../models/todo';
import TodoList from './../models/todoList';

const getTodoLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoLists: ITodoList[] = await TodoList.find();
    console.log(todoLists)
    res.status(200).json({ todoLists });
  } catch (error) {
    throw error;
  }
};

export {
  getTodoLists,
};
