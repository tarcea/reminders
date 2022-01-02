import { Router } from 'express';
import {
  getLists,
  getListById,
  toggleListDone,
  addList,
  addTodo,
  getTodos,
  toggleTodoDone,
  deleteTodo,
  deleteList
} from '../controllers';

const router: Router = Router();

router.get('/lists', getLists);
router.get('/lists/:id', getListById);
router.put('/lists/:id', toggleListDone);

router.post('/lists', addList);

// router.delete('/lists/:id', deleteTodoList);

router.get('/lists/:id/todos', getTodos);

router.post('/lists/:id/todos', addTodo);
// router.post('/lists/:listId/todos/:todoId/subtasks', addSubtask);

router.put('/lists/:listId/todos/:todoId', toggleTodoDone);
router.delete('/lists/:listId/todos/:todoId', deleteTodo);
router.delete('/lists/:listId', deleteList);

export default router;