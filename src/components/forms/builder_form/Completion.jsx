
import React, { useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";

const Completion = () => {
  const { userData } = useContext(StepperContext);
  const handleSubmit = () => {
    // Convert userData to JSON
    const jsonData = JSON.stringify(userData, null, 2);

    // Send data to the server or handle it as needed
    console.log("Submitting data:", jsonData);

    // Example: Sending data to a server
    // fetch('https://example.com/api/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: jsonData,
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="text-green-400">
          <svg>{/* SVG content */}</svg>
        </div>
        <div className="mt-3 text-xl font-semibold uppercase text-blue-700">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your Resume has been created.
        </div>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
      {/* <a className="mt-10" href="/">
        <button className="h-10 px-5 text-blue-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100">
          Button text
        </button>
      </a> */}
    </div>
  );
}

export default Completion