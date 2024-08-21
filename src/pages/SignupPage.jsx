import { Check } from "lucide-react";
import SignupForm from "../components/forms/SignupForm";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import FrontendIcon from "../assests/avatar-1.png"; // Ensure this path is correct
import { useAccordion } from "@chakra-ui/react";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProcess, setSelectedProcess] = useState("");
    const [selectedJobLocations, setSelectedJobLocations] = useState([]);
    const [selectedYearsOfExperience, setSelectedYearsOfExperience] = useState(null);
    const [selectedKeySkills, setSelectedKeySkills] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setCurrentStep(3);
    console.log("Not implemented but form submitted");
    navigate("/");
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const [data, setData] = useState({
    domain: null,
    financeProfiles: null,
  });
  const handleDomain = (domain) => {
    setData((prev) => ({
      ...prev,
      domain: domain,
    }));
  };
  const handleRole = () => {
    if (domain !== null) {
      return financeProfiles.filter((e) => {
        e.category === domain;
      });
    } else {
    }
  };

  const [selectedTechStacks, setSelectedTechStack] = useState([]);

  const handleTechStackSelection = (id) => {
    setSelectedTechStack((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((stackId) => stackId !== id)
        : [...prevSelected, id]
    );
  };

  const techStacks = [
    { id: "react", name: "React", icon: "react-icon-path" },
    { id: "nodejs", name: "Node.js", icon: "nodejs-icon-path" },
    { id: "python", name: "Python", icon: "python-icon-path" },
    { id: "java", name: "Java", icon: "java-icon-path" },
    { id: "golang", name: "Go", icon: "golang-icon-path" },
    { id: "aws", name: "AWS", icon: "aws-icon-path" },
    { id: "docker", name: "Docker", icon: "docker-icon-path" },
    { id: "kubernetes", name: "Kubernetes", icon: "kubernetes-icon-path" },
    // Add more tech stacks as needed
  ];

  const profiles = [
    {
      id: 1,
      category: "Corporate Finance",
      name: "Corporate Finance",
      icon: FrontendIcon,
    },
    {
      id: 2,
      category: "Investment Banking",
      name: "Investment Banking",
      icon: FrontendIcon,
    },
    {
      id: 3,
      category: "Asset Management and Wealth Management",
      name: "Asset Management and Wealth Management",
      icon: FrontendIcon,
    },
    {
      id: 4,
      category: "Risk Management",
      name: "Risk Management",
      icon: FrontendIcon,
    },
    {
      id: 5,
      category: "Accounting and Auditing",
      name: "Accounting and Auditing",
      icon: FrontendIcon,
    },
    {
      id: 6,
      category: "Financial Advisory",
      name: "Financial Advisory",
      icon: FrontendIcon,
    },
    {
      id: 7,
      category: "Banking and Financial Services",
      name: "Banking and Financial Services",
      icon: FrontendIcon,
    },
    {
      id: 8,
      category: "Financial Technology (FinTech)",
      name: "Financial Technology (FinTech)",
      icon: FrontendIcon,
    },
    { id: 9, category: "Insurance", name: "Insurance", icon: FrontendIcon },
    {
      id: 10,
      category: "Real Estate Finance",
      name: "Real Estate Finance",
      icon: FrontendIcon,
    },
    {
      id: 11,
      category: "Treasury and Cash Management",
      name: "Treasury and Cash Management",
      icon: FrontendIcon,
    },
    {
      id: 12,
      category: "Quantitative Finance",
      name: "Quantitative Finance",
      icon: FrontendIcon,
    },
    {
      id: 13,
      category: "Compliance and Regulatory Roles",
      name: "Compliance and Regulatory Roles",
      icon: FrontendIcon,
    },
    {
      id: 14,
      category: "Financial Journalism and Research",
      name: "Financial Journalism and Research",
      icon: FrontendIcon,
    },
    { id: 15, category: "Taxation", name: "Taxation", icon: FrontendIcon },
  ];

  const [selectedWorkExperience, setSelectedWorkExperience] = useState(null);

  const workExperienceLevels = [
    { id: "junior", name: "Junior" },
    { id: "mid", name: "Mid-Level" },
    { id: "senior", name: "Senior" },
    { id: "lead", name: "Lead" },
    { id: "architect", name: "Architect" },
  ];

  const handleWorkExperienceSelection = (id) => {
    setSelectedWorkExperience(id);
  };

  // Sample data for job locations
  const jobLocations = [
    { id: 1, name: "New York, USA" },
    { id: 2, name: "London, UK" },
    { id: 3, name: "Singapore" },
    { id: 4, name: "Sydney, Australia" },
    { id: 5, name: "Dubai, UAE" },
    { id: 6, name: "Hong Kong" },
    { id: 7, name: "Frankfurt, Germany" },
  ];

  // Sample data for years of experience
  const yearsOfExperience = [
    { id: 1, name: "0-2 Years" },
    { id: 2, name: "3-5 Years" },
    { id: 3, name: "6-9 Years" },
    { id: 4, name: "10-15 Years" },
    { id: 5, name: "15+ Years" },
  ];

  // Sample data for key skills
  const keySkills = [
    { id: 1, name: "Financial Analysis" },
    { id: 2, name: "Investment Banking" },
    { id: 3, name: "Risk Management" },
    { id: 4, name: "Portfolio Management" },
    { id: 5, name: "Data Analysis" },
    { id: 6, name: "Compliance and Regulation" },
    { id: 7, name: "Mergers and Acquisitions (M&A)" },
    { id: 8, name: "Asset Management" },
    { id: 9, name: "Derivatives Trading" },
  ];

  

    // Toggle selection for job locations
    const handleJobLocationSelection = (id) => {
      setSelectedJobLocations((prevSelected) => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter((locationId) => locationId !== id);
        } else if (prevSelected.length < 5) {
          // Limit to 5 selections
          return [...prevSelected, id];
        } else {
          return prevSelected; // No more than 5 selections allowed
        }
      });
    };

    // Select years of experience (single selection)
    const handleYearsOfExperienceSelection = (id) => {
      setSelectedYearsOfExperience(id);
    };

    // Toggle selection for key skills
    const handleKeySkillsSelection = (id) => {
      setSelectedKeySkills((prevSelected) => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter((skillId) => skillId !== id);
        } else {
          return [...prevSelected, id];
        }
      });
    };

  return (
    <div className="h-screen w-full flex">
      <LoadingBar color="blue" progress={33.33 * (currentStep - 1)} />
      <div className="hidden md:flex flex-col gap-8 items-center justify-center w-1/3 bg-gray-50 p-8">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            {currentStep > 1 && (
              <Check className="bg-blue-800 p-1 h-6 w-6 rounded-full text-white" />
            )}
            <h3 className="ml-2 font-semibold text-2xl text-blue-800">
              Step 1
            </h3>
          </div>
          <p className="ml-8 text-xl">Choose your Domain.</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            {currentStep > 2 && (
              <Check className="bg-blue-800 p-1 h-6 w-6 rounded-full text-white" />
            )}
            <h3 className="ml-2 font-semibold text-2xl text-blue-800">
              Step 2
            </h3>
          </div>
          <p className="ml-8 text-xl">Enter your details.</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            {currentStep >= 3 && (
              <Check className="bg-blue-800 p-1 h-6 w-6 rounded-full text-white" />
            )}
            <h3 className="ml-2 font-semibold text-2xl text-blue-800">
              Step 3
            </h3>
          </div>
          <p className="ml-8  text-xl">Complete registration.</p>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-full px-6 md:px-20 flex items-center justify-center">
        {currentStep === 1 ? (
          <div className="flex flex-col items-center w-full max-w-[800px] h-[90vh] overflow-y-auto gap-6">
            <h1 className="text-xl font-semibold">
              Step 1: Choose your Domain.
            </h1>
            <p className="text-gray-600">
              Crack your next finance-interview with us
            </p>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search profile"
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto  p-5">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProcess(profile.id)}
                  className={`border-2 ${
                    selectedProcess === profile.id
                      ? "border-blue-600 "
                      : "border-gray-300"
                  } rounded-md cursor-pointer p-4 flex flex-col items-center`}
                >
                  <img
                    src={profile.icon}
                    alt={profile.name}
                    className="w-10 h-10 mb-2"
                  />
                  <h3 className="text-center text-lg font-semibold">
                    {profile.name}
                  </h3>
                </div>
              ))}
            </div>
            {/* <button
              onClick={handleNextStep}
              className="px-6 py-3 mt-6 text-white bg-blue-600 rounded-md"
            >
              Request now →
            </button> */}
          </div>
        ) : currentStep === 2 ? (
          <div className="flex flex-col items-center w-full max-w-[800px] h-auto gap-3">
            <h1 className="text-2xl font-bold">Mention your choices</h1>
            <p className="text-gray-600">
              This will help us to easily filter out and give you the best
              interview experience.
            </p>

            {/* Job Location Preferences Section */}
            <div className="w-full mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Select Job Location Preferences
              </h2>
              <p className="text-gray-600 mb-4">
                Choose up to 5 preferred job locations:
              </p>
              <div className="flex flex-wrap gap-4">
                {jobLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleJobLocationSelection(location.id)}
                    className={`border-2 ${
                      selectedJobLocations.includes(location.id)
                        ? "border-purple-400 bg-purple-100"
                        : "border-gray-300"
                    } rounded-md px-4 py-2 flex items-center justify-center cursor-pointer`}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Years of Experience Selection Section */}
            <div className="w-full mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Select Years of Experience
              </h2>
              <p className="text-gray-600 mb-4">
                Choose your years of experience:
              </p>
              <div className="flex flex-wrap gap-4">
                {yearsOfExperience.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => handleYearsOfExperienceSelection(year.id)}
                    className={`border-2 ${
                      selectedYearsOfExperience === year.id
                        ? "border-orange-400 bg-orange-100"
                        : "border-gray-300"
                    } rounded-md px-4 py-2 flex items-center justify-center cursor-pointer`}
                  >
                    {year.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Skills Selection Section */}
            <div className="w-full mt-6">
              <h2 className="text-lg font-semibold mb-2">Select Key Skills</h2>
              <p className="text-gray-600 mb-4">
                Choose the key skills relevant to the job you are looking for:
              </p>
              <div className="flex flex-wrap gap-4">
                {keySkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => handleKeySkillsSelection(skill.id)}
                    className={`border-2 ${
                      selectedKeySkills.includes(skill.id)
                        ? "border-green-400 bg-green-100"
                        : "border-gray-300"
                    } rounded-md px-4 py-2 flex items-center justify-center cursor-pointer`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="m-10 p-10 ">
            <SignupForm />
            <button
              onClick={handleSubmit}
              className="py-2 text-white bg-black font-bold w-full md:w-40 text-lg rounded-2xl"
            >
              Sign up
            </button>
          </div>
        )}

        <div className="absolute bottom-6 right-6 flex gap-4">
          {currentStep > 1 && currentStep !== 3 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-2xl"
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-2xl "
              // className="px-6 py-3 mt-6 text-white bg-blue-600 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
