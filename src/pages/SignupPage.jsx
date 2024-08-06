import { Check } from "lucide-react"
import SignupForm from "../components/forms/SignupForm"
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedProcess, setSelectedProcess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        setCurrentStep(3);
        // TODO: handle signup
        console.log("Not implemented");
        navigate("/");
    }

    return (
        <div className="h-screen w-full">
            <LoadingBar
                color='blue'
                progress={33.33 * (currentStep-1)}
            />
            <div className="flex flex-col md:flex-row w-full h-full justify-between">
                <div className="hidden md:flex flex-col gap-8 items-center justify-center w-1/3 h-full">
                    <div className="w-1/2">
                        <div className="flex gap-2 items-center">
                            {currentStep > 1 &&
                                <Check className="bg-green-300 items-center justify-center p-1 h-6 w-6 rounded-full text-white" />}
                            <h3 className="font-semibold text-lg">Step 1</h3>
                        </div>
                        <p className="">
                            Choose how you want to register.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <div className="flex gap-2 items-center">
                            {currentStep > 2 &&
                                <Check className="bg-green-300 items-center justify-center p-1 h-6 w-6 rounded-full text-white" />}
                            <h3 className="font-semibold text-lg">Step 2</h3>
                        </div>
                        <p className="">
                            Enter your details.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <div className="flex gap-2 items-center">
                            {currentStep > 3 &&
                                <Check className="bg-green-300 items-center justify-center p-1 h-6 w-6 rounded-full text-white" />}
                            <h3 className="font-semibold text-lg">Step 3</h3>
                        </div>
                        <p className="">
                            Choose how you want to register.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 h-full px-6 md:px-20 relative">
                    <div className="w-full h-full flex items-center justify-center">
                        {currentStep === 1 ?
                            <div className="flex flex-col w-full max-w-[500px] gap-4 items-center justify-center">
                                <div onClick={() => setSelectedProcess("interviewer")} className={`w-full border-2 transition-all ${selectedProcess === "interviewer" ? "border-green-400" : "border-gray-300"} rounded-md cursor-pointer p-4`}>
                                    <h3>Interviewer</h3>
                                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, omnis!</p>
                                </div>
                                <div onClick={() => setSelectedProcess("interviewee")} className={`w-full border-2 transition-all ${selectedProcess === "interviewee" ? "border-green-400" : "border-gray-300"} rounded-md cursor-pointer p-4`}>
                                    <h3>Interviewee</h3>
                                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, omnis!</p>
                                </div>
                                <div onClick={() => setSelectedProcess("recruiter")} className={`w-full border-2 transition-all ${selectedProcess === "recruiter" ? "border-green-400" : "border-gray-300"} rounded-md cursor-pointer p-4`}>
                                    <h3>Recruiter</h3>
                                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, omnis!</p>
                                </div>
                            </div>
                            : currentStep === 2 ?
                                <SignupForm />
                                : (
                                    <button
                                        onClick={handleSubmit}
                                        className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-lg disabled:opacity-[25%] disabled:bg-[rgba(17,17,17,1)]"
                                    >
                                        Sign up
                                    </button>
                                )
                        }
                    </div>
                    <div className="absolute bottom-6 w-1/2 right-6 md:right-20 flex justify-end gap-4">
                        {currentStep > 1 && (
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 self-end text-lg rounded-lg disabled:opacity-[25%] disabled:bg-[rgba(17,17,17,1)]"
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 self-end text-lg rounded-lg disabled:opacity-[25%] disabled:bg-[rgba(17,17,17,1)]"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage