import { Check } from "lucide-react";
import SignupForm from "../components/forms/SignupForm";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { useAccordion } from "@chakra-ui/react";

import FrontendIcon1 from "../assests/Domain_images/Accounting.png";
import FrontendIcon2 from "../assests/Domain_images/Asset_Management.png";
import FrontendIcon3 from "../assests/Domain_images/Banking.png";
import FrontendIcon4 from "../assests/Domain_images/Cash Management.png";
import FrontendIcon5 from "../assests/Domain_images/Corporate Finance.png";
import FrontendIcon6 from "../assests/Domain_images/Financial Advisory.png";
import FrontendIcon7 from "../assests/Domain_images/Financial Technology.png";
import FrontendIcon8 from "../assests/Domain_images/insurance.png";
import FrontendIcon9 from "../assests/Domain_images/Investment Banking.png";
import FrontendIcon10 from "../assests//Domain_images/quantitative.png";
import FrontendIcon11 from "../assests/Domain_images/Real Estate Finance.png";
import FrontendIcon12 from "../assests/Domain_images/Regulatory Roles.png";
import FrontendIcon13 from "../assests/Domain_images/Research.png";
import FrontendIcon14 from "../assests/Domain_images/Risk Management.png";
import FrontendIcon15 from "../assests/Domain_images/taxation.png";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProcess, setSelectedProcess] = useState("");

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
    domain:null,
    financeProfiles:null

  });
  const handleDomain = (domain) => {
      setData((prev) => ({
        ...prev,
        domain: domain,
      }));
    };
  const handleRole = ()=>{
    if (domain!==null) {
      return financeProfiles.filter((e) =>{e.category === domain});
    } else {
      
    }
  }
  
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

// const financeProfiles = [
//   {
//     id: 1, // Corresponds to Corporate Finance
//     category: "Corporate Finance",
//     roles: [
//       { title: "Chief Financial Officer (CFO)" },
//       { title: "Finance Director" },
//       { title: "Financial Controller" },
//       { title: "Treasury Manager" },
//       { title: "Corporate Treasurer" },
//       { title: "Financial Analyst" },
//       { title: "Cost Analyst" },
//       { title: "Budget Analyst" },
//       { title: "Mergers and Acquisitions (M&A) Analyst/Manager" },
//       { title: "Investor Relations Manager" },
//       { title: "Internal Auditor" },
//       { title: "Risk Manager" },
//       { title: "Capital Budgeting Manager" },
//       { title: "Tax Manager" },
//       { title: "Finance Business Partner" },
//       { title: "Strategic Planning Manager" },
//     ],
//   },
//   {
//     id: 2, // Corresponds to Investment Banking
//     category: "Investment Banking",
//     roles: [
//       { title: "Investment Banker" },
//       { title: "Mergers & Acquisitions (M&A) Analyst" },
//       { title: "Equity Research Analyst" },
//       { title: "Corporate Finance Analyst" },
//       { title: "Debt Capital Markets Analyst" },
//       { title: "Leveraged Finance Analyst" },
//       { title: "Investment Banking Associate/Analyst" },
//       { title: "Private Equity Analyst" },
//       { title: "Venture Capital Analyst" },
//       { title: "Structured Finance Analyst" },
//       { title: "Syndicated Loans Analyst" },
//     ],
//   },
//   {
//     id: 3, // Corresponds to Asset Management and Wealth Management
//     category: "Asset Management and Wealth Management",
//     roles: [
//       { title: "Portfolio Manager" },
//       { title: "Asset Manager" },
//       { title: "Wealth Manager" },
//       { title: "Investment Analyst" },
//       { title: "Fund Manager" },
//       { title: "Research Analyst" },
//       { title: "Financial Planner" },
//       { title: "Private Wealth Advisor" },
//       { title: "Client Relationship Manager" },
//       { title: "Performance Analyst" },
//     ],
//   },
//   {
//     id: 4, // Corresponds to Risk Management
//     category: "Risk Management",
//     roles: [
//       { title: "Risk Analyst" },
//       { title: "Credit Risk Analyst" },
//       { title: "Market Risk Analyst" },
//       { title: "Operational Risk Manager" },
//       { title: "Enterprise Risk Manager" },
//       { title: "Quantitative Risk Analyst" },
//       { title: "Liquidity Risk Manager" },
//       { title: "Compliance Officer" },
//       { title: "Fraud Analyst" },
//     ],
//   },
//   {
//     id: 5, // Corresponds to Accounting and Auditing
//     category: "Accounting and Auditing",
//     roles: [
//       { title: "Certified Public Accountant (CPA)" },
//       { title: "Management Accountant" },
//       { title: "Financial Accountant" },
//       { title: "Tax Accountant" },
//       { title: "Auditor" },
//       { title: "Internal Auditor" },
//       { title: "Forensic Accountant" },
//       { title: "Accounts Payable/Receivable Clerk" },
//       { title: "Bookkeeper" },
//       { title: "Payroll Specialist" },
//       { title: "Compliance Auditor" },
//     ],
//   },
//   {
//     id: 6, // Corresponds to Financial Advisory
//     category: "Financial Advisory",
//     roles: [
//       { title: "Financial Advisor" },
//       { title: "Certified Financial Planner (CFP)" },
//       { title: "Estate Planner" },
//       { title: "Retirement Planning Advisor" },
//       { title: "Insurance Advisor" },
//       { title: "Tax Advisor" },
//       { title: "Wealth Management Advisor" },
//       { title: "Pension Fund Advisor" },
//     ],
//   },
//   {
//     id: 7, // Corresponds to Banking and Financial Services
//     category: "Banking and Financial Services",
//     roles: [
//       { title: "Commercial Banker" },
//       { title: "Retail Banker" },
//       { title: "Credit Analyst" },
//       { title: "Loan Officer" },
//       { title: "Mortgage Banker" },
//       { title: "Branch Manager" },
//       { title: "Personal Banker" },
//       { title: "Bank Teller" },
//       { title: "Relationship Manager" },
//       { title: "Treasury Analyst" },
//       { title: "Financial Services Representative" },
//     ],
//   },
//   {
//     id: 8, // Corresponds to Financial Technology (FinTech)
//     category: "Financial Technology (FinTech)",
//     roles: [
//       { title: "Financial Data Analyst" },
//       { title: "Quantitative Analyst (Quant)" },
//       { title: "Blockchain Analyst" },
//       { title: "FinTech Product Manager" },
//       { title: "FinTech Developer" },
//       { title: "Robo-Advisor Specialist" },
//       { title: "Cryptocurrency Analyst" },
//       { title: "Payment Solutions Analyst" },
//     ],
//   },
//   {
//     id: 9, // Corresponds to Insurance
//     category: "Insurance",
//     roles: [
//       { title: "Actuary" },
//       { title: "Insurance Underwriter" },
//       { title: "Claims Adjuster" },
//       { title: "Insurance Broker" },
//       { title: "Risk Assessor" },
//       { title: "Insurance Agent" },
//       { title: "Reinsurance Analyst" },
//       { title: "Compliance Officer" },
//     ],
//   },
//   {
//     id: 10, // Corresponds to Real Estate Finance
//     category: "Real Estate Finance",
//     roles: [
//       { title: "Real Estate Analyst" },
//       { title: "Property Manager" },
//       { title: "Real Estate Appraiser" },
//       { title: "Real Estate Investment Analyst" },
//       { title: "Real Estate Finance Manager" },
//       { title: "Mortgage Underwriter" },
//       { title: "Loan Originator" },
//     ],
//   },
//   {
//     id: 11, // Corresponds to Treasury and Cash Management
//     category: "Treasury and Cash Management",
//     roles: [
//       { title: "Treasury Analyst" },
//       { title: "Cash Manager" },
//       { title: "Liquidity Manager" },
//       { title: "Treasury Operations Manager" },
//       { title: "Foreign Exchange Manager" },
//     ],
//   },
//   {
//     id: 12, // Corresponds to Quantitative Finance
//     category: "Quantitative Finance",
//     roles: [
//       { title: "Quantitative Analyst (Quant)" },
//       { title: "Quantitative Developer" },
//       { title: "Risk Quant Analyst" },
//       { title: "Algorithmic Trader" },
//       { title: "Financial Engineer" },
//       { title: "Model Validation Analyst" },
//     ],
//   },
//   {
//     id: 13, // Corresponds to Compliance and Regulatory Roles
//     category: "Compliance and Regulatory Roles",
//     roles: [
//       { title: "Compliance Officer" },
//       { title: "Regulatory Reporting Analyst" },
//       { title: "Anti-Money Laundering (AML) Specialist" },
//       { title: "Know Your Customer (KYC) Analyst" },
//       { title: "Compliance Manager" },
//       { title: "Regulatory Risk Manager" },
//     ],
//   },
//   {
//     id: 14, // Corresponds to Financial Journalism and Research
//     category: "Financial Journalism and Research",
//     roles: [
//       { title: "Financial Journalist" },
//       { title: "Financial Research Analyst" },
//       { title: "Economic Analyst" },
//       { title: "Financial Data Scientist" },
//       { title: "Equity Research Associate" },
//     ],
//   },
//   {
//     id: 15, // Corresponds to Taxation
//     category: "Taxation",
//     roles: [
//       { title: "Tax Consultant" },
//       { title: "Tax Advisor" },
//       { title: "Tax Manager" },
//       { title: "Indirect Tax Manager" },
//       { title: "Transfer Pricing Specialist" },
//       { title: "International Tax Manager" },
//       { title: "VAT Specialist" },
//     ],
//   },
// ];



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
          <div className="flex flex-col items-center w-full max-w-[800px] h-[90vh] overflow-y-auto gap-6">
            <h1 className="text-xl font-semibold">Select Tech Stacks</h1>
            <p className="text-gray-600">
              Choose the tech stacks you want to be interviewed for:
            </p>
            <div className="grid grid-cols-3 gap-6 w-full overflow-y-auto">
              {techStacks.map((stack) => (
                <div
                  key={stack.id}
                  onClick={() => handleTechStackSelection(stack.id)}
                  className={`border-2 ${
                    selectedTechStacks.includes(stack.id)
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

            {/* Work Experience Selection Section */}
            <div className="w-full mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Select Work Experience
              </h2>
              <p className="text-gray-600 mb-4">
                Choose your work experience level:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {workExperienceLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleWorkExperienceSelection(level.id)}
                    className={`border-2 ${
                      selectedWorkExperience === level.id
                        ? "border-blue-400 bg-blue-100"
                        : "border-gray-300"
                    } rounded-md px-4 py-2 flex items-center justify-center cursor-pointer`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <SignupForm />
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

export default SignupPage;
