// lib/api/taskApi.ts
import instance from '../axios';

export type TaskData = {
    title?: string;
    description?: string;
    status?: boolean;
};

type TaskType = {
    taskid: string;
    title: string;
    description: string;
    status: boolean;
};

export const createTask = async (task: TaskData): Promise<any> => {
    const { data } = await instance.post('/tasks/create', task);
    return data;
};

export const updateTask = async (taskid: string, task: TaskData): Promise<any> => {
    const { data } = await instance.put(`/tasks/update/${taskid}`, task);
    return data;
};

export const deleteTask = async (taskid: string): Promise<any> => {
    const { data } = await instance.delete(`/tasks/delete/${taskid}`);
    return data;
};

export const getUserTasks = async (): Promise<TaskType[]> => {
    const response = await instance.get('/tasks/get-tasks');

    // Instead of throwing error pag walang laman, just return empty array
    if (response.data && response.data.length === 0) {
        return [];
    }

    return response.data.result; // ← ito lang ang kailangan mo
};
