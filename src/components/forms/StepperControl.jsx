import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick("")}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-[10px] font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out w-[100px] 
          ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Back
      </button>
      {/* next button */}
      <button
        onClick={() => handleClick("next")}
        className={`bg-blue-700 text-white uppercase py-2 px-4 rounded-[10px] font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out w-auto 
          `}
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
