import React, { useState } from "react";
import BoxReveal from "../components/ui/box-reveal";
import ApplyPopup from "./applyPopup";

const JobRoleCard = ({ job }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="border bg-white rounded-lg shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 duration-200 p-10">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex items-center mb-4">
          <img
            src={job.logo}
            alt={job.name}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold hover:text-2xl transition-all duration-200">
              {job.name}
            </h3>
            <p className="text-gray-500 hover:text-lg transition-all duration-200">
              {job.employees} employees
            </p>
          </div>
        </div>
        <p className="mb-4 hover:text-lg transition-all duration-200">
          {job.description}
        </p>
        <div className="text-gray-800 font-semibold mb-2">Skills Required:</div>
        <ul className="list-disc ml-6 mb-4">
          {job.skills.map((skill, index) => (
            <li key={index} className="text-gray-600">
              {skill}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowPopup(true)}
          className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Apply
        </button>
      </BoxReveal>

      {showPopup && (
        <ApplyPopup job={job} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default JobRoleCard;
