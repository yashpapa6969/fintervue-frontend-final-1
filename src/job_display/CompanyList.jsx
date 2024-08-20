import React, { useState } from "react";
import BoxReveal from "../components/ui/box-reveal";

const DropdownFilter = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow"
      >
        <span className="text-md font-semibold">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2 pl-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={option.id}
                className="form-checkbox h-4 w-4"
              />
              <label htmlFor={option.id} className="ml-2 text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const CompanyCard = ({ company }) => (
  <div className="border bg-white rounded-lg  shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 duration-200 p-10">
    <div className="transform transition-transform duration-200 hover:scale-105">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex items-center mb-4">
          <img
            src={company.logo}
            alt={company.name}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold hover:text-2xl transition-all duration-200">{company.name}</h3>
            <p className="text-gray-500 hover:text-lg transition-all duration-200">{company.employees} employees</p>
          </div>
        </div>
        <p className="mb-4 hover:text-lg transition-all duration-200">{company.description}</p>
        <div className="text-green-600 font-semibold mb-2">ACTIVELY HIRING</div>
        <a href={company.link} className="text-blue-600 hover:underline">
          {company.openPositions} open positions
        </a>
        <div className="mt-4">
          <a
            href={company.applyLink}
            className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Apply
          </a>
        </div>
      </BoxReveal>
    </div>
  </div>
);





const Sidebar = () => (
  <div className="w-[350px] p-4 border-r bg-white shadow-lg rounded-lg flex flex-col justify-between">
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">All Filters</h2>
      
      <DropdownFilter
        title="Company type"
        options={[
          { id: "corporate", label: "Corporate (3635)" },
          { id: "foreign-mnc", label: "Foreign MNC (1336)" },
          { id: "indian-mnc", label: "Indian MNC (599)" },
          { id: "startup", label: "Startup (428)" },
        ]}
      />
      
      <DropdownFilter
        title="Location"
        options={[
          { id: "delhi-ncr", label: "Delhi / NCR (2781)" },
          { id: "bengaluru", label: "Bengaluru (2712)" },
          { id: "mumbai", label: "Mumbai (All Areas) (2378)" },
          { id: "hyderabad", label: "Hyderabad (1857)" },
        ]}
      />
      
      <DropdownFilter
        title="Industry"
        options={[
          { id: "tech", label: "Technology" },
          { id: "finance", label: "Finance" },
          { id: "healthcare", label: "Healthcare" },
          { id: "education", label: "Education" },
          { id: "manufacturing", label: "Manufacturing" },
        ]}
      />
      
      <DropdownFilter
        title="Experience"
        options={[
          { id: "entry-level", label: "Entry Level" },
          { id: "mid-level", label: "Mid Level" },
          { id: "senior-level", label: "Senior Level" },
          { id: "director", label: "Director" },
          { id: "executive", label: "Executive" },
        ]}
      />
      
      <DropdownFilter
        title="Job Posting Day"
        options={[
          { id: "last-24-hours", label: "Last 24 hours" },
          { id: "last-7-days", label: "Last 7 days" },
          { id: "last-30-days", label: "Last 30 days" },
        ]}
      />
      
      <DropdownFilter
        title="Nature of Business"
        options={[
          { id: "b2b", label: "B2B" },
          { id: "b2c", label: "B2C" },
          { id: "both", label: "Both B2B and B2C" },
        ]}
      />
      
      <DropdownFilter
        title="Work Type"
        options={[
          { id: "full-time", label: "Full-time" },
          { id: "part-time", label: "Part-time" },
          { id: "contract", label: "Contract" },
          { id: "freelance", label: "Freelance" },
          { id: "internship", label: "Internship" },
        ]}
      />
    </div>
    
    <div className="mt-6">
      <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
        Filter
      </button>
    </div>
  </div>
);





const CompanyList = () => {
const companies = [
  {
    logo: "https://via.placeholder.com/50",
    name: "Galxe",
    employees: "51-200",
    description: "Galxe is a decentralized super app and web3's largest onchain distribution platform.",
    openPositions: "19",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Aisle",
    employees: "11-50",
    description: "The in-store engagement platform for CPG brands.",
    openPositions: "3",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Zenlytic",
    employees: "11-50",
    description: "Modern Business Intelligence.",
    openPositions: "3",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Upnyx Innovative Solutions",
    employees: "11-50",
    description: "AI workforce for SMEs.",
    openPositions: "22",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Finacle",
    employees: "201-500",
    description: "Leading provider of financial technology solutions for banking and insurance sectors.",
    openPositions: "8",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Quantum Finance",
    employees: "51-200",
    description: "A cutting-edge fintech startup specializing in quantum computing solutions for financial modeling.",
    openPositions: "12",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "Ledgerworks",
    employees: "101-250",
    description: "Innovators in blockchain-based financial ledger systems for secure and transparent transactions.",
    openPositions: "7",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "CreditEase",
    employees: "51-200",
    description: "A digital lending platform providing personalized loan solutions for individuals and small businesses.",
    openPositions: "15",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "WealthSpring",
    employees: "51-100",
    description: "Wealth management firm offering AI-driven investment advice and portfolio management services.",
    openPositions: "5",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "InsureTech",
    employees: "51-200",
    description: "Innovative insurance solutions provider leveraging AI and big data to personalize insurance products.",
    openPositions: "10",
    link: "#",
  },
  {
    logo: "https://via.placeholder.com/50",
    name: "RoboInvest",
    employees: "11-50",
    description: "Pioneers in robo-advisory services offering automated investment strategies for retail investors.",
    openPositions: "6",
    link: "#",
  }];
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className="m-5 p-5">
          <h1 className="text-2xl font-semibold mb-6">
            Trending startups hiring now
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {companies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
