import React, { useState } from "react";
import {
    Menu,
    X,
    Home,
    Users,
    CreditCard,
    TrendingUp,
    Settings,
    Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBarAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate=useNavigate();

    return (
        
            <aside
                className={`${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
            >
                <div className="flex items-center justify-between p-4 border-b border-red-800">
                    <span className="text-2xl font-bold text-red-600">
                        Book My Ride
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-white p-2 rounded-md hover:bg-red-800"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {[
                        { name: "Dashboard", icon: Home },
                        { name: "Users", icon: Users },
                        { name: "Bookings", icon: CreditCard },
                        { name: "Analytics", icon: TrendingUp },
                        { name: "Settings", icon: Settings },
                    ].map((item, index) => (
                        <button
                            key={item.name}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-white hover:bg-red-800 rounded-md transition-colors"
                            onClick={()=>navigate(`/admin/${item.name}`)}
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
