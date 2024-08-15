import { ChevronRight } from "lucide-react";
import React from "react";
import Navbar from "../navbar";
import resumeGen from "../../assests/resume_generator.png";
import Button from "../button";

const Contact = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-6">
        {/* Contact Us Heading */}
        <div className="text-3xl md:text-4xl lg:text-5xl py-3 font-bold tracking-tighter text-center text-black">
          Contact Us
        </div>

        {/* Contact Details */}
        <div className="flex flex-row md:flex-row justify-center items-start gap-12 mt-10">
          <div className= "flex flex-row">
          {/* Contact Information */}
          <div className="flex flex-col gap-4 text-lg text-black">
            <div>
              <span className="font-bold">Phone:</span> +1 234 567 890
            </div>
            <div>
              <span className="font-bold">Email:</span>{" "}
              <a
                href="mailto:info@example.com"
                className="text-blue-500 hover:underline"
              >
                info@example.com
              </a>
            </div>
            <div>
              <span className="font-bold">Office Address:</span>
              <p>Ramaiah Institute of Technology</p>
              <p>Anytown, CA 12345, USA</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086167!2d144.95592331531714!3d-37.817209879751775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1b7d1c5%3A0x5045675218ce7e0!2sVictoria!5e0!3m2!1sen!2sau!4v1595655879293!5m2!1sen!2sau"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
