/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = false; // Get token from cookies

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
