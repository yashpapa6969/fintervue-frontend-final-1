import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import InterviewerSignupForm from "../components/forms/InterviewerSignupForm";
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
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [interviewerData, setInterviewerData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePic: "",
    resume: "",
    email: "",
    password: "",
    linkedInProfile: "",
    industryExpertise: [],
    availability: {
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


  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!interviewerData.email || !/\S+@\S+\.\S+/.test(interviewerData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!interviewerData.phoneNumber || !/^\d{10}$/.test(interviewerData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
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

  // Availability Selector for Days and Time Slots
  const AvailabilitySelector = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timeSlots = ["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

    const toggleDaySelection = (day) => {
      setSelectedDays((prev) => {
        const newSelection = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
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
        const newSelection = prev.includes(timeSlot) ? prev.filter((t) => t !== timeSlot) : [...prev, timeSlot];
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
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Select Days */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">Choose your available days</h2>
          <div className="grid grid-cols-3 gap-4">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDaySelection(day)}
                className={`px-3 py-2 rounded-md border-2 text-base font-medium transition-all duration-300 inline-block 
                  ${
                    selectedDays.includes(day)
                      ? "bg-blue-700 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } border-blue-700`}
                style={{ width: 'auto', whiteSpace: 'nowrap' }} // Adjusting button size to fit text
              >
                {day}
              </button>
            ))}
          </div>
        </div>


        {/* Select Time Slots */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">Choose your available time slots</h2>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => toggleTimeSlotSelection(slot)}
                className={`px-4 py-2 rounded-md border-2 text-base font-medium transition-all duration-300 transform ${
                  selectedTimeSlots.includes(slot)
                    ? "bg-blue-700 text-white border-blue-700 shadow-md"
                    : "bg-white text-gray-600 border-blue-700 hover:bg-gray-100 hover:scale-105"
                }`}
                style={{
                  transitionTimingFunction: 'ease-in-out',
                }} // Adding smooth transitions
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  };

  // Profile Categories
  const profiles = [
    { id: 1, category: "Corporate Finance", name: "Corporate Finance", icon: FrontendIcon1 },
    { id: 2, category: "Investment Banking", name: "Investment Banking", icon: FrontendIcon2 },
    { id: 3, category: "Asset Management and Wealth Management", name: "Asset Management and Wealth Management", icon: FrontendIcon3 },
    { id: 4, category: "Risk Management", name: "Risk Management", icon: FrontendIcon4 },
    { id: 5, category: "Accounting and Auditing", name: "Accounting and Auditing", icon: FrontendIcon5 },
    { id: 6, category: "Financial Advisory", name: "Financial Advisory", icon: FrontendIcon6 },
    { id: 7, category: "Banking and Financial Services", name: "Banking and Financial Services", icon: FrontendIcon7 },
    { id: 8, category: "Financial Technology (FinTech)", name: "Financial Technology (FinTech)", icon: FrontendIcon8 },
    { id: 9, category: "Insurance", name: "Insurance", icon: FrontendIcon9 },
    { id: 10, category: "Real Estate Finance", name: "Real Estate Finance", icon: FrontendIcon10 },
    { id: 11, category: "Treasury and Cash Management", name: "Treasury and Cash Management", icon: FrontendIcon11 },
    { id: 12, category: "Quantitative Finance", name: "Quantitative Finance", icon: FrontendIcon12 },
    { id: 13, category: "Compliance and Regulatory Roles", name: "Compliance and Regulatory Roles", icon: FrontendIcon13 },
    { id: 14, category: "Financial Journalism and Research", name: "Financial Journalism and Research", icon: FrontendIcon14 },
    { id: 15, category: "Taxation", name: "Taxation", icon: FrontendIcon15 },
  ];


  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Search input change
  const handleChange = (key, value) => {
    setInterviewerData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const canRegister = validateForm();
    if (!canRegister) return;

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
  
      {/* Left Sidebar */}
      <div className="hidden md:flex flex-col h-screen overflow-auto gap-8 items-center justify-center w-1/3 bg-gray-50 p-8">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            {currentStep > 1 && (
              <Check className="bg-blue-800 p-1 h-6 w-6 rounded-full text-white" />
            )}
            <h3 className="ml-2 font-semibold text-2xl text-blue-800">Step 1</h3>
          </div>
          <p className="ml-8 text-xl text-gray-600">Choose your Domain.</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            {currentStep > 2 && (
              <Check className="bg-blue-800 p-1 h-6 w-6 rounded-full text-white" />
            )}
            <h3 className="ml-2 font-semibold text-2xl text-blue-800">Step 2</h3>
          </div>
          <p className="ml-8 text-xl text-gray-600">Enter your details.</p>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="w-full md:w-2/3 mt-4 min-h-full px-6 md:px-20 flex items-center justify-center">
        {currentStep === 1 ? (
          <div className="flex flex-col items-center w-full max-w-[800px] h-[90vh] overflow-y-auto gap-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide">
              Step 1:{" "}
              <span className="text-blue-900">Choose your Domain</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light">
              Crack your next finance-interview with us
            </p>
  
            <div className="w-full">
              <input
                type="text"
                placeholder="Search Domain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border-2 border-blue-300 rounded-md focus:ring-4 focus:ring-blue-200 transition-all duration-300"
              />
            </div>
  
            <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto p-5">
              {filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => handleDomainSelection(profile.id)}
                  className={`border-2 ${
                    selectedProcesses.includes(profile.id)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } rounded-md cursor-pointer p-4 flex flex-col items-center transition-transform hover:scale-105`}
                >
                  <img
                    src={profile.icon}
                    alt={profile.name}
                    className="w-12 h-12 mb-2"
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-800">
                    {profile.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : currentStep === 2 ? (
          <div className="flex flex-col items-center w-full max-w-[800px] h-full overflow-y-auto gap-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-extrabold text-blue-700 tracking-wide">
                Complete your <span className="text-blue-900">Fintervue Profile</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-500 font-light">
                Search & apply to finance jobs from here
              </p>
            </div>
  
            {/* Availability Selector */}
            <div className="w-full">
              <AvailabilitySelector />
            </div>
  
            {/* Signup Form */}
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
  
        {/* Bottom Navigation */}
        <div className="fixed bottom-6 right-6 flex gap-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="py-3 px-4 text-blue-500 border bg-white border-blue-500 w-full md:w-40 text-lg rounded-2xl transition-transform hover:scale-105"
            >
              Back
            </button>
          )}
          {currentStep < 2 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="py-3 px-4 text-white bg-blue-700 font-bold w-full md:w-40 text-lg rounded-2xl transition-transform hover:scale-105"
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="py-3 px-4 text-white bg-blue-700 font-bold w-full md:w-40 text-lg rounded-2xl flex items-center justify-center gap-4 transition-transform hover:scale-105"
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
