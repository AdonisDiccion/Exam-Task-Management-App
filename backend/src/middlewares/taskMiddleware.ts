import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

export const isTaskOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskid } = req.params;
        const userid = (req as any).user?.id

        const task = await Task.findByPk(taskid);
        if (!task) return res.status(404).json({ message: "Task not found!" });

        if (task.userid !== userid) {
            return res.status(403).json({ message: "Not authorized to manipulate this task" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}