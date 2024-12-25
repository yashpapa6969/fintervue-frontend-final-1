import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assests/logo/logo.png";
import { useUser } from "../context/UserProvider";
import { logout } from "../lib/services/candidate.auth";

function Navbar() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 px-4 bg-white bg-opacity-80 backdrop-blur-md">
            <div className="mx-auto">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* Placeholder for logo */}
                            <Link to={"/"}>
                                {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="cursor-pointer"
                                    style={{ width: "200px", height: "auto" }}
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline ml-10 space-x-4">
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
                                    Products
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
                        {!user?.user ? (
                            <Link
                                to="/signup"
                                className="w-full px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md"
                            >
                                Get started
                            </Link>
                        ) : (
                            <div className="flex flex-row items-center justify-center gap-2">
                                <p className="text-center">
                                    Hey{" "}
                                    <span className="font-bold">
                                        {user.user.user?.firstName}!
                                    </span>
                                </p>
                                <button
                                    className="w-full px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md"
                                    onClick={async () => {
                                        await logout();
                                        localStorage.removeItem("user");
                                        navigate("/signup");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block w-6 h-6" />
                            ) : (
                                <Menu className="block w-6 h-6" />
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
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            About
                        </Link>
                        <Link
                            to="/product"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Products
                        </Link>
                        <Link
                            to="/pricing"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Contact us
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 space-y-3 border-t border-gray-200">
                        <div className="flex items-center px-5">
                            <Link
                                to="/signup"
                                className="w-full px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md"
                            >
                                Get started
                            </Link>
                        </div>
                        <div className="flex items-center px-5"></div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
