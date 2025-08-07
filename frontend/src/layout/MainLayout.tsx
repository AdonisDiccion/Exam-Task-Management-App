import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function MainLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const routeTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/tasks": "Task",
    };

    const title = routeTitles[location.pathname] || "Unknown Page";
    const username = localStorage.getItem("user") || "Guest";

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main content */}
            <div className="flex flex-col flex-1 ml-0 md:ml-64">
                <Header
                    title={title}
                    username={username}
                    onLogout={handleLogout}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <main className="p-4 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}