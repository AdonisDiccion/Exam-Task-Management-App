type CardProps = {
    title?: string;
    description?: string;
    status?: boolean;
};

export default function TaskCard({title, description, status}: CardProps) {
    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-sm text-gray-500">{status}</p>
            </div>
        </>
    )
}
