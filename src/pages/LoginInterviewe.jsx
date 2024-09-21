import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo/logo4.jpeg";

const LoginInterviewe = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login process (you can replace this with actual login logic)
    if (email === "test@interviewer.com" && password === "password123") {
      // Navigate to the jobs portal page after successful login
      navigate("/product");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-4xl font-bold mb-4 text-blue-700">
            Hello, welcome!
          </h2>
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
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
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
          <div className="mt-6 flex justify-center space-x-4">
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
        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="text-white text-lg font-bold">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInterviewe;
