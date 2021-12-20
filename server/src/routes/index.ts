import { Router } from "express";
import {
  getTodoLists,
} from "../services";

const router: Router = Router();

router.get("/lists", getTodoLists);

// router.post("/lists", addTodoList);

// router.delete("/lists/:id", deleteTodoList);

// router.get("/lists/:id/todos", getTodos);

// router.post("/lists/:id/todos", addTodo);

// router.put("/lists/:id/todos/:id", updateTodo);

// router.delete("/lists/:id/todos/:id", deleteTodo);

export default router;