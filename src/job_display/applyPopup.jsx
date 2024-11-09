import React, { useState } from "react";
import { useStore } from "../store/useStore"; // Zustand store
import { useNavigate } from "react-router-dom";


const ApplyPopup = ({ job, onClose }) => {
  const { setApplicant } = useStore(); // Access Zustand store
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  // const { applicant } = useStore(); // Access the Zustand store

  // useEffect(() => {
  //   // Log the contents of the applicant data
  //   console.log("Applicant data:", applicant);
  // }, [applicant]); // Log whenever applicant data changes

  const handleSubmit = (e) => {
    e.preventDefault();

   
    setApplicant({
      email,
      phone,
      resume,
    });
    // console.log(setApplicant);
    console.log("Applicant data:", JSON.stringify({ email, phone, resume }));

    
    navigate("/");

    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Apply for {job.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-gray-700 text-sm font-medium mb-2">
              Upload Resume (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              id="resume"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPopup;
