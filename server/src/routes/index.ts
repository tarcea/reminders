import { Router } from "express";
import {
  getTodoLists,
  addTodoList,
  addTodo,
  deleteTodo
} from "../controllers";

const router: Router = Router();

router.get("/lists", getTodoLists);

router.post("/lists", addTodoList);

// router.delete("/lists/:id", deleteTodoList);

// router.get("/lists/:id/todos", getTodos);

router.post("/lists/:id/todos", addTodo);

// router.put("/lists/:id/todos/:id", updateTodo);

router.delete("/lists/:listId/todos/:todoId", deleteTodo);

export default router;