import { useEffect, useState } from "react";
import SideBarAdmin from "../SideBarAdmin";
import { VITE_BACKEND_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../lib/userSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function UserStatistics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user dialog
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(VITE_BACKEND_URL + "/user/findUsers", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
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
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getNewUsers = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return users.filter((user) => new Date(user.createdAt) >= thirtyDaysAgo);
  };

  const getActiveUsers = () => {
    return users.filter((user) => user.status === "active");
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleMakeAdminClick = (user) => {
    setSelectedUser(user); // Set selected user and open dialog
  };

  const confirmMakeAdmin = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/admin/makeAdmin/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to make user an admin");
      }
      toast.success(`${selectedUser.userName} is now an admin`);

      const updatedUsers = users.map((user) =>
        user._id === selectedUser._id ? { ...user, type: "admin" } : user
      );
      dispatch(setUsers(updatedUsers));
      setSelectedUser(null); // Close dialog
    } catch (error) {
      console.error(error);
    }
  };

  const cancelMakeAdmin = () => {
    setSelectedUser(null); // Close dialog without action
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white p-4 md:p-6">
      <SideBarAdmin />
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">
            User Statistics
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 text-center">
              <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 text-center">
              <h3 className="text-gray-400 text-sm mb-2">Active Users</h3>
              <p className="text-2xl font-bold">{getActiveUsers().length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 text-center">
              <h3 className="text-gray-400 text-sm mb-2">
                New Users (30 days)
              </h3>
              <p className="text-2xl font-bold">{getNewUsers().length}</p>
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
        </div>

        <div className="bg-gray-800 rounded-lg p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Registration Date</th>
                <th className="pb-4">Major Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-t border-gray-700">
                  <td className="py-2 md:py-4">
                    <Link to={`/user/${user._id}`}>{user.userName}</Link>
                  </td>

                  <td className="py-2 md:py-4">{user.email}</td>
                  <td className="py-2 md:py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 md:py-4">
                    {user.type === "admin" ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-900 text-white ">
                        Admin
                      </span>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-full text-xs bg-red-900 text-white"
                        onClick={() => handleMakeAdminClick(user)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of{" "}
            {Math.ceil(filteredUsers.length / usersPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastUser >= filteredUsers.length}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-center">
              <h3 className="text-white text-lg mb-4">
                Are you sure you want to make {selectedUser.userName} an admin?
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmMakeAdmin}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Okay
                </button>
                <button
                  onClick={cancelMakeAdmin}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
