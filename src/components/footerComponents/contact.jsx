import React from "react";
import worldMap from "../../assests/world.svg";
// import grid from"../../assests/grid.png"
const Contact = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 grid grid-cols-2 gap-8 max-w-5xl">
        {/* Left Section */}
        <div>
          <div className="flex items-center mb-6">
            <img
              src="/path/to/email-icon.png"
              alt="Email Icon"
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-3xl font-bold">Contact us</h1>
          </div>
          <p className="text-gray-600 mb-6">
            We are always looking for ways to improve our products and services.
            Contact us and let us know how we can help you.
          </p>
          <div className="mb-6">
            <p className="text-gray-800">contact@yoursaas.ai</p>
            <p className="text-gray-800">+1 (800) 123 XX21</p>
            <p className="text-gray-800">support@yoursaas.ai</p>
          </div>
          <div className="relative">
            <img src={worldMap} alt="World Map" className="w-full h-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-3 py-1 text-gray-800 rounded-md shadow-md">
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
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Manu Arora"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contact@aceternity.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Aceternity Labs LLC"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here"
                rows="4"
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
  );
};

export default Contact;
