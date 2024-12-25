import SignupForm from "../components/forms/SignupForm";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
import { useToast } from "@chakra-ui/react";
import { signUpFlow } from "../lib/services/candidate.auth";
import { useUser } from "../context/UserProvider";

const SignupPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [selectedYearsOfExperience, setSelectedYearsOfExperience] =
        useState(null);
    const [selectedKeySkills, setSelectedKeySkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [candidateData, setCandidateData] = useState({
        firstName: "",
        lastName: "",
        profilePic: null,
        resume: null,
        email: "",
        password: "",
        linkedInProfile: "",
        city: "",
        preferredCity: "",
        currentEmploymentStatus: "",
        expectedCompensation: null,
        skills: [""],
        preferredJobRoles: [""],
        industry: "",
        profileVisibility: true,
        anonymized: false,
        interviewScores: [],
    });

    const handleChange = (key, value) => {
        if (key === "resume" || key === "profilePic") {
            setCandidateData((prevData) => ({
                ...prevData,
                [key]: value instanceof FileList ? value[0] : value,
            }));
        } else {
            setCandidateData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        }
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
        {
            id: 9,
            category: "Insurance",
            name: "Insurance",
            icon: FrontendIcon9,
        },
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
        {
            id: 15,
            category: "Taxation",
            name: "Taxation",
            icon: FrontendIcon15,
        },
    ];

    const filteredProfiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const jobLocations = [
        { id: 1, name: "Bangalore, India" },
        { id: 2, name: "Mumbai, India" },
        { id: 3, name: "Hyderabad, India" },
        { id: 4, name: "Pune, India" },
        { id: 5, name: "Delhi, India" },
        { id: 6, name: "Gurugram, India" },
        { id: 7, name: "Kolkata, India" },
    ];

    const yearsOfExperience = [
        { id: 1, name: "0-2 Years" },
        { id: 2, name: "3-5 Years" },
        { id: 3, name: "6-9 Years" },
        { id: 4, name: "10-15 Years" },
        { id: 5, name: "15+ Years" },
    ];

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

    const handleYearsOfExperienceSelection = (id) => {
        setSelectedYearsOfExperience(id);
    };

    const handleKeySkillsSelection = (id) => {
        setSelectedKeySkills((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((skillId) => skillId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const canRegister =
        !!candidateData.email &&
        !!candidateData.password &&
        !!candidateData.firstName &&
        !!candidateData.lastName &&
        !!candidateData.linkedInProfile &&
        !!candidateData.resume;

    const handleNextStep = () => {
        if (
            (currentStep === 1 && !selectedProcess) ||
            (currentStep === 2 && !selectedYearsOfExperience) ||
            (currentStep === 2 && selectedKeySkills.length === 0)
        ) {
            toast({
                title: "Incomplete Selection",
                description:
                    "Please make a selection before proceeding to the next step.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

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
            setLoading(true);
            const formData = new FormData();
            Object.keys(candidateData).forEach((key) => {
                if (key !== "resume" && key !== "profilePic") {
                    formData.append(key, candidateData[key]);
                }
            });

            if (candidateData.resume)
                formData.append("resume", candidateData.resume);
            if (candidateData.profilePic)
                formData.append("profilePic", candidateData.profilePic);

            formData.append("skills", JSON.stringify(selectedKeySkills));

            // new sign up flow:
            // 1.Sign up to the /auth endpoint occupied by supertokens on the backend
            // 2.Sending a email address and password
            // 3.Check to see if email alread exists
            // 4.On signup success, send a login request with the same credentials
            // 5.Send the data over to the register interviewee endpoint
            // 6.Receive the token as cookies
            // 7.Receive user data after login and share via context across the app and store in localStorage
            // 8.Protected Routes
            // 9.Hey username!

            const interviewee = await signUpFlow(
                candidateData.email,
                candidateData.password,
                formData
            );

            if (interviewee) {
                console.log(interviewee);
                setUser({
                    type: "interviewee",
                    user: interviewee,
                });

                toast({
                    title: "Welcome",
                    description: "Successfully registered interviewee.",
                    variant: "top-accent",
                    status: "success",
                    isClosable: true,
                });

                navigate("/display");
            }

            toast({
                title: "Welcome",
                description: "Successfully registered interviewee.",
                variant: "top-accent",
                status: "success",
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "top-accent",
                status: "error",
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center w-full h-full min-h-screen p-4 overflow-auto bg-gray-50">
            {/* Main Content */}
            <div className="w-full max-w-[1200px] flex flex-col items-center justify-center bg-white shadow-xl p-8 rounded-lg">
                <LoadingBar color="blue" progress={33.33 * (currentStep - 1)} />

                {currentStep === 1 ? (
                    <div className="flex flex-col items-center w-full gap-6">
                        <h1 className="text-3xl font-extrabold text-blue-700 md:text-4xl">
                            Step 1:{" "}
                            <span className="text-blue-900">
                                Choose your Domain
                            </span>
                        </h1>
                        <p className="text-lg font-light text-gray-500 md:text-xl">
                            Crack your next finance-interview with us
                        </p>

                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Search Domain"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 transition-all border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="grid w-full grid-cols-2 gap-6 p-5 sm:grid-cols-3 md:grid-cols-4">
                            {filteredProfiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    onClick={() =>
                                        setSelectedProcess(profile.id)
                                    }
                                    className={`border-2 ${
                                        selectedProcess === profile.id
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200"
                                    } rounded-lg cursor-pointer p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-md`}
                                >
                                    <img
                                        src={profile.icon}
                                        alt={profile.name}
                                        className="w-12 h-12 mb-2"
                                    />
                                    <h3 className="text-sm font-semibold text-center text-gray-800 md:text-lg">
                                        {profile.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : currentStep === 2 ? (
                    <div className="flex flex-col items-center w-full gap-6 pb-24 mt-12">
                        <div className="space-y-2 text-center">
                            <h3 className="text-4xl font-extrabold tracking-wide text-blue-700">
                                Mention your Choices
                            </h3>
                            <p className="text-lg font-light text-gray-500">
                                This will help us provide the best interview
                                experience.
                            </p>
                        </div>

                        <div className="w-full">
                            <h2 className="mb-3 text-xl font-semibold">
                                Select Job Location Preferences
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {jobLocations.map((location) => (
                                    <button
                                        key={location.id}
                                        onClick={() =>
                                            handleChange(
                                                "preferredCity",
                                                location.id
                                            )
                                        }
                                        className={`border-2 px-5 py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                                            candidateData.preferredCity ===
                                            location.id
                                                ? "border-purple-500 bg-purple-100 text-purple-700"
                                                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {location.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <h2 className="mb-3 text-xl font-semibold">
                                Select Years of Experience
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {yearsOfExperience.map((year) => (
                                    <button
                                        key={year.id}
                                        onClick={() =>
                                            handleYearsOfExperienceSelection(
                                                year.id
                                            )
                                        }
                                        className={`border-2 px-5 py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                                            selectedYearsOfExperience ===
                                            year.id
                                                ? "border-orange-500 bg-orange-100 text-orange-700"
                                                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {year.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <h2 className="mb-3 text-xl font-semibold">
                                Select Key Skills
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {keySkills.map((skill) => (
                                    <button
                                        key={skill.id}
                                        onClick={() =>
                                            handleKeySkillsSelection(skill.id)
                                        }
                                        className={`border-2 px-5 py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                                            selectedKeySkills.includes(skill.id)
                                                ? "border-green-500 bg-green-100 text-green-700"
                                                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {skill.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : currentStep === 3 ? (
                    <div className="flex flex-col items-center w-full gap-6">
                        <div className="space-y-2 text-center">
                            <h3 className="text-3xl font-extrabold text-blue-700 md:text-4xl">
                                Complete your{" "}
                                <span className="text-blue-900">
                                    Fintervue Profile
                                </span>
                            </h3>
                            <p className="text-lg font-light text-gray-500 md:text-xl">
                                Search & apply to finance jobs from here
                            </p>
                        </div>

                        <div className="w-full max-w-[800px]">
                            <SignupForm
                                formData={candidateData}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                ) : null}

                <div className="fixed flex gap-4 px-4 bottom-6 right-6 w-15 md:w-auto md:px-0">
                    {currentStep > 1 && (
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="w-full px-4 py-3 text-lg text-blue-500 transition-transform bg-white border border-blue-500 md:w-40 rounded-2xl hover:scale-105"
                        >
                            Back
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button
                            onClick={handleNextStep}
                            className="w-full px-4 py-3 text-lg font-bold text-white transition-transform bg-blue-700 md:w-40 rounded-2xl hover:scale-105"
                        >
                            Next
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="flex items-center justify-center w-full gap-4 py-3 text-lg font-bold text-white transition-transform bg-blue-700 md:w-40 rounded-2xl hover:scale-105"
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

export default SignupPage;
