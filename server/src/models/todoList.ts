import { ITodoList } from "./../types/todo";
import { model, Schema } from "mongoose";

const todoListSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    todos: [],
    done: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITodoList>("TodoList", todoListSchema);