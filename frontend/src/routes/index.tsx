import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../pages/Dashboard";
import LoginPage from "../features/auth/pages/LoginPage";
import TaskPage from "../pages/Tasks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "tasks", element: <TaskPage /> }
        ],
    },
    {
        path: "/login",
        element: <LoginPage />
    },
]);