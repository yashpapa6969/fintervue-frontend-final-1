import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assests/logo/logo4.jpeg";
import Navbar from "../components/navbar";
import { loginFlow } from "../lib/services/candidate.auth";
import { useUser } from "../context/UserProvider";

const LoginInterviewee = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();

    const from = location.state?.from?.pathname || "/display";

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const interviewee = await loginFlow(email, password);

            if (interviewee) {
                setUser({
                    type: "interviewee",
                    user: interviewee,
                });

                toast({
                    title: "Welcome",
                    description: "Successfully loggen in interviewee.",
                    variant: "top-accent",
                    status: "success",
                    isClosable: true,
                });

                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(
                error.response?.data?.msg ||
                    error.message ||
                    "An error occurred during login"
            );
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                    {/* Left side */}
                    <div className="w-1/2 p-8 bg-white">
                        <h2 className="mb-4 text-4xl font-bold text-blue-700">
                            Hello, welcome!
                        </h2>
                        {errorMessage && (
                            <div
                                className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
                                role="alert"
                            >
                                <span className="block sm:inline">
                                    {errorMessage}
                                </span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="block ml-2 text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="/forgotpw"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-full p-3 text-white transition duration-200 bg-black rounded-md hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center justify-center w-1/2 bg-white">
                        <div className="text-lg font-bold text-white">
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginInterviewee;
