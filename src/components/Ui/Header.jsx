/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { route, VITE_BACKEND_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../lib/userSlice";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  return (
    <header className=" fixed top-0 w-full bg-gradient-to-r z-50 from-red-600 to-yellow-600 text-white">
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
      {data && isMenuOpen && (
        <nav className="md:hidden bg-orange-700 p-4">
          {route.map((item, index) => (
            <Link key={index} to={item.url}>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
