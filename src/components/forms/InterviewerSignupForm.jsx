import { useState } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import DragAndDropUpload from "./dragAndDropUpload";

 

const InterviewerSignupForm = ({ formData, handleChange, errors }) => {
  const [dragOver, setDragOver] = useState(false);

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const resumeFile = e.target.files[0];
    if (resumeFile) {
      const resumeURL = URL.createObjectURL(resumeFile); // Temporary URL for the file
      handleChange("resume", resumeURL); // Update formData with the resume URL
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
    if (file) {
      const resumeURL = URL.createObjectURL(file); // Temporary URL for the file
      handleChange("resume", resumeURL); // Update formData with the resume URL
    }
  };

   const handleClickUpload = () => {
     fileInputRef.current.click(); // Programmatically trigger the file input on div click
   };

  return (
    <div className="flex flex-col gap-4 px-2 md:px-2 lg:px-2 w-full ">
      {/* First Name */}
      <div className="flex flex-row gap-5">
        <FormControl isInvalid={!!errors?.firstName} isRequired>
          <FormLabel as="legend">First Name</FormLabel>
          <InputGroup display={"flex"} flexDirection={"column"}>
            <Input
              className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
              type="text"
              name="firstName"
              placeholder="What is your first name?"
              value={formData?.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </InputGroup>
          {errors?.firstName && (
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          )}
        </FormControl>
        {/* Last Name */}
        <FormControl isInvalid={!!errors?.lastName} isRequired>
          <FormLabel as="legend">Last Name</FormLabel>
          <InputGroup display={"flex"} flexDirection={"column"}>
            <Input
              className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
              type="text"
              name="lastName"
              placeholder="What is your last name?"
              value={formData?.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </InputGroup>
          {errors?.lastName && (
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          )}
        </FormControl>
      </div>

      {/* Password */}
      <div className="flex flex-row gap-5">
        <FormControl isInvalid={!!errors?.password} isRequired>
          <FormLabel as="legend">Password</FormLabel>
          <InputGroup display={"flex"} flexDirection={"column"}>
            <Input
              className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
              type="password"
              name="password"
              placeholder="What is your password?"
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </InputGroup>
          {errors?.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>

        {/* Email */}
        <FormControl isInvalid={!!errors?.email} isRequired>
          <FormLabel as="legend">Email</FormLabel>
          <InputGroup display={"flex"} flexDirection={"column"}>
            <Input
              className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
              type="text"
              name="email"
              placeholder="What is your email?"
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </InputGroup>
          {errors?.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
      </div>

      {/* LinkedIn Profile */}
      <FormControl isInvalid={!!errors?.linkedInProfile} isRequired>
        <FormLabel as="legend">LinkedIn URL</FormLabel>
        <InputGroup display={"flex"} flexDirection={"column"}>
          <Input
            className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
            type="text"
            name="linkedInProfile"
            placeholder="What is your LinkedIn Profile?"
            value={formData?.linkedInProfile}
            onChange={(e) => handleChange("linkedInProfile", e.target.value)}
          />
        </InputGroup>
        {errors?.linkedInProfile && (
          <FormErrorMessage>{errors.linkedInProfile}</FormErrorMessage>
        )}
      </FormControl>

      {/* Drag-and-Drop Resume Upload */}
      <div
        className={`w-full p-4 border-2 border-dashed ${
          dragOver ? "border-green-500" : "border-gray-300"
        } rounded-md`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClickUpload}
      >
        <p className="text-center text-gray-600">
          Drag & Drop your resume here, or click to upload.
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleResumeUpload}
        />
      </div>

      {/* Resume Preview */}
      {formData?.resume && (
        <div className="mt-4">
          <p>Resume Uploaded:</p>
          <a
            href={formData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            View Resume
          </a>
        </div>
      )}

      {/* WhatsApp Opt-in */}
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="whatsapp_opt_in" />
        <label
          htmlFor="whatsapp_opt_in"
          className="text-md font-semibold text-gray-600"
        >
          Send me important updates & promotions via SMS, email, and{" "}
          <span className="text-green-500">WhatsApp</span>
        </label>
      </div>
    </div>
  );
};

export default InterviewerSignupForm;