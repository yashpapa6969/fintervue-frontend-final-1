import React from "react";
import { useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";

const Personalinfo = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      {/* Name */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Name
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["name"] || ""}
          name="name"
          placeholder="Full Name"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Email */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Email
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["email"] || ""}
          name="email"
          type="email"
          placeholder="Email Address"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Phone Number */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Phone Number
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["phone"] || ""}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* LinkedIn URL */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          LinkedIn URL
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["linkedin"] || ""}
          name="linkedin"
          type="url"
          placeholder="LinkedIn Profile URL"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Job Role */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Job Role
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <select
          onChange={handleChange}
          value={userData["jobRole"] || ""}
          name="jobRole"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-white"
        >
          <option value="" disabled>
            Select Job Role
          </option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Professional Summary */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Professional Summary
        </div>
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <textarea
          onChange={handleChange}
          value={userData["summary"] || ""}
          name="summary"
          placeholder="Brief summary of your experience"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          rows="4"
        />
      </div>

      {/* Submit Button
      <div className="w-full mx-2 flex-1">
        <button
          onClick={() => alert("Form submitted!")}
          className="w-full bg-blue-700 text-white p-2 rounded-lg mt-4 hover:bg-blue-800 transition-colors duration-300"
        >
          Submit
        </button>
      </div> */}
    </div>
  );
};

export default Personalinfo;
