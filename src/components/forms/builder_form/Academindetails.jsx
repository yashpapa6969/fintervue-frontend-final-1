import React, { useState, useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";

const Academindetails = () => {
  const { userData, setUserData } = useContext(StepperContext);

  // Handle changes to text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle adding a new experience entry
  const handleAddExperience = () => {
    setUserData({
      ...userData,
      experience: [
        ...(userData.experience || []), // Ensure experience is an array
        {
          companyName: "",
          jobRole: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  // Handle changes to experience fields
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = (userData.experience || []).map((exp, expIndex) =>
      expIndex === index ? { ...exp, [name]: value } : exp
    );
    setUserData({ ...userData, experience: newExperience });
  };

  // Handle adding a new education entry
  const handleAddEducation = () => {
    setUserData({
      ...userData,
      education: [
        ...(userData.education || []), // Ensure education is an array
        {
          schoolName: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  // Handle changes to education fields
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = (userData.education || []).map((edu, eduIndex) =>
      eduIndex === index ? { ...edu, [name]: value } : edu
    );
    setUserData({ ...userData, education: newEducation });
  };

  return (
    <div className="flex flex-col">
      {/* Personal Information Section */}
      

      {/* Experience Section */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase flex justify-between items-center">
          <span>Experience</span>
          <button
            onClick={handleAddExperience}
            className="bg-blue-500 text-white p-1 px-5 rounded-sm  transition-colors duration-300 text-s my-4 "
          >
            Add +
          </button>
        </div>
        {(userData.experience || []).map((exp, index) => (
          <div
            key={index}
            className="bg-white my-4 p-2 border border-gray-200 rounded"
          >
            <input
              onChange={(e) => handleExperienceChange(index, e)}
              value={exp.companyName || ""}
              name="companyName"
              placeholder="Company Name"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full focus:bg-gray-100 text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleExperienceChange(index, e)}
              value={exp.jobRole || ""}
              name="jobRole"
              placeholder="Job Role"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full focus:bg-gray-100 text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleExperienceChange(index, e)}
              value={exp.startDate || ""}
              name="startDate"
              type="date"
              placeholder="Start Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200  text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleExperienceChange(index, e)}
              value={exp.endDate || ""}
              name="endDate"
              type="date"
              placeholder="End Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <textarea
              onChange={(e) => handleExperienceChange(index, e)}
              value={exp.description || ""}
              name="description"
              placeholder="Description"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
              rows="3"
            />
          </div>
        ))}
        {/* <button
          onClick={handleAddExperience}
          className=" text-blue-700 p-1 px-2 rounded-sm  transition-colors duration-300 text-s  "
        >
          +Add
        </button> */}
      </div>

      {/* Education Section */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase flex justify-between items-center">
          <span>Education</span>
          <button
            onClick={handleAddEducation}
            className="bg-blue-500 text-white p-1 px-5 rounded-sm  transition-colors duration-300 text-s my-4 "
          >
            Add +
          </button>
        </div>
        {(userData.education || []).map((edu, index) => (
          <div
            key={index}
            className="bg-white my-4 p-2 border  border-gray-200 rounded"
          >
            <input
              onChange={(e) => handleEducationChange(index, e)}
              value={edu.schoolName || ""}
              name="schoolName"
              placeholder="School/College Name"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleEducationChange(index, e)}
              value={edu.degree || ""}
              name="degree"
              placeholder="Degree"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleEducationChange(index, e)}
              value={edu.startDate || ""}
              name="startDate"
              type="date"
              placeholder="Start Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleEducationChange(index, e)}
              value={edu.endDate || ""}
              name="endDate"
              type="date"
              placeholder="End Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <textarea
              onChange={(e) => handleEducationChange(index, e)}
              value={edu.description || ""}
              name="description"
              placeholder="Description"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
              rows="3"
            />
          </div>
        ))}

        {/* <button
          onClick={handleAddEducation}
          className=" text-blue-700 p-1 px-2 rounded-sm  transition-colors duration-300 text-s right-0 "
        >
          +Add
        </button> */}
      </div>
    </div>
  );
};

export default Academindetails;


