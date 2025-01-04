import React from "react";
import { motion } from "framer-motion";
import Logo from "../assests/logo/logo.png";
import UserProfile from "../components/UserProfile"

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
                  href="/product"
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  Our products
              </motion.a>

              <motion.a
                  href="/ai-interview-history"
                  className="bg-gradient-to-r from-green-400 to-green-500 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  AI Interview History
              </motion.a>

              <UserProfile />
          </div>
      </motion.nav>
  );
};

export default Navbar;