import { Router } from "express";
import { createTask, deleteTask, getUserTasks, updateTask } from "../controllers/taskController";
import { requireSignIn } from "../middlewares/auth";
import { isTaskOwner } from "../middlewares/taskMiddleware";

const router = Router();

router.post('/create', requireSignIn, createTask);
router.put('/update/:taskid', requireSignIn, isTaskOwner, updateTask);
router.delete('/delete/:taskid', requireSignIn, isTaskOwner, deleteTask);
router.get('/get-tasks', requireSignIn, getUserTasks);

export default router;