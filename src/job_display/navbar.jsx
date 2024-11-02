import React from "react";
import { motion } from "framer-motion";
import Logo from "../assests/logo/logo.png";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <a href="/home">
          <motion.img
            src={Logo}
            alt="Logo"
            className="h-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </a>
      </div>
      <div className="space-x-10 text-gray-700 font-medium text-lg">
        <motion.a
          href="/ai-interview-history"
          className="bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI Interview History
        </motion.a>
      </div>

      <div className="relative group">
        <motion.a
          href="/upcomingInterviews"
          className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upcoming Interviews
        </motion.a>
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
          <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
          <a href="/logout" className="block px-4 py-2 hover:bg-gray-100 text-red-500">Logout</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
