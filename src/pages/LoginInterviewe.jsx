import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assests/logo/logo4.jpeg";
import Navbar from "../components/navbar";
import axios from "axios";
//import useSignIn from 'react-auth-kit/hooks/useSignIn';
//import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import config from '../config';

const LoginInterviewee = () => {
  //const isAuthenticated = useIsAuthenticated();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //const signIn = useSignIn();

  const from = location.state?.from?.pathname || "/display";

  // Redirect if already authenticated
  // if (isAuthenticated()) {
  //   navigate(from, { replace: true });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/interviewee/intervieweelogin`,
        { email, password }
      );
      
      console.log("API Response:", response.data);
      const { user, token } = response.data;

      /* if (signIn({
        auth: {
          token: token,
          expiresIn: 3600, // 1 hour
          tokenType: "Bearer"
        },
        userState: {
          email: user.email,
          uid: user.interviewee_id,
          name: user.firstName,
          role: "interviewee"
        },
      })) {
        // Successful sign-in
        localStorage.setItem("interviewee", JSON.stringify(user));
        console.log("Stored user data:", localStorage.getItem("interviewee"));
        navigate(from, { replace: true });
      } else {
        setErrorMessage("Failed to sign in. Please check your credentials.");
      } */
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.msg || 
        error.message || 
        "An error occurred during login"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
          {/* Left side */}
          <div className="w-1/2 bg-white p-8">
            <h2 className="text-4xl font-bold mb-4 text-blue-700">
              Hello, welcome!
            </h2>
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="w-1/2 bg-white flex items-center justify-center">
            <div className="text-white text-lg font-bold">
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginInterviewee;
