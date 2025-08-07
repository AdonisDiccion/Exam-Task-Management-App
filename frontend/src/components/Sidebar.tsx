import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { RxDashboard } from "react-icons/rx";
import { LuListTodo } from "react-icons/lu";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const links = [
    { label: "Dashboard", to: "/dashboard", icon: <RxDashboard /> },
    { label: "Tasks", to: "/tasks", icon: <LuListTodo size={20} /> },
  ];

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform z-40",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        TaskManager
      </div>
      <nav className="mt-4 flex flex-col gap-1 px-2">
        {links.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-700",
                isActive && "bg-gray-700"
              )
            }
            onClick={() => setIsOpen(false)} // close sidebar on mobile nav click
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

