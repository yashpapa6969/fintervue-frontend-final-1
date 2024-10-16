import React from "react";
import worldMap from "../../assests/world.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

const Contact = () => {
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
    console.log("Form Data Submitted:", formData);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100">
        <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-6">
              We are always looking for ways to improve our products and
              services. Reach out to us and let us know how we can assist you.
            </p>
            <div className="mb-6 text-gray-800 space-y-2">
              <p>fintervue.dev@gmail.com</p>
              <p>+91 999 9999 999</p>
            </div>
            <div className="relative">
              <img
                src={worldMap}
                alt="World Map"
                className="w-full h-auto object-cover rounded-md shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105">
                  We are here
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div
              className="absolute inset-0 bg-opacity-10 bg-blue-700"
              style={{ backgroundImage: "url(../../assests/grid.png)" }}
            ></div>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300"
                  placeholder="contact@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300"
                  placeholder="Fintervue"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 transition duration-300 transform hover:scale-105"
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
