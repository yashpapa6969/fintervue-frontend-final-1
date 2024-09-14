import React from "react";
import JobRoleCard from "./CompanyList"; // Import JobRoleCard

const JobRoleList = () => {
  const jobs = [
    {
      logo: "https://via.placeholder.com/50",
      name: "Financial Analyst",
      employees: "51-200",
      description:
        "Analyze financial data and provide strategic recommendations.",
      skills: ["Accounting", "Financial Modeling", "Excel"],
      link: "/display/job",
    },
    {
      logo: "https://via.placeholder.com/50",
      name: "Investment Banker",
      employees: "201-500",
      description:
        "Provide financial services to clients in capital raising and M&A.",
      skills: ["Investment Banking", "Valuation", "M&A"],
      link: "/display/job",
    },
    // Add other jobs as needed
  ];

  return (
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
  );
};

export default JobRoleList;
