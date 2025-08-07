import TaskCard from './TaskCard';
import clsx from 'clsx';

type Task = {
    title?: string;
    description?: string;
    status?: boolean;
};

type ColumnProps = {
    title: string;
    columnKey: string;
    tasks: Task[];
};

export default function TaskColumn({ title, columnKey, tasks }: ColumnProps) {
    const status = tasks[0]?.status;
    return (
        <div className={
            clsx("rounded-lg p-4 w-72 flex flex-col gap-3",
                status ? "bg-green-200" : "bg-yellow-200"
            )
        }>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            {tasks.map((task, idx) => (
                <TaskCard
                    key={`${columnKey}-${idx}`}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                />
            ))}
        </div>
    );
}
