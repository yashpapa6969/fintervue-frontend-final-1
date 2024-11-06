import { useState, useRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";

const SignupForm = ({ formData, handleChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  // Validate file type and size
  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return false;
    }
    if (file.size > maxSize) {
      setFileError("File size must be less than 5MB");
      return false;
    }
    setFileError("");
    return true;
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      handleChange("resume", file); // Store the actual file instead of URL
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      handleChange("resume", file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input on div click
  };

  return (
    <div className="flex flex-col gap-4 px-4 w-full mb-24">

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <FormControl isRequired>
          <FormLabel className="font-medium text-gray-700">First Name*</FormLabel>
          <InputGroup>
            <Input
              placeholder="What is your first name?"
              value={formData?.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel className="font-medium text-gray-700">Last Name*</FormLabel>
          <InputGroup>
            <Input
              placeholder="What is your last name?"
              value={formData?.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            />
          </InputGroup>
        </FormControl>
      </div>

      {/* Email and Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <FormControl isRequired>
          <FormLabel className="font-medium text-gray-700">Email ID*</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="Tell us your Email ID"
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel className="font-medium text-gray-700">Password*</FormLabel>
          <InputGroup>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            />
          </InputGroup>
        </FormControl>
      </div>

      {/* Employment Status */}
      <FormControl isRequired>
        <FormLabel className="font-medium text-gray-700">Employment Status*</FormLabel>
        <Select
          placeholder="Select your employment status"
          onChange={(e) => handleChange("currentEmploymentStatus", e.target.value)}
          className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
        >
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="student">Student</option>
          <option value="freelancer">Freelancer</option>
        </Select>
      </FormControl>

      {/* LinkedIn Profile */}
      <FormControl isRequired>
        <FormLabel className="font-medium text-gray-700">LinkedIn URL*</FormLabel>
        <InputGroup>
          <Input
            type="url"
            placeholder="https://linkedin.com/"
            value={formData?.linkedInProfile}
            onChange={(e) => handleChange("linkedInProfile", e.target.value)}
            className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
          />
        </InputGroup>
      </FormControl>

      {/* Resume Upload with Drag and Drop */}
      <FormControl isInvalid={!!fileError}>
        <FormLabel className="font-medium text-gray-700">Resume Upload</FormLabel>
        <div
          className={`w-full p-4 border-2 border-dashed ${
            dragOver ? "border-green-500" : fileError ? "border-red-500" : "border-gray-300"
          } rounded-md transition-all duration-300 hover:bg-gray-100 cursor-pointer`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClickUpload}
        >
          <p className="text-center text-gray-600">
            Drag & Drop your resume here, or click to upload
            <br />
            <span className="text-sm text-gray-500">
              Accepted formats: PDF, DOC, DOCX (max 5MB)
            </span>
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            ref={fileInputRef}
            onChange={handleResumeUpload}
          />
        </div>
        {fileError && <FormErrorMessage>{fileError}</FormErrorMessage>}
      </FormControl>

      {/* WhatsApp Opt-in */}
      <div className="flex items-center gap-2 w-full">
        <input type="checkbox" id="whatsapp_opt_in" className="cursor-pointer" />
        <label
          htmlFor="whatsapp_opt_in"
          className="text-md font-semibold text-gray-600 cursor-pointer"
        >
          Send me important updates & promotions via SMS, email, and{" "}
          <span className="text-green-500">WhatsApp</span>
        </label>
      </div>

      {/* Salary Range */}
      <FormControl>
        <FormLabel className="font-medium text-gray-700">Expected Salary Range (in Lakhs)*</FormLabel>
        <div className="text-center mt-1 text-lg font-bold">
          ₹{formData?.expectedCompensation || 0} Lakhs
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={formData?.expectedCompensation}
          onChange={(e) => handleChange("expectedCompensation", e.target.value)}
          className="w-full mt-2"
        />
      </FormControl>

      {/* Notice Period */}
      <FormControl className="w-full mb-6">
        <FormLabel className="font-medium text-gray-700">
          Are you currently in your notice period?*
        </FormLabel>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="yes"
              onChange={(e) => handleChange("noticePeriod", "yes")}
              className="cursor-pointer"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="no"
              onChange={(e) => handleChange("noticePeriod", "no")}
              className="cursor-pointer"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </FormControl>
    </div>
  );
};

export default SignupForm;
