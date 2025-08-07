import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, getUserTasks, updateTask } from '../lib/api/taskApi'
import { showSuccess, showError, showInfo } from '../utils/toast';

type TaskType = {
    taskid: string
    title: string
    description: string
    status: boolean
}

export default function Tasks() {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', status: false, taskid: '' })

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getUserTasks();
            setTasks(data);

            if (data.length === 0) {
                showInfo("Please create a task."); 
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            showError('Failed to load tasks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteTask(id);
            showSuccess('Task deleted!');
            fetchTasks();
        } catch (error) {
            console.error('Delete failed:', error);
            showError('Failed to delete task.');
        }
    };

    const handleEdit = (task: TaskType) => {
        setIsEditing(true);
        setFormData(task);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({ title: '', description: '', status: false, taskid: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const existing = tasks.find(task => task.taskid === formData.taskid);
                if (!existing) {
                    showError("Task not found.");
                    return;
                }

                const updates: any = {};

                if (formData.title !== existing.title) updates.title = formData.title;
                if (formData.description !== existing.description) updates.description = formData.description;
                if (formData.status !== existing.status) updates.status = formData.status;

                if (Object.keys(updates).length === 0) {
                    showError("No changes detected.");
                    setIsModalOpen(false);
                    return;
                }

                await updateTask(formData.taskid, updates);
                showSuccess("Task updated!");
            } else {
                await createTask({
                    title: formData.title,
                    description: formData.description,
                    status: false,
                });
                showSuccess("Task created!");
            }

            setIsModalOpen(false);
            fetchTasks();
        } catch (err) {
            console.error("Error saving task:", err);
            showError("Failed to save task.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <button className="btn btn-primary" onClick={handleAdd}>
                    + New Task
                </button>
            </div>

            {loading ? (
                <div className="text-center">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center text-gray-500">No tasks yet.</div>
            ) : (
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.taskid} className="card bg-base-100 shadow p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold">{task.title}</h2>
                                    <p className="text-sm text-gray-500">{task.description}</p>
                                    {/* Status Indicator */}
                                    <span
                                        className={`badge mt-2 ${task.status ? "badge-success" : "badge-warning"
                                            }`}
                                    >
                                        {task.status ? "Completed" : "Pending"}
                                    </span>
                                </div>

                                <div className="space-x-2">
                                    <button className="btn btn-sm btn-info" onClick={() => handleEdit(task)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(task.taskid)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal */}
            {isModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{isEditing ? 'Edit Task' : 'New Task'}</h3>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />

                            {/* ✅ Status Dropdown */}
                            {isEditing &&
                                <select
                                    className="select select-bordered w-full"
                                    value={String(formData.status)}
                                    onChange={e => setFormData({ ...formData, status: e.target.value === 'true' })}
                                >
                                    <option value="false">Incomplete</option>
                                    <option value="true">Complete</option>
                                </select>
                            }

                            <div className="modal-action justify-end">
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Update' : 'Create'}
                                </button>
                                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    )
}
