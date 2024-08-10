import React, { useState } from "react";
import { StepperContext } from "../context/StepperContext";
import Navbar from "../components/navbar";
import Personalinfo from "../components/forms/builder_form/Personalinfo";
import WordFadeIn from "../components/ui/word-fade-in";

const ResumeBuilder = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    jobRole: "",
    summary: "",
    experience: [
      {
        companyName: "",
        jobRole: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        schoolName: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
     projects: [
    {
      name: "",
      summary: "",
      date: ""
    },],
  });
  const [finalData, setFinalData] = useState([]);

  return (
    <div>
      <Navbar />
      {/* Single form view */}
      <div className="nd:wd-1/2 shadow-xl rounded-2xl p-2 m-10 px-10 bg-white">
        <div>
          <WordFadeIn words="Resume Builder" />;
        </div>
        <div className="container horizontal mt-5">
          <div className="w-full flex justify-center ">
            {/* Optionally add a title or any additional content here */}
          </div>

          <div className="my-10 p-10">
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
              }}
            >
              <Personalinfo />
            </StepperContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
