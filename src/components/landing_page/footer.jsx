import { Link } from "react-router-dom";
import Logo from "../../assests/logo/logo2.png";
import {
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdOutlineArrowOutward } from "react-icons/md";
import Toc from "./TOC";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row bg-black text-white p-16 gap-8 justify-between md:px-20 xl:px-44">
      <div className="flex flex-col gap-8 text-gray-300/85 max-w-[300px] items-center">
        <div className="flex gap-4 text-2xl cursor-pointer">
          <FaXTwitter className="hover:scale-125" />
          <AiFillInstagram className="hover:scale-125" />
          <FaPinterest className="hover:scale-125" />
          <FaLinkedin className="hover:scale-125" />
          <FaTiktok className="hover:scale-125" />
          <FaYoutube className="hover:scale-125" />
        </div>
        <img src={Logo} alt="Logo" className="w-150 h-auto" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-bold text-lg">Product</div>
        <div className="cursor-pointer text-gray-300/85">Features</div>
        <div className="cursor-pointer text-gray-300/85">Integrations</div>
        <div className="cursor-pointer text-gray-300/85">Updates</div>
        <div className="cursor-pointer text-gray-300/85">FAQ</div>
        <a href="/Pricing">
          <div className="cursor-pointer text-gray-300/85">Pricing</div>
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-bold text-lg">Company</div>
        <a href="/about">
          <div className="cursor-pointer text-gray-300/85">About</div>
        </a>
        <div className="cursor-pointer text-gray-300/85">Blog</div>
        <div className="cursor-pointer text-gray-300/85">Careers</div>
        <div className="cursor-pointer text-gray-300/85">Manifesto</div>
        <div className="cursor-pointer text-gray-300/85">Press</div>
        <a href="/Contact">
          <div className="cursor-pointer text-gray-300/85">Contact</div>
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-bold text-lg">Resources</div>
        <div className="cursor-pointer text-gray-300/85">Examples</div>
        <div className="cursor-pointer text-gray-300/85">Community</div>
        <div className="cursor-pointer text-gray-300/85">Guides</div>
        <div className="cursor-pointer text-gray-300/85">Docs</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-bold text-lg">Legal</div>
        <a href="/PrivacyPolicy">
          <div className="cursor-pointer text-gray-300/85">Privacy Policy</div>
        </a>
        <a href="/TOC">
          <div className="cursor-pointer text-gray-300/85">Terms and Conditions</div>
        </a>
        <a href="/RefundsAndCancellation">
          <div className="cursor-pointer text-gray-300/85">Refunds And Cancellation</div>
        </a>
        <div className="cursor-pointer text-gray-300/85">Security</div>
      </div>
    </div>
  );
};

export default Footer;
