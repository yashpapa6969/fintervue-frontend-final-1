import React from "react";
import { motion } from "framer-motion";
import Logo from "../assests/logo/logo.png";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-lg p-6 flex justify-between items-center fixed w-full top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <a href="/home">
          <motion.img
            src={Logo}
            alt="Logo"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </a>
      </div>

      <div className="space-x-6">
        <motion.a
          href="/ai-interview-history"
          className="bg-gradient-to-r from-green-400 to-green-500 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI Interview History
        </motion.a>

        <div className="relative group inline-block">
          <motion.a
            href="/upcomingInterviews"
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upcoming Interviews
          </motion.a>
          
          <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
            <div className="p-2">
              <a href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">Profile</a>
              <a href="/settings" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">Settings</a>
              <a href="/logout" className="block px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;