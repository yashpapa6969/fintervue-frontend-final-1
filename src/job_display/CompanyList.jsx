import React, { useState } from "react";
import BoxReveal from "../components/ui/box-reveal";
import ApplyPopup from "./applyPopup";

const JobRoleCard = ({ job }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="border bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex items-center mb-6">
          <img
            src={job.logo}
            alt={`${job.name} logo`}
            className="h-14 w-14 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {job.name}
            </h3>
            <p className="text-sm text-gray-600">
              {job.employees} employees
            </p>
          </div>
        </div>
        <p className="mb-6 text-gray-700 leading-relaxed max-w-[65ch]">
          {job.description}
        </p>
        <h4 className="text-gray-900 font-medium mb-3">Required Skills</h4>
        <ul className="list-disc ml-6 mb-6 space-y-1">
          {job.skills.map((skill, index) => (
            <li key={index} className="text-gray-600">
              {skill}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowPopup(true)}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
            hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 
            focus:ring-blue-500 focus:outline-none"
        >
          Apply Now
        </button>
      </BoxReveal>

      {showPopup && (
        <ApplyPopup job={job} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default JobRoleCard;
