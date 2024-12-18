/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { route, VITE_BACKEND_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../lib/userSlice";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.user.isLoggedIn);
  const handleLogout = async () => {
    try {
      const logOut = await fetch(VITE_BACKEND_URL + "/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const response = await logOut.json();
      if (response.status) {
        dispatch(logout());
        toast.success("Logout Successful");
      }
      if (!response.status) {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    isUserAdmin();
  }, []);
  const isUserAdmin = async () => {
    try {
      const isAdmin = await fetch(VITE_BACKEND_URL + "/user/admin", {
        method: "GET",
        credentials: "include",
      });
      const response = await isAdmin.json();
      if (response.status) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="overflow-hidden  w-full  bg-gradient-to-r from-red-700 to-black text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold">
          bookmy-ride
        </Link>
        <nav className="hidden md:flex font-mono text-lg items-center space-x-6">
          {data &&
            route.map((item, index) => (
              <Link key={index} to={item.url}>
                {item.name}
              </Link>
            ))}
          {data && isAdmin && (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          )}
          {data && (
            <p
              onClick={handleLogout}
              className="cursor-pointer bg-red-600 px-2 py-1 hover:bg-red-700 rounded"
            >
              Log Out
            </p>
          )}

          {!data && (
            <div className="flex gap-4">
              <Link
                className=" bg-red-600 px-2 py-1 rounded hover:bg-red-700 "
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className=" bg-red-600 px-2 py-1 rounded hover:bg-red-700 "
                to={"/signup"}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden flex-col flex gap-2 bg-orange-700 p-4">
          {data &&
            route.map((item, index) => (
              <Link
                className="cursor-pointer bg-yellow-600  px-2 py-2 block rounded hover:bg-yellow-700"
                key={index}
                to={item.url}
              >
                {item.name}
              </Link>
            ))}
          {data && (
            <p
              onClick={handleLogout}
              className="cursor-pointer bg-yellow-600  px-2 py-2 block rounded hover:bg-yellow-700"
            >
              Log Out
            </p>
          )}
          {!data && (
            <div className="flex flex-col gap-2">
              <Link
                className=" bg-yellow-600  px-2 py-2 block rounded hover:bg-yellow-700 "
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className=" bg-yellow-600  px-2 py-2 block rounded hover:bg-yellow-700 "
                to={"/signup"}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
