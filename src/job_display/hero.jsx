import React from "react";
import { motion } from "framer-motion";
import Button from "../components/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-5xl font-extrabold text-blue-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Job Roles to Find Your Perfect Fit
        </motion.h1>
        <motion.p 
          className="text-gray-700 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Get the career that's right for you
        </motion.p>
        <motion.div 
          className="mt-12 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Enter skills / designations / roles"
            className="w-80 py-3 px-4 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="relative">
            <select className="appearance-none w-48 py-3 px-4 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>Select experience</option>
              <option>Fresher (less than 1 year)</option>
              <option>1 year</option>
              <option>2 years</option>
              <option>3 years</option>
              <option>4 years</option>
              <option>5 years</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.5 7l4.5 4.5L14.5 7H5.5z" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter location"
            className="w-64 py-3 px-4 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button text="Search">
            <motion.button 
              className="bg-blue-800 text-white py-3 px-8 rounded-lg font-bold shadow-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
