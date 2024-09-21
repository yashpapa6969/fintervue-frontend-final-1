import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSchedulePage = () => {
  const [formData, setFormData] = useState({
    selectedRole: "",
    yearsOfExperience: "",
    resume: null,
    timing: "",
  });

  const roles = [
    { id: "analyst", label: "Analyst" },
    { id: "financial-advisor", label: "Financial Advisor" },
    { id: "investment-banker", label: "Investment Banker" },
    { id: "accountant", label: "Accountant" },
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleRoleClick = (roleId) => {
    setFormData({
      ...formData,
      selectedRole: roleId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the form data

    // Redirect to thank you page after submission
   // navigate("/thank-you");
   navigate("/scheduleInterview");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900"></h2>
          <p className="text-gray-600 mb-8">
            Apply to the interviews all around there and schedule the meets
            accoringly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Job Title */}

            {/* Role Selection */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Select Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleClick(role.id)}
                    className={`border p-4 rounded-md cursor-pointer text-center ${
                      formData.selectedRole === role.id
                        ? "bg-blue-600 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {role.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Years of experience
              </label>
              <input
                type="text"
                name="years of experience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 p-2 rounded-md"
                placeholder="mention the no of years of experience"
              />
            </div>

            {/* Resume Upload */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                className="mt-1 w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Timing Selection */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Preferred Timing
              </label>
              <input
                type="datetime-local"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-md font-medium hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobSchedulePage;
