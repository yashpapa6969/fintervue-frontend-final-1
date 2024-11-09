import React from "react";
import { motion } from "framer-motion";
import Button from "../components/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h1 
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Job Roles to Find Your Perfect Fit
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-xl mt-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover opportunities that match your skills and aspirations
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Enter skills / designations / roles"
            className="w-80 py-4 px-6 rounded-xl shadow-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
          />
          
          <div className="relative">
            <select className="w-48 py-4 px-6 rounded-xl shadow-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none">
              <option>Select experience</option>
              <option>Fresher (less than 1 year)</option>
              <option>1-2 years</option>
              <option>3-5 years</option>
              <option>5+ years</option>
            </select>
          </div>
          
          <input
            type="text"
            placeholder="Enter location"
            className="w-64 py-4 px-6 rounded-xl shadow-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
          />
          
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search Jobs
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
