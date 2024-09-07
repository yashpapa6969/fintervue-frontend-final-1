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

const JobRoleCard = ({ job }) => (
  <div className="border bg-white rounded-lg shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 duration-200 p-10">
    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
      <div className="flex items-center mb-4">
        <img
          src={job.logo}
          alt={job.name}
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold hover:text-2xl transition-all duration-200">{job.name}</h3>
          <p className="text-gray-500 hover:text-lg transition-all duration-200">
            {job.employees} employees
          </p>
        </div>
      </div>
      <p className="mb-4 hover:text-lg transition-all duration-200">{job.description}</p>
      <div className="text-gray-800 font-semibold mb-2">Skills Required:</div>
      <ul className="list-disc ml-6 mb-4">
        {job.skills.map((skill, index) => (
          <li key={index} className="text-gray-600">{skill}</li>
        ))}
      </ul>
      <a
        href={job.link}
        className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
      >
        Apply
      </a>
    </BoxReveal>
  </div>
);

const Sidebar = () => (
  <div className="w-[350px] p-4 border-r bg-white shadow-lg rounded-lg flex flex-col justify-between">
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">All Filters</h2>
      
      <DropdownFilter
        title="Skills"
        options={[
          { id: "accounting", label: "Accounting" },
          { id: "financial-analysis", label: "Financial Analysis" },
          { id: "investment-banking", label: "Investment Banking" },
          { id: "risk-management", label: "Risk Management" },
        ]}
      />
      
      <DropdownFilter
        title="Experience"
        options={[
          { id: "entry-level", label: "Entry Level" },
          { id: "mid-level", label: "Mid Level" },
          { id: "senior-level", label: "Senior Level" },
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

const JobRoleList = () => {
  const jobs = [
    {
      logo: "https://via.placeholder.com/50",
      name: "Financial Analyst",
      employees: "51-200",
      description: "Analyze financial data and provide strategic recommendations.",
      skills: ["Accounting", "Financial Modeling", "Excel"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Investment Banker",
      employees: "201-500",
      description: "Provide financial services to clients in capital raising and M&A.",
      skills: ["Investment Banking", "Valuation", "M&A"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Risk Manager",
      employees: "501-1000",
      description: "Identify and manage financial risks within organizations.",
      skills: ["Risk Management", "Derivatives", "Risk Assessment"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Accountant",
      employees: "101-250",
      description: "Handle bookkeeping, auditing, and preparing financial statements.",
      skills: ["Accounting", "Bookkeeping", "Tax Filing"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Financial Consultant",
      employees: "301-600",
      description: "Provide tailored financial advice to clients for growth and planning.",
      skills: ["Financial Planning", "Wealth Management", "Budgeting"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Tax Specialist",
      employees: "50-100",
      description: "Prepare and file tax returns, advising on tax-related issues.",
      skills: ["Tax Filing", "Tax Planning", "Compliance"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Portfolio Manager",
      employees: "400-800",
      description: "Manage investment portfolios for clients and financial institutions.",
      skills: ["Portfolio Management", "Risk Management", "Equity Research"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Credit Analyst",
      employees: "200-500",
      description: "Evaluate creditworthiness and financial history for lending purposes.",
      skills: ["Credit Analysis", "Risk Assessment", "Financial Reporting"],
      link: "/display/job",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className="m-5 p-5">
          <h1 className="text-2xl font-semibold mb-6">
            Explore Finance Job Roles Hiring Now
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {jobs.map((job, index) => (
              <JobRoleCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRoleList;
