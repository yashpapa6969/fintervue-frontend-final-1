import React, { useState } from 'react';
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Navbar from '../navbar';

import Resume1 from "../../assests/Resumes/Resume1.png";
import Resume2 from "../../assests/Resumes/Resume2.png";
import Resume3 from "../../assests/Resumes/Resume3.png";
import Resume4 from "../../assests/Resumes/Resume4.png";
//import Resume5 from "../../assests/Resumes/Resume5.png";

function ResumeSelect() {
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const [step, setStep] = useState(1); //Step to manage template, cart, and payment section navigation
  const toast = useToast();

  const templates = [
    { id: 1, name: "India", users: "9,300,000+", img: Resume1 },
    { id: 2, name: "New York", users: "4,200,000+", img: Resume2 },
    { id: 3, name: "Japan", users: "2,300,000+", img: Resume3 },
    { id: 4, name: "Berlin", users: "1,500,000+", img: Resume4 },
    //{ id: 5, name: "Tokyo", users: "8,000,000+", img: Resume5 },
  ];

  const visibleTemplates = 3; // Number of visible templates at a time
  const maxSlides = Math.ceil(templates.length / visibleTemplates) - 1;

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide < maxSlides ? prevSlide + 1 : 0)); // Loop around to first slide
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : maxSlides)); // Loop around to last slide
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1); // Navigate to the next step (cart or payment)
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1); // Navigate back to previous step
  };

  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');

// Function to remove item from cart
const removeFromCart = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setCart(updatedCart); // Assuming setCart is the state setter for the cart
};

  const addToCart = (template) => {
    if (!cart.find(item => item.id === template.id)) {
      setCart([...cart, template]);
      toast({
        title: "Added to Cart",
        description: `${template.name} has been added to your cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Already in Cart",
        description: "This template is already in your cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <LoadingBar color="#4a90e2" progress={100} onLoaderFinished={() => {}} />
        
        {/* Steps Navigation */}
        <div className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h1 className="text-4xl font-bold text-gray-800 animate-fade-in">Build Your Resume</h1>
          <div className="flex items-center space-x-6">
            {/* Step 1 Indicator */}
            <div
              className={`py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform ${
                step >= 1
                  ? "bg-blue-700 text-white scale-110"
                  : "border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105"
              }`}
            >
              1. Choose Template
            </div>

            {/* Step 2 Indicator */}
            <div
              className={`py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform ${
                step >= 2
                  ? "bg-blue-700 text-white scale-110"
                  : "border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105"
              }`}
            >
              2. Review Cart <span className="text-sm">({cart.length} items)</span>
            </div>

            {/* Step 3 Indicator */}
            <div
              className={`py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform ${
                step >= 3
                  ? "bg-blue-700 text-white scale-110"
                  : "border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105"
              }`}
            >
              3. Make Payment
            </div>
          </div>
        </div>



        {/* Horizontal Slider Section */}
        {step === 1 && (
          <div className="relative w-full">
            {/* Left Arrow */}
            <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-full z-20">
              <FiChevronLeft size={24} />
            </button>

            <div className="overflow-hidden">
              <div className="flex gap-4 transition-transform duration-500 ease-in-out transform" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {templates.map((template) => (
                  <div key={template.id} className="w-1/3 flex-shrink-0 p-4">
                    <div className="flex flex-col items-center">
                      {/* Name and Users */}
                      <div className="mb-2 text-center">
                        <h2 className="text-lg font-bold">{template.name}</h2>
                        <p className="text-sm text-gray-500">{template.users} users</p>
                      </div>

                      <div className="w-full h- p-4 border-2 border-blue-700 rounded-lg hover:shadow-xl relative group transform transition-transform duration-500 hover:scale-105">
                        <img src={template.img} alt={template.name} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 mt-2" onClick={() => addToCart(template)}>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button onClick={handleNextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-full z-20">
              <FiChevronRight size={24} />
            </button>

            {/* Next Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-blue-700 text-white py-2 px-6 rounded-full hover:bg-blue-800" onClick={handleNextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Review Cart Section */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty. Add some templates.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                      <div>
                        <span className="font-medium">{item.name}</span> <br />
                        <span className="text-gray-600">{item.users} users</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-colors duration-200"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  className="bg-blue-700 text-white py-2 px-6 rounded-full hover:bg-blue-800 transition-colors duration-200"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            </div>
          )}



        {/* Payment Section */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Make Payment</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p>Total Items: {cart.length}</p>
              <p>Amount: ₹{cart.length * 500} (₹500 per template)</p>
            </div>

            {/* Payment Options */}
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method:</h3>
            <div className="flex space-x-4 mb-6">
              <button
                className={`py-2 px-4 rounded-full ${
                  paymentMethod === 'Credit/Debit Card' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'
                } hover:bg-blue-800`}
                onClick={() => setPaymentMethod('Credit/Debit Card')}
              >
                Credit/Debit Card
              </button>
              <button
                className={`py-2 px-4 rounded-full ${
                  paymentMethod === 'UPI' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'
                } hover:bg-blue-800`}
                onClick={() => setPaymentMethod('UPI')}
              >
                UPI
              </button>
              <button
                className={`py-2 px-4 rounded-full ${
                  paymentMethod === 'Net Banking' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'
                } hover:bg-blue-800`}
                onClick={() => setPaymentMethod('Net Banking')}
              >
                Net Banking
              </button>
            </div>

            {/* Back and Pay Button */}
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-800"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button className="bg-green-500 text-black py-2 px-6 rounded-full hover:bg-green-600">
                <a href="/product/resumeBuilder" className="block px-6 py-2 text-black-700">
                  Pay ₹{cart.length * 500} via {paymentMethod}
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeSelect;
