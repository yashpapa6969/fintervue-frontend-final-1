import React from "react";
import worldMap from "../../assests/world.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import config from "../../config";
import Footer from "../landing_page/footer";
const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "", 
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if(errors[name]) {
      setErrors(prev => ({...prev, [name]: ""}));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
    // ek api create kr for storing contact us details 

      const response = await fetch(`${config.apiBaseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'fintervue.dev@gmail.com',
          subject: `Contact Form Submission from ${formData.fullName}`,
          textBody: `
Name: ${formData.fullName}
Email: ${formData.email}
Company: ${formData.company}
Message: ${formData.message}
          `,
          htmlBody: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.fullName}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Company:</strong> ${formData.company}</p>
<p><strong>Message:</strong></p>
<p>${formData.message}</p>
          `
        }),
      });

      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
        console.log(formData);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert("Sorry, there was an error sending your message. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
              CONTACT US
            </div>
            <div className=" text-md mb-8 md:text-md">
              We are always looking for ways to improve our products and
              services. Reach out to us and let us know how we can assist you.
            </div>
            
            <div className="mb-6 text-gray-800 space-y-2">
              <p>fintervue.dev@gmail.com</p>
              <p>+91 99721 39318</p>
            </div>
            <div className="relative">
              <img
                src={worldMap}
                alt="World Map"
                className="w-full h-auto object-cover rounded-md shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://www.bing.com/maps?where=6038+Prestige+Shantiniketan+Whitefield+bangalore%2C+bangalore%2C+karnataka+560048%2C+IN&cp=12.989907%7E77.701076&lvl=17.4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 ml-40 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  We are here
                </a>
              </div>

            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div
              className="absolute inset-0 bg-opacity-10 bg-blue-300"
              style={{ backgroundImage: "url(../../assests/grid.png)" }}
            ></div>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`w-full p-3 border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300`}
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full p-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300`}
                  placeholder="contact@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company/Individual
                </label>
                <input
                  type="text"
                  name="company"
                  className={`w-full p-3 border ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300`}
                  placeholder="Fintervue"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  className={`w-full p-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition duration-300`}
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
