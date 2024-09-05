import { useState } from "react";
import { Check } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import InterviewerSignupForm from "../components/forms/InterViewerSignupForm";
import { FrontendIcon1, FrontendIcon2, FrontendIcon3, FrontendIcon4, FrontendIcon5, FrontendIcon6, FrontendIcon7, FrontendIcon8, FrontendIcon9, FrontendIcon10, FrontendIcon11, FrontendIcon12, FrontendIcon13, FrontendIcon14, FrontendIcon15} from "../assests/Domain_images";

import axios from "axios";

const InterviewerSignupPage = () => {
    const toast = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedProcess, setSelectedProcess] = useState("");

    const [interviewerData, setInterviewerData] = useState({
        firstName: "",
        lastName: "",
        interviewer_id: "",
        profilePic: "",
        resume: "",
        email: "",
        password: "",
        linkedInProfile: "",
        industryExpertise: "",
        availability: "",
        interviewsConducted: []
    });

    const techStacks = [
        { id: "react", name: "React", icon: "react-icon-path" },
        { id: "nodejs", name: "Node.js", icon: "nodejs-icon-path" },
        { id: "python", name: "Python", icon: "python-icon-path" },
        { id: "java", name: "Java", icon: "java-icon-path" },
        { id: "golang", name: "Go", icon: "golang-icon-path" },
        { id: "aws", name: "AWS", icon: "aws-icon-path" },
        { id: "docker", name: "Docker", icon: "docker-icon-path" },
        { id: "kubernetes", name: "Kubernetes", icon: "kubernetes-icon-path" },
    ];

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

    const canRegister = !!interviewerData.email 
                        && !!interviewerData.password 
                        && !!interviewerData.firstName 
                        && !!interviewerData.lastName 
                        && !!interviewerData.linkedInProfile
                        && !!interviewerData.resume;
    
    const handleChange = (key, value) => {
        setInterviewerData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleSubmit = async () => {
        if (!canRegister) {
            toast({
                title: "Error",
                description: "Please fill in all the required fields.",
                variant: "top-accent",
                status: "error",
                isClosable: true,
            });
            return;
        }
        try {
            const result = await axios.post("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewer/AddInterviewer", interviewerData);
            if (result.status === 201) {
                toast({
                    title: "Welcome",
                    description: "Successfully registered interviewer.",
                    variant: "top-accent",
                    status: "success",
                    isClosable: true,
                });
                return;
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "top-accent",
                status: "error",
                isClosable: true,
            });
            return;
        }
        toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "top-accent",
            status: "error",
            isClosable: true,
        });
    }


    return (
        <div className="h-screen w-full flex items-start">
            <LoadingBar color="blue" progress={33.33 * (currentStep - 1)} />
            <div className="hidden md:flex flex-col h-full gap-8 items-center justify-center w-1/3 bg-gray-50 p-8">
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
                                placeholder="Search profile"
                                className="w-full p-3 border-2 border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto  p-5">
                            {profiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    onClick={() => setSelectedProcess(profile.id)}
                                    className={`border-2 ${selectedProcess === profile.id
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
                    <div className="flex flex-col items-center w-full max-w-[800px] h-[90vh] overflow-y-auto gap-6">
                        <h1 className="text-xl font-semibold">Industry Expertise</h1>
                        <p className="text-gray-600">
                            Choose your expertise:
                        </p>
                        <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto">
                            {techStacks.map((stack) => (
                                <div
                                    key={stack.id}
                                    onClick={() => handleChange("industryExpertise", stack.id)}
                                    className={`border-2 ${interviewerData.industryExpertise.includes(stack.id)
                                        ? "border-green-400 bg-green-100"
                                        : "border-gray-300"
                                        } rounded-md cursor-pointer p-4 flex flex-col items-center`}
                                >
                                    <img
                                        src={stack.icon}
                                        alt={stack.name}
                                        className="w-10 h-10 mb-2"
                                    />
                                    <h3 className="text-center">{stack.name}</h3>
                                </div>
                            ))}
                        </div>

                        <div className="w-full mt-6">
                            <h2 className="text-lg font-semibold mb-2">
                                Availability
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Choose when you will be available for work:
                            </p>
                            <input
                                onChange={(e) => handleChange("availability", e.target.value)}
                                value={interviewerData.availability}
                                type="date"
                                placeholder="Start Date"
                                className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <InterviewerSignupForm formData={interviewerData} handleChange={handleChange} />
                        <button
                            onClick={handleSubmit}
                            className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-2xl"
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

export default InterviewerSignupPage;
