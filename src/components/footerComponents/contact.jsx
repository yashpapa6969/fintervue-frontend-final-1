import React from "react";
import worldMap from "../../assests/world.svg";
// import grid from"../../assests/grid.png"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../navbar";

// import Page from "@/layouts/Page";
// import worldMap from "@/assets/Blank_globe.svg.png";

const Contact = () => {
  // State to manage form data
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data to the console in key-value format
    console.log("Form Data Submitted:", formData);
    navigate('/');
  };

  return (
    <>

    <Navbar/>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 grid grid-cols-2 gap-8 max-w-5xl">
          {/* Left Section */}
          <div>
            <div className="flex items-center mb-6">
              <h1 className="text-3xl font-bold">Contact us</h1>
            </div>
            <p className="text-gray-600 mb-6">
              We are always looking for ways to improve our products and
              services. Contact us and let us know how we can help you.
            </p>
            <div className="mb-6">
              <p className="text-gray-800">fintervue.dev@gmail.com</p>
              <p className="text-gray-800">+91 999 9999 999</p>
            </div>
            <div className="relative">
              <img src={worldMap} alt="World Map" className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white ml-60 mt-4 px-3 py-1 text-gray-800 rounded-md shadow-md">
                  We are here
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="bg-white p-8 rounded-lg shadow-md"
            style={{ backgroundImage: "url(../../assests/grid.png)" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Fintervue"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
