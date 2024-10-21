import { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for routing
import Logo from '../assests/logo/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../components/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     {/* Navbar */}
     <header className="flex justify-between items-center px-8 py-6 backdrop-blur-md sticky top-0 z-30 bg-gradient-to-r from-blue-100 to-white shadow-lg">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="cursor-pointer" style={{ width: '260px', height: 'auto' }} />
        </Link>
        {/* Hamburger icon for mobile */}
        <FaBars className="text-3xl md:hidden cursor-pointer" onClick={toggleDrawer} />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center">
        <ul className="flex gap-8 text-lg">
            <li>
              <Link
                to="/about"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact us
              </Link>
            </li>
            <li className="ml-8">
              <Link to="/signup">
                <Button
                  text="Get Started"
                  className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 text-lg"
                />
              </Link>
            </li>
            <li>
              <Link to="/display">
                <Button
                  text="Jobs portal"
                  className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 text-lg"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* Drawer for mobile view */}
      <div
        className={`fixed inset-0 z-40 flex justify-start ease-in-out duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-[75vw] bg-blue-50 p-6 shadow-xl transition-transform transform duration-300">
          <FaTimes className="text-2xl cursor-pointer" onClick={toggleDrawer} />
          <ul className="mt-8 space-y-4 text-lg">
            <li>
              <Link
                to="/about"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                onClick={toggleDrawer}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                onClick={toggleDrawer}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                onClick={toggleDrawer}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                onClick={toggleDrawer}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block mt-4" onClick={toggleDrawer}>
                <Button
                  text="Get Started"
                  className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full text-lg"
                />
              </Link>
            </li>
            <li>
              <Link to="/display" className="block mt-4" onClick={toggleDrawer}>
                <Button
                  text="Jobs portal"
                  className="transform hover:scale-105 transition-transform duration-300 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full text-lg"
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-black bg-opacity-50 transition-opacity duration-300" onClick={toggleDrawer}></div>
      </div>
    </>
  );
};

export default Navbar;
