import React, { useState } from "react";
import ShimmerButton from "../ui/shimmer-button";
import { Spinner, Text, Icon, Progress } from "@chakra-ui/react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

function Upload({ onFileChange, onSubmit, loading, scores }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      onFileChange(event);
    } else {
      // Could add toast notification here
      console.error("Please upload a PDF file");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const event = { target: { files: [file] } };
      onFileChange(event);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const renderScores = () => {
    if (!scores) return null;
    
    const scoreItems = [
      { label: 'Brevity', value: scores.brevity },
      { label: 'Style', value: scores.style },
      { label: 'Resume Length', value: scores.resume_length },
      { label: 'Impact', value: scores.impact }
    ];

    return (
      <div className="w-full mt-6 space-y-4">
        <Text className="text-lg font-medium text-gray-900">Resume Scores</Text>
        {scoreItems.map(item => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between">
              <Text className="text-sm font-medium text-gray-700">{item.label}</Text>
              <Text className="text-sm font-medium text-gray-900">{item.value}/100</Text>
            </div>
            <Progress 
              value={item.value} 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed 
        ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-blue-500'} 
        rounded-lg shadow-lg w-full max-w-lg mx-auto transition-all duration-200`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center h-40 w-full relative mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="absolute opacity-0 w-full h-full cursor-pointer"
          disabled={loading}
        />
        
        {!selectedFile ? (
          <>
            <Icon as={FiUploadCloud} className="h-14 w-14 text-blue-400 mb-2" />
            <Text className="text-black text-lg font-medium text-center">
              {dragActive ? "Drop your resume here" : "Drag & drop or click to upload your resume"}
            </Text>
            <Text className="text-gray-500 text-sm mt-2">
              Supports PDF files up to 10MB
            </Text>
          </>
        ) : (
          <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg w-full">
            <Icon as={FiFile} className="h-8 w-8 text-blue-500" />
            <div className="flex-1 min-w-0">
              <Text className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </Text>
              <Text className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </div>
            <button
              onClick={removeFile}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700"
            >
              <Icon as={FiX} className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={onSubmit} 
        disabled={!selectedFile || loading}
        className={`transition duration-300 ${!selectedFile || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {loading ? "Analyzing Resume..." : "Get My Free Resume Review"}
          </span>
        </ShimmerButton>
      </button>

      {loading && (
        <div className="mt-4 flex flex-col items-center">
          <Spinner size="lg" color="teal.500" />
          <Text className="text-sm text-gray-600 mt-2">
            Please wait while we analyze your resume...
          </Text>
        </div>
      )}

      {renderScores()}
    </div>
  );
}

export default Upload;
