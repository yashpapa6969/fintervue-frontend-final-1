// import Image from "next/image";
import Logo from "../assests/logo/logo.png";
import { FaBars } from "react-icons/fa";
import Button from "../components/button";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
       <a href="/home">
      <img src={Logo} alt="Logo" className="cursor-pointer w-60 h-auto" />
      </a>
      <FaBars className="block md:hidden" />
      <nav className="hidden md:block">
        <ul className="flex gap-6 items-center">
          <li>
            <a href="#">Solutions</a>
          </li>
          <li>
            <a href="/product">Products</a>
          </li>
          <li>
            <a href="#">Integrations</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <a href="/signup">
            <Button text="Get Started" />
          </a>
          <a href="/display">
            <Button text="Jobs portal" />
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
