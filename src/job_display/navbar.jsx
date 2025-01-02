import React from "react";
import { motion } from "framer-motion";
import Logo from "../assests/logo/logo.png";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 z-50 flex items-center justify-between w-full p-6 bg-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <a href="/">
          <motion.img
            src={Logo}
            alt="Logo"
            className="w-auto h-12"
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

        <div className="relative inline-block group">
          <motion.a
            href="/upcomingInterviews"
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upcoming Interviews
          </motion.a>
          
          <div className="absolute right-0 invisible w-56 mt-3 transition-all duration-300 transform translate-y-2 bg-white border border-gray-100 shadow-xl opacity-0 rounded-xl group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
            <div className="p-2">
              <a href="/profile" className="block px-4 py-3 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-50">Profile</a>
              <a href="/settings" className="block px-4 py-3 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-50">Settings</a>
              <a href="/logout" className="block px-4 py-3 text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;