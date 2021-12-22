import { Router } from "express";
import {
  getLists,
  getListById,
  addList,
  addTodo,
  deleteTodo,
  deleteList
} from "../controllers";

const router: Router = Router();

router.get("/lists", getLists);
router.get("/lists/:id", getListById);

router.post("/lists", addList);

// router.delete("/lists/:id", deleteTodoList);

// router.get("/lists/:id/todos", getTodos);

router.post("/lists/:id/todos", addTodo);
// router.post("/lists/:listId/todos/:todoId/subtasks", addSubtask);

// router.put("/lists/:id/todos/:id", updateTodo);

router.delete("/lists/:listId/todos/:todoId", deleteTodo);
router.delete("/lists/:listId", deleteList);

export default router;