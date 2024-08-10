import React, { useState } from "react";
import { StepperContext } from "../context/StepperContext";
import Navbar from "../components/navbar";
import Personalinfo from "../components/forms/builder_form/Personalinfo";
import WordFadeIn from "../components/ui/word-fade-in";
import FlipText from "../components/ui/flip-text";

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
        <div className="text-center">
          <FlipText
            className="text-4xl font-bold tracking-[-0.1em] bg-clip-text   md:text-7xl md:leading-[5rem]"
            word="Resume builder"
          />
          <h3 className="mt-[.5rem] text-[1.5rem] pt-5">
            Accelerate your job application process by completing it twice as
            fast. Begin by choosing from a variety of recruiter-approved
            templates. Next, just click to add ready-made skills and phrases
            into your selected template
          </h3>
        </div>
        
        <div className="container horizontal mt-5">
          <div className="w-full flex justify-center ">
            {/* Optionally add a title or any additional content here */}
          </div>

          <div className="my-5 p-5 shadow-sm ">
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
