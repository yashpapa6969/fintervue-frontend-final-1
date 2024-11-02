import { useState, useRef } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";

const InterviewerSignupForm = ({ formData, handleChange, errors }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  // Validate file type and size
  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
    <div className="flex flex-col gap-4 px-4 w-full mb-24"> {/* Added mb-24 to prevent overlap */}
      {/* First Name & Last Name */}
      <div className="flex flex-col md:flex-row gap-5">
        <FormControl isInvalid={!!errors?.firstName} isRequired className="w-full">
          <FormLabel className="font-medium text-gray-700">First Name</FormLabel>
          <InputGroup>
            <Input
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
              type="text"
              placeholder="Enter your first name"
              value={formData?.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </InputGroup>
          {errors?.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors?.lastName} isRequired className="w-full">
          <FormLabel className="font-medium text-gray-700">Last Name</FormLabel>
          <InputGroup>
            <Input
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
              type="text"
              placeholder="Enter your last name"
              value={formData?.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </InputGroup>
          {errors?.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
        </FormControl>
      </div>

      {/* Phone Number & email */}
      <div className="flex flex-col md:flex-row gap-5">
        <FormControl isInvalid={!!errors?.phoneNumber} isRequired className="w-full">
          <FormLabel className="font-medium text-gray-700">Phone Number</FormLabel>
          <InputGroup>
            <Input
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
              type="tel"
              placeholder="Enter your phone number"
              value={formData?.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </InputGroup>
          {errors?.phoneNumber && <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors?.email} isRequired className="w-full">
          <FormLabel className="font-medium text-gray-700">Email</FormLabel>
          <InputGroup>
            <Input
              className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
              type="email"
              placeholder="Enter your email address"
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </InputGroup>
          {errors?.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
      </div>

      {/* LinkedIn Profile */}
      <FormControl isInvalid={!!errors?.linkedInProfile} isRequired>
        <FormLabel className="font-medium text-gray-700">LinkedIn URL</FormLabel>
        <InputGroup>
          <Input
            className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            type="text"
            placeholder="Enter your LinkedIn profile"
            value={formData?.linkedInProfile}
            onChange={(e) => handleChange("linkedInProfile", e.target.value)}
          />
        </InputGroup>
        {errors?.linkedInProfile && <FormErrorMessage>{errors.linkedInProfile}</FormErrorMessage>}
      </FormControl>

      {/* Password */}
      <FormControl isInvalid={!!errors?.password} isRequired>
        <FormLabel className="font-medium text-gray-700">Password</FormLabel>
        <InputGroup>
          <Input
            className="outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700"
            type="password"
            placeholder="Create a password"
            value={formData?.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </InputGroup>
        {errors?.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
      </FormControl>

      {/* Updated Resume Upload */}
      <FormControl isInvalid={!!fileError}>
        <FormLabel className="font-medium text-gray-700">Resume</FormLabel>
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

      {/* Updated Resume Preview */}
      {formData?.resume && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="font-medium">Resume Uploaded:</p>
          <p className="text-sm text-gray-600">{formData.resume.name}</p>
        </div>
      )}

      {/* WhatsApp Opt-in */}
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="whatsapp_opt_in" className="cursor-pointer" />
        <label htmlFor="whatsapp_opt_in" className="text-md font-semibold text-gray-600 cursor-pointer">
          Send me important updates & promotions via SMS, email, and{" "}
          <span className="text-green-500">WhatsApp</span>
        </label>
      </div>
    </div>
  );
};

export default InterviewerSignupForm;
