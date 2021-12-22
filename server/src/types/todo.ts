import { Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  cost: number;
  done: boolean;
}

export interface ITodoList extends Document {
  name: string;
  done: boolean;
}