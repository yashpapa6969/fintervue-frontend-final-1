import React from "react";
import Logo from "../assests/logo/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <a href="/home"> {/* Wrap the logo in an anchor tag */}
          <img src={Logo} alt="Logo" className="h-10" />
        </a>
        {/* <span className="text-blue-600 text-xl font-bold">YourBrand</span> */}
      </div>
      <div className="space-x-10 text-gray-700 font-medium text-lg">
        <a href="/jobs" className="hover:text-blue-600">
          Jobs
        </a>
        <a href="/companies" className="hover:text-blue-600">
          Companies
        </a>
        <a href="/services" className="hover:text-blue-600">
          Services
        </a>
      </div>
      
      <div className="relative group">
        <a
          href="/profile"
          className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600"
        >
          {/* add profile image */}
        </a>
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href="/buy-online"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Buy online
          </a>
          <a
            href="/hiring-suite"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Hiring Suite
          </a>
          <a
            href="/employer-login"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Employer Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
