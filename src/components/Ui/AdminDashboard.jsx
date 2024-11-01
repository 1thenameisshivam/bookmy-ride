import { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
// import {
//     Menu,
//     X,
//     Home,
//     Users,
//     CreditCard,
//     TrendingUp,
//     Settings,
//     Bell,
// } from "lucide-react";
import { TotalRevenueGenerator } from "../../utils/TotalRevenueGenerator";
import { VITE_BACKEND_URL } from "../../utils/constants";
import { TotalTripsGenerator } from "../../utils/TotalTripsGenerator";
import { TotalActiveUsers } from "../../utils/TotalActiveUsers";

// Chart Data
const pieData = [
    { name: "Booked Trips", value: 724 },
    { name: "Available Trips", value: 276 },
];

const COLORS = ["#FF0000", "#ffffff"];
// const totalRevenue=TotalRevenueGenerator();

// console.log("Total Revenue is:- ", totalRevenue);
const lineData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4780 },
    { name: "May", revenue: 5890 },
    { name: "Jun", revenue: 6390 },
];

// Custom PieChart Component
const TripDistributionChart = () => {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// Custom LineChart Component
const RevenueTrendChart = () => {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1E1E1E",
                            border: "none",
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FF0000"
                        strokeWidth={2}
                        dot={{ fill: "#FF0000" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default function AdminDashboard() {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [percentageRevenueChange, setPercentageRevenueChange] = useState(0);
    const [tripData, setTripData] = useState({
        totalTrips: 0,
        numberChange: 0,
    });
    const [userInfo, setUserInfo] = useState({
        totalUsers: 0,
        numberChangeInUsers: 0,
    });
    useEffect(() => {
        const fetchRevenue = async () => {
            const [totalRevenue, percentageRevenueChange] =
                await TotalRevenueGenerator();
            if (totalRevenue != null) {
                console.log("Total Revenue is:- ", totalRevenue);
                setTotalRevenue(totalRevenue);
                setPercentageRevenueChange(percentageRevenueChange);
            }
        };
        const fetchTripsDetails = async () => {
            const [totalTrips, numberChange] = await TotalTripsGenerator();
            if (totalTrips != null) {
                console.log("Total Trips is:- ", totalTrips);
                setTripData({
                    totalTrips: totalTrips,
                    numberChange: numberChange,
                });
            }
        };
        const fetchUsersInfo = async () => {
            try {
                const [totalUsers, numberChangeInUsers] =
                    await TotalActiveUsers();
                if (totalUsers != null) {
                    console.log("Total Users are:- ", totalUsers);
                    setUserInfo({
                        totalUsers: totalUsers,
                        numberChangeInUsers: numberChangeInUsers,
                    });
                }
            } catch (error) {
                console.error("Error in fetching Users Info", error);
            }
        };
        fetchRevenue();
        fetchTripsDetails();
        fetchUsersInfo();
    }, []);

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white">
            {/* Sidebar */}
            {/* <aside
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
                        >
                            {React.createElement(item.icon, {
                                className: "h-5 w-5",
                            })}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>
            </aside> */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                {/*  <header className="bg-black shadow-md">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden text-white p-2 rounded-md hover:bg-red-800"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <input
                                className="w-64 px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Search..."
                            />
                            <button className="text-white p-2 rounded-md hover:bg-red-800">
                                <Bell className="h-5 w-5" />
                            </button>
                            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                        </div>
                    </div>
                </header>
 */}
                {/* Dashboard content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {[
                            {
                                title: "Total Revenue",
                                value: totalRevenue,
                                change: `${percentageRevenueChange} from  last month`,
                            },
                            {
                                title: "Total Trips",
                                value: tripData.totalTrips,
                                change: `${tripData.numberChange} from last month`,
                            },
                            {
                                title: "Active Users",
                                value: userInfo.totalUsers,
                                change: `${userInfo.numberChangeInUsers} from last month`,
                            },
                            {
                                title: "Customer Satisfaction",
                                value: "98.5%",
                                change: "+5% from last week",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-black p-6 rounded-lg shadow-lg border border-gray-800"
                            >
                                <h3 className="text-sm font-medium text-gray-400">
                                    {item.title}
                                </h3>
                                <p className="text-2xl font-bold mt-2 text-white">
                                    {item.value}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {item.change}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
                            <h3 className="text-xl font-bold mb-4">
                                Trip Distribution
                            </h3>
                            <TripDistributionChart />
                        </div>
                        <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
                            <h3 className="text-xl font-bold mb-4">
                                Revenue Trend
                            </h3>
                            <RevenueTrendChart />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
