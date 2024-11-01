// import { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link for routing
// import Logo from "../assests/logo/logo.png";
// import { FaBars, FaTimes } from "react-icons/fa";
// import Button from "./button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-6 backdrop-blur-md sticky top-0 z-30 bg-gradient-to-r from-blue-100 to-white shadow-lg">
//         <Link to="/home">
//           <img
//             src={Logo}
//             alt="Logo"
//             className="cursor-pointer"
//             style={{ width: "260px", height: "auto" }}
//           />
//         </Link>
//         {/* Hamburger icon for mobile */}
//         <FaBars
//           className="text-3xl md:hidden cursor-pointer"
//           onClick={toggleDrawer}
//         />
//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex md:items-center">
//           <ul className="flex gap-8 text-lg">
//             <li>
//               <Link
//                 to="/about"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 About us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/product"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/pricing"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Pricing
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Contact us
//               </Link>
//             </li>
//             <li className="ml-8">
//               <Link to="/signup">
//                 <Button
//                   text="Get Started"
//                   className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 text-lg"
//                 />
//               </Link>
//             </li>
//             <li>
//               <Link to="/display">
//                 <Button
//                   text="Jobs portal"
//                   className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 text-lg"
//                 />
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>
//       {/* Drawer for mobile view */}
//       <div
//         className={`fixed inset-0 z-40 flex justify-start ease-in-out duration-300 md:hidden ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="w-[75vw] bg-blue-50 p-6 shadow-xl transition-transform transform duration-300">
//           <FaTimes className="text-2xl cursor-pointer" onClick={toggleDrawer} />
//           <ul className="mt-8 space-y-4 text-lg">
//             <li>
//               <Link
//                 to="/about"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//                 onClick={toggleDrawer}
//               >
//                 About us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/product"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//                 onClick={toggleDrawer}
//               >
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/pricing"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//                 onClick={toggleDrawer}
//               >
//                 Pricing
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
//                 onClick={toggleDrawer}
//               >
//                 Contact us
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup" className="block mt-4" onClick={toggleDrawer}>
//                 <Button
//                   text="Get Started"
//                   className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full text-lg"
//                 />
//               </Link>
//             </li>
//             <li>
//               <Link to="/display" className="block mt-4" onClick={toggleDrawer}>
//                 <Button
//                   text="Jobs portal"
//                   className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full text-lg"
//                 />
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div
//           className="flex-1 bg-black bg-opacity-50 transition-opacity duration-300"
//           onClick={toggleDrawer}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assests/logo/logo.png";
export default function Navbar() {
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