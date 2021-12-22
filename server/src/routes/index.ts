import { Router } from "express";
import {
  getTodoLists,
  addTodoList,
  addTodo,
  deleteTodo,
  deleteList
} from "../controllers";

const router: Router = Router();

router.get("/lists", getTodoLists);

router.post("/lists", addTodoList);

// router.delete("/lists/:id", deleteTodoList);

// router.get("/lists/:id/todos", getTodos);

router.post("/lists/:id/todos", addTodo);
// router.post("/lists/:listId/todos/:todoId/subtasks", addSubtask);

// router.put("/lists/:id/todos/:id", updateTodo);

router.delete("/lists/:listId/todos/:todoId", deleteTodo);
router.delete("/lists/:listId", deleteList);

export default router;