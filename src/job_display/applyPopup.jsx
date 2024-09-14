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

    
    navigate("/thank-you");

    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0 md:w-[600px]">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Apply for {job.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-700">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPopup;
