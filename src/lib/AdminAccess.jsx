/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { VITE_BACKEND_URL } from "../utils/constants";
import { Navigate } from "react-router-dom";
const AdminAccess = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const response = await fetch(VITE_BACKEND_URL + "/user/admin", {
                credentials: "include",
            });
            const data = await response.json();
            if (data.status) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (err) {
            setIsAdmin(false);
        }
    };
    if (isAdmin === null) {
        return <div>Loading...</div>;
    }
    return isAdmin ? children : <Navigate to="/unauthorise" />;
};

export default AdminAccess;
