import { Select } from "@chakra-ui/react";

const SignupForm = ({ formData, handleChange }) => {
  const handleResumeUpload = (e) => {
    const resumeFile = e.target.files[0];
    const resumeURL = URL.createObjectURL(resumeFile); // Temporary URL
    handleChange("resume", resumeURL);
  };

  return (
      <div className="flex flex-col gap-4 px-6 md:px-8 lg:px-10 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-4xl font-extrabold text-blue-700 tracking-wide">
          Complete your <span className="text-blue-900">Fintervue Profile</span>
        </h3>
        <p className="text-lg text-gray-500 font-light">
          Search & apply to finance jobs from here
        </p>
      </div>
    
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">First Name*</label>
          <input
            type="text"
            placeholder="What is your first name?"
            value={formData?.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Last Name*</label>
          <input
            type="text"
            placeholder="What is your last name?"
            value={formData?.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    
      {/* Email and Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email ID*</label>
          <input
            type="email"
            placeholder="Tell us your Email ID"
            value={formData?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password*</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    
      {/* Employment Status */}
      <div>
        <label className="block text-sm font-semibold mb-1">Employment Status*</label>
        <Select
          placeholder="Select your employment status"
          onChange={(e) => handleChange("currentEmploymentStatus", e.target.value)}
          className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="student">Student</option>
          <option value="freelancer">Freelancer</option>
        </Select>
      </div>
    
      {/* LinkedIn Profile */}
      <div>
        <label className="block text-sm font-semibold mb-1">LinkedIn URL*</label>
        <input
          type="url"
          placeholder="https://linkedin.com/"
          value={formData?.linkedInProfile}
          onChange={(e) => handleChange("linkedInProfile", e.target.value)}
          className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    
      {/* Resume Upload */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="resume-upload"
          className="bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800 transition-all"
        >
          Upload Resume
        </label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleResumeUpload}
        />
        {formData?.resume && (
          <a
            href={formData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Uploaded Resume
          </a>
        )}
      </div>
    
      {/* WhatsApp Opt-in */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="whatsapp_opt_in" />
        <label
          htmlFor="whatsapp_opt_in"
          className="text-md font-semibold text-gray-600"
        >
          Send me important updates & promotions via SMS, email, and{" "}
          <span className="text-green-500">WhatsApp</span>
        </label>
      </div>
    
      {/* Salary Range */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Expected Salary Range (in Lakhs)*
        </label>
        <div className="text-center mt-1 text-lg font-bold">
          ₹{formData?.expectedCompensation || 0} Lakhs
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={formData?.expectedCompensation}
          onChange={(e) =>
            handleChange("expectedCompensation", e.target.value)
          }
          className="w-full mt-2"
        />
      </div>
    
      {/* Notice Period */}
      <div className="w-full mb-6">
        <label className="block text-sm font-semibold mb-1">
          Are you currently in your notice period?*
        </label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="yes"
              onChange={(e) => handleChange("noticePeriod", "yes")}
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="no"
              onChange={(e) => handleChange("noticePeriod", "no")}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
    </div>
  );  
};

export default SignupForm;
