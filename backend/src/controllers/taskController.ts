import { Request, Response } from "express";
import Task from "../models/Task";
import { createTaskService, deleteTaskService, getTaskService, updateTaskService } from "../services/taskService";

// Create task
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description } = req.body;
        const userid = (req as any).user?.id;

        const result = await createTaskService(userid, title, description);

        res.status(201).json({
            message: 'Successfully created task!',
            result
        });
    } catch (error) {
        console.error(`Creating error: ${error}`);
        res.status(500).json({ message: `Failed to create task! ${error}` });
        return;
    }
}


// Update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body;
        const { taskid } = req.params;
        const userid = (req as any).user?.id;

        const result = await updateTaskService(
            taskid,
            userid,
            title,
            description,
            status
        );

        res.status(200).json({
            message: 'Successfully updated task!',
            result
        });

    } catch (error) {
        console.error(`Creating error: ${error}`);
        res.status(500).json({ message: `Failed to update task! ${error}` });
        return;
    }
}


// Delete task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {

        const { taskid } = req.params;
        const userid = (req as any).user?.id;

        const result = await deleteTaskService(taskid, userid)

        res.status(200).json({
            message: 'Successfully deleted task!',
            result
        });

    } catch (error) {
        console.error(`Deleting error: ${error}`);
        res.status(500).json({ message: `Failed to delete task! ${error}` });
        return;
    }
}

// Get User's Tasks
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userid = (req as any).user?.id;

        const result = await getTaskService(userid);

        res.status(200).json({
            message: 'Successfully retrieved tasks!',
            result
        });

    } catch (error) {
        console.error(`Retrieving error: ${error}`);
        res.status(500).json({ message: `Failed to retrieving tasks! ${error}` });
        return;
    }
}