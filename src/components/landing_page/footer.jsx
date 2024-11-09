import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import * as React from "react";
import { memo } from "react";
import Logo from "../../assests/logo/favicon.png";

// Navigation links data
const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/product", label: "Services" },
  { to: "/contact", label: "Contact" }
];

// Social media links data 
const SOCIAL_LINKS = [
  { 
    to: "https://www.instagram.com/fintervue/",
    icon: Instagram,
    label: "Instagram"
  },
  {
    to: "https://www.linkedin.com/company/fintervue/",
    icon: Linkedin, 
    label: "LinkedIn"
  },
  {
    to: "https://www.youtube.com/@fintervue",
    icon: Youtube,
    label: "YouTube" 
  }
];

// Memoized footer component
const Footer = memo(() => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and company name */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                <img src={Logo} alt="Logo" />
              </div>
              <span className="text-xl font-semibold">Fintervue</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-around items-center space-x-4">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative after:absolute after:bg-blue-700 after:h-[2px] after:w-0 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 flex justify-around md:justify-end space-x-4">
            {SOCIAL_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all"
              >
                <Icon size={26} />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Fintervue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
