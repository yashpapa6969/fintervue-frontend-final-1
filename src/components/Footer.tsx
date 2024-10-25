import {Link} from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import * as React from "react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and company name */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">F</span>
              </div>
              <span className="text-xl font-semibold">Fintervue</span>
            </Link>
          </div>

          <div className="w-full  md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-around items-center   space-x-4">
              <li><Link to="/about" className="hover:text-gray-900">About</Link></li>
              <li><Link to="/services" className="hover:text-gray-900">Services</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div className="w-full justify-around md:w-1/3 flex  md:justify-end space-x-4">
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}