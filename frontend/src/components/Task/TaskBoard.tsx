import TaskColumn from './TaskColumn'

type Task = {
    title: string;
    description: string;
    status: boolean;
};

const tasks: Task[] = [
    { title: "Setup project", description: "Initialize React app", status: false },
    { title: "Design UI", description: "Create wireframes", status: false },
    { title: "Deploy", description: "Deploy to Vercel", status: true }
];

export default function TaskBoard() {
    return (
        <div className="flex gap-6 overflow-x-auto p-4">
            <div className="grid-cols-12 gap-6 overflow-x-auto p-4">
                <TaskColumn
                    title="Pending"
                    columnKey="todo"
                    tasks={tasks.filter(task => task.status === false)}
                />

                <TaskColumn
                    title="Done"
                    columnKey="done"
                    tasks={tasks.filter(task => task.status === true)}
                />
            </div>
        </div>
    )
}
