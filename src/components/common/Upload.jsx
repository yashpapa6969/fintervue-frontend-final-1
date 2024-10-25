import React, { useState } from "react";
import ShimmerButton from "../ui/shimmer-button";
import { Spinner } from "@chakra-ui/react";  // Import the Spinner

function Upload({ onFileChange, onSubmit, loading }) {  // Add `loading` as a prop
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileChange(event);
    console.log(file);
  };

  const handleButtonClick = () => {
    if (selectedFile) {
      console.log("File details:", selectedFile);
      console.log("File path:", selectedFile.path || "Path not available");
      onSubmit();
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-500 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center justify-center h-40 w-full relative mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-blue-400 pointer-events-none mb-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M10.828 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8.172a2 2 0 01-1.414-.586l-2.828-2.828A2 2 0 0010.828 4zM4 6a1 1 0 011-1h6.172a1 1 0 01.707.293l2.828 2.828A2 2 0 0016 9h4a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-black text-lg font-medium pointer-events-none">
          {selectedFile ? `File added: ${selectedFile.name}` : "Drag & drop or click to upload your resume"}
        </p>
      </div>

      <button onClick={handleButtonClick} className="transition duration-300">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Get My Free Resume Review
          </span>
        </ShimmerButton>
      </button>

      {/* Conditionally render the spinner below the button */}
      {loading && (
        <div className="mt-4">
          <Spinner size="lg" color="teal.500" />
        </div>
      )}
    </div>
  );
}

export default Upload;
