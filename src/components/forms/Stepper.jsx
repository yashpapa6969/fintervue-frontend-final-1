import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      // Current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
      }
      // Step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
      }
      // Step still pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
      }
      count++;
    }
    return newSteps;
  };

  useEffect(() => {
    // Whenever current step changes, our useEffect runs
    const stepState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index === newStep.length - 1
            ? ""
            : "w-full flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-blue-700">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3
            ${
              step.selected
                ? "bg-blue-700 text-white font-bold border border-blue-500"
                : ""
            }`}
          >
            {/* Display number */}
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase 
            ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}
          >
            {/* Display description */}
            {step.description}
          </div>
        </div>
        
      {index !== newStep.length - 1 ?
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              step.completed ? "border-blue-700" : "border-gray-300"
            }`}
          >
            {/* Display line */}
          </div> : null
        }
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center w-full ">
      {displaySteps}
    </div>
  );
};

export default Stepper;