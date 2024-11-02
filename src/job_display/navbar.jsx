import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assests/logo/logo.png";
 function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md px-4">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Placeholder for logo */}
              <Link to={"/"}>
                {/* <div className="h-8  w-8 bg-gray-300 rounded-full"></div> */}
                <img
                  src={Logo}
                  alt="Logo"
                  className="cursor-pointer"
                  style={{ width: "200px", height: "auto" }}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/about"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  About
                </Link>
                <Link
                  to="/product"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Product
                </Link>
                <Link
                  to="/pricing"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              to="/signup"
              className="border text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
            >
              Get started
            </Link>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium">
              Jobs portal
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/about"
              className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/product"
              className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Product
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact us
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 space-y-3">
            <div className="flex items-center px-5">
              <Link
                to="/signup"
                className="bg-gray-800 text-center text-white px-4 py-2 rounded-md text-sm font-medium mr-2 w-full"
              >
                Get started
              </Link>
            </div>
            <div className="flex items-center px-5">
              <Link
                to="/signup"
                className="text-gray-800 text-center bg-white border border-gray-950 px-4 py-2 rounded-md text-sm font-medium mr-2 w-full"
              >
                Jobs portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
