import { useState } from "react";
import { StepperContext } from "../context/StepperContext";
import Navbar from "../components/navbar";
import Personalinfo from "../components/forms/builder_form/Personalinfo";
import FlipText from "../components/ui/flip-text";
import { Select } from "@chakra-ui/react";

const PreResumeForm = ({ setExperienceLevel, setDomain }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="my-4 w-full max-w-xs md:max-w-[300px]">
        <span className="font-semibold">Choose your experience level</span>
        <Select mt={2} onChange={(e) => setExperienceLevel(e.target.value)}>
          <option defaultValue={""}>What is your experience?</option>
          <option value={"beginner"}>Beginner</option>
          <option value={"intermediate"}>Intermediate</option>
          <option value={"expert"}>Expert</option>
        </Select>
      </div>
      <div className="my-4 w-full max-w-xs md:max-w-[300px]">
        <span className="font-semibold">Choose your domain</span>
        <Select mt={2} onChange={(e) => setDomain(e.target.value)}>
          <option defaultValue={""}>What is your domain?</option>
          <option value={"finance1"}>Finance 1</option>
          <option value={"finance2"}>Finance 2</option>
          <option value={"finance3"}>Finance 3</option>
        </Select>
      </div>
    </div>
  );
};

const ResumeBuilder = () => {
  const [experienceLevel, setExperienceLevel] = useState("");
  const [domain, setDomain] = useState("");
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
        date: "",
      },
    ],
  });
  const [finalData, setFinalData] = useState([]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="mt-8 shadow-xl rounded-2xl p-6 md:p-10 bg-white">
          <div className="">
            <FlipText
              className="text-3xl md:text-4xl font-bold tracking-[-0.1em] bg-clip-text"
              word="Resume builder"
            />
            <h3 className="mt-4 text-lg md:text-xl">
              Accelerate your job application process by completing it twice as
              fast. Begin by choosing from a variety of recruiter-approved
              templates. Next, just click to add ready-made skills and phrases
              into your selected template.
            </h3>
          </div>

          {/* PreResumeForm */}
          <PreResumeForm
            setExperienceLevel={setExperienceLevel}
            setDomain={setDomain}
          />

          {experienceLevel && domain && (
            <>
              <div className="container mx-auto">
                <div className="w-full flex justify-center ">
                  {/* Optionally add a title or any additional content here */}
                </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
