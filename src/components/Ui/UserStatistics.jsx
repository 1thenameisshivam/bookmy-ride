import React, { useEffect, useState } from "react";
import SideBarAdmin from "../SideBarAdmin";
import { VITE_BACKEND_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../lib/userSlice";
import toast from "react-hot-toast";

// const users = [
//     {
//         id: 1,
//         name: "John Doe",
//         age: 25,
//         status: "active",
//         registeredDate: "2024-01-15",
//     },
//     {
//         id: 2,
//         name: "Jane Smith",
//         age: 32,
//         status: "active",
//         registeredDate: "2024-01-20",
//     },
//     {
//         id: 3,
//         name: "Bob Johnson",
//         age: 45,
//         status: "inactive",
//         registeredDate: "2023-12-01",
//     },
//     {
//         id: 4,
//         name: "Alice Brown",
//         age: 28,
//         status: "active",
//         registeredDate: "2024-02-05",
//     },
//     {
//         id: 5,
//         name: "Charlie Davis",
//         age: 22,
//         status: "active",
//         registeredDate: "2024-02-10",
//     },
// ];

export default function UserStatistics() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const dispatch = useDispatch();
    const users = useSelector((store) => store.user.users);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetch(
                    VITE_BACKEND_URL + "/user/findUsers",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (users.ok) {
                    const data = await users.json();
                    dispatch(setUsers(data.users));
                    console.log("Data is totalUsers", data);
                    return data;
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        getUsers();
    }, []);
    /* const isRegisteredInLast30Days = (users) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        // Use the createdAt field for the date check
        return users.filter(
            (user) => new Date(user.createdAt) >= thirtyDaysAgo
        );
    }; */
    const getNewUsers = () => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return users.filter(
            (user) => new Date(user.createdAt) >= thirtyDaysAgo
        );
    };

    const getActiveUsers = () => {
        return users.filter((user) => user.status === "active");
    };
    /* const filterUsersByStatus = (users) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return users.filter(
            (user) => new Date(user.createdAt) >=thirtyDaysAgo
        );
    }; */

    const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const makeAdmin = async (userId) => {
        console.log("Attempting to make user an admin with ID:", userId);
        console.log(typeof userId);

        try {
            const response = await fetch(
                `${VITE_BACKEND_URL}/admin/makeAdmin/`,
                {
                    method: "POST", // Or POST depending on your API design
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json", // Ensure the correct content type
                    },
                    body: JSON.stringify({ userId }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to make user an admin");
            }
            if(response.ok)
            {
                console.log("User is made as admin successfully");
            }
            toast.success("User is now an admin");

            const data = await response.json();
            // Optionally handle the response here, e.g., updating the state
            console.log("Make Admin Response", data.message); // Assuming the API returns a message

            // Optionally, you could refresh the users or update local state
            const updatedUsers = users.map((user) =>
                user._id === userId ? { ...user, type: "admin" } : user
            );
            dispatch(setUsers(updatedUsers));
        } catch (error) {
            console.error(error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="min-h-screen flex bg-black text-white p-6">
            <SideBarAdmin />
            {console.log("Users from useSelecor is:- ", users)}
            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-6">User Statistics</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <h3 className="text-gray-400 text-sm mb-2">
                                Total Users
                            </h3>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <h3 className="text-gray-400 text-sm mb-2">
                                Active Users
                            </h3>
                            <p className="text-2xl font-bold">
                                {getActiveUsers().length}
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <h3 className="text-gray-400 text-sm mb-2">
                                New Users (30 days)
                            </h3>
                            <p className="text-2xl font-bold">
                                {getNewUsers().length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search users by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white flex-grow"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                    >
                        <option value="all">All Users</option>
                        <option value="New Users">New Users</option>
                        <option value="Old Users">Old Users</option>
                    </select>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-400">
                                {/* <th className="pb-4">ID</th> */}
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Email</th>
                                {/* <th className="pb-4">Status</th> */}
                                <th className="pb-4">Registration Date</th>
                                <th className="pb-4">Major Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-700"
                                >
                                    <td className="py-4">{user.userName}</td>
                                    <td className="py-4">{user.email}</td>
                                    <td className="py-4">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button
                                            className="px-2 py-1 rounded-full text-xs bg-red-900 text-black-300"
                                            onClick={() => makeAdmin(user._id)}
                                        >
                                            Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
