import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import * as React from "react";
import Logo from "../../assests/logo/favicon.png"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and company name */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">
                  <img src={Logo} alt="Logo" />
                </span>
              </div>
              <span className="text-xl font-semibold">Fintervue</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-around items-center space-x-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 flex justify-around md:justify-end space-x-4">
            <Link
              to="https://www.instagram.com/fintervue/"
              className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all"
            >
              <Instagram size={26} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              to="https://www.linkedin.com/company/fintervue/"
              className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all"
            >
              <Linkedin size={26} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              to="https://www.youtube.com/@fintervue"
              className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all"
            >
              <Youtube size={26} />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
