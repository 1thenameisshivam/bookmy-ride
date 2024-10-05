/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Eye, EyeOff, Plane } from "lucide-react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { loggedin } from "../lib/userSlice";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
        place: "",
    });
    const [loding, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigationHandler = () => {
        navigate("/login");
    };

    const handleSignUp = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            const signup = await fetch(VITE_BACKEND_URL + "/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            const response = await signup.json();
            console.log(response);
            if (response.status) {
                setLoading(false);
                dispatch(loggedin("nam"));
                navigate("/");
                toast.success("Signup Successful");
            }
            if (!response.status) {
                setLoading(false);
                setError(response.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <div
                className="h-screen flex items-center justify-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyaXB8ZW58MHx8MHx8fDA%3D')",
                }}
            >
                <div className="w-full max-w-md px-6 py-12 bg-gray-900 rounded-2xl shadow-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-red-600">
                            Sign Up
                        </h1>
                        <h1 className="text-3xl font-bold text-red-600 flex items-center justify-center">
                            <Plane className="mr-2" />

                            <Logo />
                        </h1>
                        <p className="text-gray-400 mt-3">
                            Join us for amazing travel experiences!
                        </p>
                    </div>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-gray-300 block mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.userName}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-300 block mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.email}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="text-sm font-medium text-gray-300 block mb-2"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                    placeholder="+ (91) XXXXXXXXXX"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="city"
                                    className="text-sm font-medium text-gray-300 block mb-2"
                                >
                                    Current City
                                </label>
                                <input
                                    type="text"
                                    name="place"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.place}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                    placeholder="Mathura"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-300 block mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.password}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded"
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-300"
                            >
                                I agree to the
                                <a
                                    href="#"
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        <div>
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loding}
                                onClick={handleSignUp}
                                className={`w-full px-4 py-3 rounded-lg font-semibold text-white ${
                                    loding ? "bg-red-800" : "bg-red-600 "
                                } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300`}
                            >
                                {loding ? (
                                    <div className="flex justify-center">
                                        <AiOutlineLoading3Quarters className="text-2xl  animate-spin" />
                                    </div>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-8 text-sm text-gray-400">
                        Already have an account?
                        <span
                            onClick={navigationHandler}
                            className="font-medium text-red-500 hover:text-red-400 ml-1 cursor-pointer"
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
