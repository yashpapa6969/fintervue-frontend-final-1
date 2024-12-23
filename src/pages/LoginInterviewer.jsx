import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo/logo4.jpeg";
import config from "../config";

import Navbar from "../components/navbar";
import axios from "axios";
import { loginFlow } from "../lib/services/interviewer.auth";
import { useUser } from "../context/UserProvider";
//import useSignIn from "react-auth-kit";

const LoginInterviewer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { setUser } = useUser();

    //const signIn = useSignIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const interviewer = await loginFlow(email, password);

            if (interviewer) {
                setUser({
                    type: "interviewer",
                    user: interviewer,
                });

                toast({
                    title: "Welcome",
                    description: "Successfully logged in interviewer.",
                    variant: "top-accent",
                    status: "success",
                    isClosable: true,
                });

                navigate(from, { replace: true });
            }
        } catch (error) {
            // Handle login error
            console.error("Login error:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.msg
            ) {
                setErrorMessage(error.response.data.msg);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An error occurred during login");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                    {/* Left side */}
                    <div className="w-1/2 p-8 bg-white">
                        <h2 className="mb-4 text-4xl font-bold text-blue-700">
                            Hello, welcome!
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errorMessage && (
                                <div className="text-red-500">
                                    {errorMessage}
                                </div>
                            )}
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
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-center mt-6 space-x-4">
                            <a href="#" className="text-gray-500">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-500">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
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

export default LoginInterviewer;
