import React from "react";
import Button from "../components/button";

const Hero = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800">
          Explore the Job Opportunities here 
        </h1>
        <p className="text-gray-600 mt-2">Get the right suitable career for you</p>
        <div className="mt-8 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter skills / designations / companies"
            className="w-80 py-3 px-4 rounded-[15px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <select className="appearance-none w-48 py-3 px-4 rounded-[15px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select experience</option>
              <option>Fresher (less than 1 year)</option>
              <option>1 year</option>
              <option>2 years</option>
              <option>3 years</option>
              <option>4 years</option>
              <option>5 years</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.5 7l4.5 4.5L14.5 7H5.5z" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter location"
            className="w-64 py-3 px-4 rounded-[15px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button text = "Search">
            {/* <button className="bg-black text-white py-3 px-8 rounded-[15px] font-bold hover:bg-blue-700"> */}
              Search
            {/* </button> */}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
