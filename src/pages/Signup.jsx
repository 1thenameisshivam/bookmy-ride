import React, { useState } from "react";
import { Eye, EyeOff, Plane } from "lucide-react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const navigationHandler = () => {
        navigate("/login");
    };

    return (
        <div>
            <div
                className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-fixed"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyaXB8ZW58MHx8MHx8fDA%3D')",
                }}
            >
                {/* Background Blur Overlay */}
                <div className="absolute inset-0 w-full h-full bg-black bg-opacity-75 "></div>

                <div className="relative z-10 w-full max-w-md px-6 py-12 bg-gray-900 rounded-2xl shadow-xl">
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
                                    id="name"
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
                                    id="email"
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
                                    id="city"
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
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
                            >
                                Sign Up
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
