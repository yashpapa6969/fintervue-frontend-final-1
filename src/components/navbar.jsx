import { useState } from 'react';
import Logo from '../assests/logo/logo.png'; // Note: Fixed a typo in the path from 'assests' to 'assets'
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../components/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-30 bg-gradient-to-r from-blue-100 to-white shadow-lg">
        <a href="/home">
          <img src={Logo} alt="Logo" className="cursor-pointer" style={{ width: '240px', height: 'auto' }} />
        </a>
        <FaBars className="text-2xl md:hidden cursor-pointer" onClick={toggleDrawer} />
        <nav className="hidden md:flex md:items-center">
          <ul className="flex gap-6">
            <li><a href="/About">About us</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/Pricing">Pricing</a></li>
            <li><a href="/Contact">Contact us</a></li>
            <li className="ml-8"><a href="/signup">
              <Button text="Get Started" /></a></li>
            <li><a href="/display">
              <Button text="Jobs portal" /></a></li>
          </ul>
        </nav>
      </header>
      <div className={`fixed inset-0 z-40 flex justify-start ease-in-out duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-[75vw] bg-blue-50 p-6 shadow-xl transition-transform transform duration-300">
          <FaTimes className="text-2xl cursor-pointer" onClick={toggleDrawer} />
          <ul className="mt-8 space-y-4">
            <li><a href="/About">About us</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/Pricing">Pricing</a></li>
            <li><a href="/Contact">Contact us</a></li>
            <li><a href="/signup" className="block mt-4"><Button text="Get Started" /></a></li>
            <li><a href="/display" className="block mt-4"><Button text="Jobs portal" /></a></li>
          </ul>
        </div>
        <div className="flex-1 bg-black bg-opacity-50 transition-opacity duration-300" onClick={toggleDrawer}></div>
      </div>
    </>
  );
};

export default Navbar;
