import React, { useState } from "react";
import { Eye, EyeOff, Link, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const navigationHandler = () => {
        navigate("/signup");
    };
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    // "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                    "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyaXB8ZW58MHx8MHx8fDA%3D')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            <div className="relative z-10 w-full max-w-md px-6 py-12 bg-gray-900 rounded-2xl shadow-xl">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-red-600">Login</h1>
                    <h1 className="text-3xl font-bold text-red-600 flex items-center justify-center">
                        <Plane className="mr-2" />
                        <Logo />
                    </h1>
                    <p className="text-gray-400 mt-3">
                        Welcome back! Please login to your account.
                    </p>
                </div>
                <form>
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-300 block mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
                                placeholder="you@example.com"
                                required
                            />
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
                                    id="password"
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
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-red-500 hover:text-red-400"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center mt-8 text-sm text-gray-400 cursor-pointer">
                    Don't have an account?
                    <span
                        className="font-medium text-red-500 hover:text-red-400 ml-1"
                        onClick={navigationHandler}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
