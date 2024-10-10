import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import InterviewerSignupForm from "../components/forms/InterViewerSignupForm";
import {
  FrontendIcon1,
  FrontendIcon2,
  FrontendIcon3,
  FrontendIcon4,
  FrontendIcon5,
  FrontendIcon6,
  FrontendIcon7,
  FrontendIcon8,
  FrontendIcon9,
  FrontendIcon10,
  FrontendIcon11,
  FrontendIcon12,
  FrontendIcon13,
  FrontendIcon14,
  FrontendIcon15,
} from "../assests/Domain_images";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterviewerSignupPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedProcess, setSelectedProcess] = useState("");
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [interviewerData, setInterviewerData] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
    resume: "",
    email: "",
    password: "",
    linkedInProfile: "",
    industryExpertise: [],
    availability:
    // "",
     {
      availableDays: [],
      availableTimeSlots: [],
    },
  });
  const [errors, setErrors] = useState({});

  const handleDomainSelection = (profileId) => {
    setSelectedProcesses((prevSelected) => {
      if (prevSelected.includes(profileId)) {
        // If already selected, remove it
        const updatedSelections = prevSelected.filter((id) => id !== profileId);
        updateIndustryExpertise(updatedSelections);
        return updatedSelections;
      } else {
        // If not selected, add it
        const updatedSelections = [...prevSelected, profileId];
        updateIndustryExpertise(updatedSelections);
        return updatedSelections;
      }
    });
  };

  // Update interviewer data with selected domains
  const updateIndustryExpertise = (updatedSelections) => {
    const selectedDomains = profiles
      .filter((profile) => updatedSelections.includes(profile.id))
      .map((profile) => profile.name);

    setInterviewerData((prevData) => ({
      ...prevData,
      industryExpertise: selectedDomains,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!interviewerData.email || !/\S+@\S+\.\S+/.test(interviewerData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!interviewerData.linkedInProfile) {
      newErrors.linkedInProfile = "Please enter a valid LinkedIn profile.";
      isValid = false;
    }
    if (!interviewerData.firstName) {
      newErrors.firstName = "Please enter your first name.";
      isValid = false;
    }
    if (!interviewerData.lastName) {
      newErrors.lastName = "Please enter your last name.";
      isValid = false;
    }
    if (!interviewerData.password) {
      newErrors.password = "Please enter your password.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const AvailabilitySelector = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const timeSlots = [
      "12:00 AM",
      "3:00 AM",
      "6:00 AM",
      "9:00 AM",
      "12:00 PM",
      "3:00 PM",
      "6:00 PM",
      "9:00 PM",
    ];

    const toggleDaySelection = (day) => {
      setSelectedDays((prev) => {
        const newSelection = prev.includes(day)
          ? prev.filter((d) => d !== day)
          : [...prev, day];

        
        setInterviewerData((prevData) => ({
          ...prevData,
          availability: {
            ...prevData.availability,
            availableDays: newSelection,
          },
        }));

        return newSelection;
      });
    };

    const toggleTimeSlotSelection = (timeSlot) => {
      setSelectedTimeSlots((prev) => {
        const newSelection = prev.includes(timeSlot)
          ? prev.filter((t) => t !== timeSlot)
          : [...prev, timeSlot];

        
        setInterviewerData((prevData) => ({
          ...prevData,
          availability: {
            ...prevData.availability,
            availableTimeSlots: newSelection,
          },
        }));

        return newSelection;
      });
    };

    return (
      <div className="flex flex-row items-center gap-8">
        {/* Select Days */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">
            Choose your available days
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDaySelection(day)}
                className={`py-2 px-4 rounded-md border ${
                  selectedDays.includes(day)
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Select Time Slots */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            Choose your available time slots
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => toggleTimeSlotSelection(slot)}
                className={`py-2 px-4 rounded-md border ${
                  selectedTimeSlots.includes(slot)
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const profiles = [
    {
      id: 1,
      category: "Corporate Finance",
      name: "Corporate Finance",
      icon: FrontendIcon1,
    },
    {
      id: 2,
      category: "Investment Banking",
      name: "Investment Banking",
      icon: FrontendIcon2,
    },
    {
      id: 3,
      category: "Asset Management and Wealth Management",
      name: "Asset Management and Wealth Management",
      icon: FrontendIcon3,
    },
    {
      id: 4,
      category: "Risk Management",
      name: "Risk Management",
      icon: FrontendIcon4,
    },
    {
      id: 5,
      category: "Accounting and Auditing",
      name: "Accounting and Auditing",
      icon: FrontendIcon5,
    },
    {
      id: 6,
      category: "Financial Advisory",
      name: "Financial Advisory",
      icon: FrontendIcon6,
    },
    {
      id: 7,
      category: "Banking and Financial Services",
      name: "Banking and Financial Services",
      icon: FrontendIcon7,
    },
    {
      id: 8,
      category: "Financial Technology (FinTech)",
      name: "Financial Technology (FinTech)",
      icon: FrontendIcon8,
    },
    { id: 9, category: "Insurance", name: "Insurance", icon: FrontendIcon9 },
    {
      id: 10,
      category: "Real Estate Finance",
      name: "Real Estate Finance",
      icon: FrontendIcon10,
    },
    {
      id: 11,
      category: "Treasury and Cash Management",
      name: "Treasury and Cash Management",
      icon: FrontendIcon11,
    },
    {
      id: 12,
      category: "Quantitative Finance",
      name: "Quantitative Finance",
      icon: FrontendIcon12,
    },
    {
      id: 13,
      category: "Compliance and Regulatory Roles",
      name: "Compliance and Regulatory Roles",
      icon: FrontendIcon13,
    },
    {
      id: 14,
      category: "Financial Journalism and Research",
      name: "Financial Journalism and Research",
      icon: FrontendIcon14,
    },
    { id: 15, category: "Taxation", name: "Taxation", icon: FrontendIcon15 },
  ];

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (key, value) => {
    setInterviewerData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const canRegister = validateForm();
    if (!canRegister) {
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        "https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewer/AddInterviewer",
        interviewerData
      );
      if (result.status === 201) {
        toast({
          title: "Welcome",
          description: "Successfully registered interviewer.",
          variant: "top-accent",
          status: "success",
          isClosable: true,
        });
        console.log(interviewerData);
        navigate("/product");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: `${error.message}`,
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
      return;
    }
    setLoading(false);
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "top-accent",
      status: "error",
      isClosable: true,
    });
  };

  return (
    <div className="h-full overflow-auto w-full flex items-start">
      <LoadingBar color="blue" progress={33.33 * (currentStep - 1)} />
      <div className="hidden md:flex flex-col h-screen overflow-auto gap-8 items-center justify-center w-1/3  bg-gray-50 p-8">
        <div className="w-full flex flex-col gap-4 ">
          <div className="flex items-center ">
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
      </div>

      <div className="w-full md:w-2/3 mt-4 min-h-full px-6 md:px-20 flex items-center justify-center">
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
                placeholder="Search Domain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto p-5">
              {filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => handleDomainSelection(profile.id)}
                  className={`border-2 ${
                    selectedProcesses.includes(profile.id)
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
          </div>
        ) : currentStep === 2 ? (
          <div className="flex flex-col items-center w-full max-w-[800px] h-full overflow-y-auto gap-6">
            <div className="flex flex-col text-center pb-5">
              <h3 className="font-bold text-2xl md:text-3xl text-[rgba(51,51,51,1)] ">
                Complete your Fintervue Profile
              </h3>
              <p className="font-extralight text-md md:text-md pt-3">
                Search & apply to finance jobs from here
              </p>
            </div>

            <div className="w-full ">
              <AvailabilitySelector />
            </div>

            <InterviewerSignupForm
              formData={interviewerData}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
        ) : (
          <div>
            <h1></h1>
          </div>
        )}

        <div className="fixed bottom-6 right-6 flex gap-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="py-3 text-blue-500 border bg-white border-blue-500 w-full md:w-40 text-lg rounded-2xl"
            >
              Back
            </button>
          )}
          {currentStep < 2 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-2xl "
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-2xl flex items-center justify-center gap-4"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewerSignupPage;
