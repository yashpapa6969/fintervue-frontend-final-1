import { useState } from "react";
import NumberTicker from "../components/ui/number-ticker";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupOrg = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [recruiterData, setRecruiterData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    jobTitle: "",
    industry: "",
    location: "",
    activeJobPostings: [],  // Array of job posting ids
    subscriptionStatus: "", // Free, Premium, Eterprise
    accountCreatedAt: null,
    lastLogin: new Date(),
  });

  const canRegister = !!recruiterData.email
    && !!recruiterData.password
    && !!recruiterData.firstName
    && !!recruiterData.lastName
  // && !!recruiterData.linkedInProfile
  // && !!recruiterData.resume;

  const handleChange = (key, value) => {
    setRecruiterData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(recruiterData);
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
      const result = await axios.post("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/recruiter/createRecruiter", recruiterData);
      if (result.status === 201) {
        toast({
          title: "Welcome",
          description: "Successfully registered recruiter.",
          variant: "top-accent",
          status: "success",
          isClosable: true,
        });
        navigate("/");
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
      setLoading(false);
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
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Our clients</h2>
        <p className="text-gray-600 mb-6">
          Hire the fresh talents in the field of finance
        </p>
        <div className="flex flex-wrap items-center space-x-6">
          {/* <img src="client-logo-1.png" alt="HTC" className="h-10" />
          <img src="client-logo-2.png" alt="ANSR" className="h-10" />
          <img src="client-logo-3.png" alt="First Meridian" className="h-10" />
          <img src="client-logo-4.png" alt="Rakuten" className="h-10" />
          <img src="client-logo-5.png" alt="Allegis Group" className="h-10" /> */}

          <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} />
          </p>
          <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} />
          </p>
          <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} />
          </p>
          <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} />
          </p>
        </div>
        <a href="#" className="mt-6 text-blue-500">
          View all success stories →
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Signup as organisation
          </h2>
          <button className="w-full py-2 mb-4 bg-white text-black border border-gray-300 rounded-md flex items-center justify-center">
            <img src="google-logo.png" alt="Google" className="h-5 w-5 mr-2" />
            Continue with your work email
          </button>
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <form>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                value={recruiterData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                value={recruiterData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="Work email"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              value={recruiterData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <div className="flex items-center mb-4">
              <div className="flex items-center border border-gray-300 rounded-md mr-2">
                <img
                  src="india-flag.png"
                  alt="India"
                  className="h-5 w-5 ml-2"
                />
                <span className="px-2 text-gray-600">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={recruiterData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              value={recruiterData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full py-2 bg-black text-white rounded-md flex items-center justify-center gap-4"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Create an accout"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Login into your account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupOrg;
