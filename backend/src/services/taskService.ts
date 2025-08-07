import Task from "../models/Task";

// -- Create New Task
export const createTaskService = async (userid: number, title: string, description: string) => {
    //validations
    if (!title || !description) {
        const error: any = new Error('Please fill out required fields!');
        error.status = 400;
        throw error;
    }

    //check if task exists
    const existingTask = await Task.findOne({ where: { title, userid } });
    if (existingTask) {
        const error: any = new Error('Task already exists')
        error.status = 400;
        throw error;
    }

    // save task
    const newTask = await Task.create({
        title,
        description,
        userid: userid
    });

    return {
        taskid: newTask.taskid,
        title: newTask.title,
        description: newTask.description,
        userid: newTask.userid
    }
}

// -- Update Task By ID
export const updateTaskService = async (taskid: string, userid: number, title?: string, description?: string, status?: boolean) => {
    // Validate inputs
    if (!title && !description && status === undefined) {
        const error: any = new Error('Nothing to update!')
        error.status = 400;
        throw error;
    }

    //Check if task exists
    const existingTask = await Task.findOne({ where: { taskid } });
    if (!existingTask) {
        const error: any = new Error('Task not found!')
        error.status = 404;
        throw error;
    }

    //Update
    if (title) existingTask.title = title
    if (description) existingTask.description = description
    if (status !== undefined) existingTask.status = status

    await existingTask.save();

    return {
        taskid: existingTask.taskid,
        title: existingTask.title,
        description: existingTask.description,
        status: existingTask.status
    }
}


// -- Delete Task By ID
export const deleteTaskService = async (taskid: string, userid: number) => {
    if (!taskid || !userid) {
        const error: any = new Error('Missing task ID or user ID')
        error.status = 404;
        throw error;
    }


    const existingTask = await Task.findOne({ where: { taskid } })
    if (!existingTask) {
        const error: any = new Error('Task not found')
        error.status(404);
        throw error;
    }

    await existingTask.destroy();

    return {
        taskid: existingTask.taskid,
        title: existingTask.title,
        description: existingTask.description
    }
}

// -- Get All Tasks
export const getTaskService = async (userid: number) => {
    const tasks = await Task.findAll({ where: { userid } });

    if (!tasks || tasks.length === 0) {
        // Instead of throwing an error, return an empty array
        return [];
    }

    return tasks.map(task => ({
        taskid: task.taskid,
        title: task.title,
        description: task.description,
        status: task.status
    }));
}