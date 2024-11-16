import React, { useState } from "react";
import {
  SquarePen,
  X,
  Home,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sidebar items array
const sidebarItems = [
  { name: "Dashboard", icon: Home, route: "/admin/dashboard" },
  { name: "Users", icon: Users, route: "/admin/users" },
  { name: "Bookings", icon: CreditCard, route: "/admin/bookings" },
  { name: "Analytics", icon: TrendingUp, route: "/admin/analytics" },
  { name: "Settings", icon: Settings, route: "/admin/settings" },
  { name: "Create Trip", icon: SquarePen, route: "/create/trip" },
];

const SideBarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
    >
      <div className="flex items-center justify-between p-4 border-b border-red-800">
        <span className="text-2xl font-bold text-red-600">Book My Ride</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-white p-2 rounded-md hover:bg-red-800"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center space-x-3 px-4 py-2 text-white hover:bg-red-800 rounded-md transition-colors"
            onClick={() => navigate(item.route)}
          >
            {React.createElement(item.icon, {
              className: "h-5 w-5",
            })}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBarAdmin;
