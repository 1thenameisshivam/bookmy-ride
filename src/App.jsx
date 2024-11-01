import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedin } from "./lib/userSlice";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Ui/Header";
import Footer from "./components/LandingPage/Footer";
import Cookies from "js-cookie"; // Import js-cookie to access cookies

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            dispatch(loggedin("name"));
        }
    }, []);

    return (
        <div>
            <Header />
            <Outlet />
            <Toaster />
            <Footer />
        </div>
    );
};

export default App;
