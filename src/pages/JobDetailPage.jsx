import React from "react";
import Navbar from "../job_display/navbar";
import { Button } from "@chakra-ui/react";



const JobOverview = () => (
  <div className="border rounded-lg p-6 shadow-md bg-white mb-4 flex flex-col lg:flex-row justify-between items-center">
    <div className="w-full lg:w-2/3">
      <h2 className="text-2xl font-semibold mb-2">Technical Lead</h2>
      <p className="text-gray-700 mb-4">Srijan - A Material+ Company</p>
      <div className="flex items-center text-gray-600 mb-4">
        <div className="flex items-center mr-6">
          <span className="inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v10M12 3v18m4-12v10" />
            </svg>
          </span>
          9 - 12 years
        </div>
        <div className="flex items-center mr-6">
          <span className="inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M9 12h1" />
            </svg>
          </span>
          Not Disclosed
        </div>
        <div className="flex items-center">
          <span className="inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-8 0v2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M9 12h6" />
            </svg>
          </span>
          Gurugram
        </div>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <span>Posted: 8 days ago | Openings: 1 | Applicants: 11</span>
      </div>
    </div>

    <div className="w-full lg:w-1/3 flex justify-between lg:justify-end items-center mt-4 lg:mt-0">
      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors mr-2">
        Save
      </button>
      <a href="https://yourcompany.com/apply" target="_blank" rel="noopener noreferrer">
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Apply on company site
        </button>
      </a>
    </div>
  </div>
);



// const JobHighlights = () => (
//   <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
    
//     {/* Highlights content here */}
//   </div>
// );



const JobDescription = () => (
  <div className="border rounded-lg p-6 shadow-md bg-white">
    <h3 className="text-lg font-semibold pb-3">Job Highlights</h3>
    <div className="bg-gray-300 px-5 py-3 rounded-[10px]">
      <h3 className="text-lg font-semibold mb-4">Job Description</h3>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Job Highlights</h4>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Bachelor's degree in Technology, Data Science, or a related field
          </li>
          <li>
            MBA or advanced degree preferred - Atleast 9-12 years of total
            experience, Qualtrics Certified with real world experience.
          </li>
          <li>
            Experience with Qualtrics and Medallia - Proficiency in
            JavaScript/CSS
          </li>
          <li>Experience configuring API workflows.</li>
        </ul>
      </div>
    </div>

    <div className="mb-6 mt-3">
      <h4 className="text-md font-semibold mb-2">Job Match Score</h4>
      <ul className="list-inside flex space-x-4 text-gray-700">
        <li>Early Applicant</li>
        <li>Keyskills</li>
        <li>Location</li>
        <li>Work Experience</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="text-md font-semibold mb-2">Job Description</h4>
      <p className="text-gray-700 mb-4">
        As Technical lead for EX Practice player and an innovative problem
        solver who thrives on working in the software consulting space. They
        tackle complex data-related challenges while working with teams in both
        the research and technical fields to enable clients to create
        best-in-class employee experience programs.
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          Leading complex large-scale technology transformation programs that
          deliver data-driven insights.
        </li>
        <li>
          Managing Employee Experience Management including designing solutions,
          best practices, and employee satisfaction.
        </li>
        <li>
          Enabling applications to deliver targeted improvements to employee
          journeys.
        </li>
        <li>
          Proven track record of leading successful Qualtrics implementations
          and driving consumer insights that require a complex skill-set.
        </li>
        <li>Ensuring compliance with QA protocols</li>
        <li>
          Providing leadership support to offshore solution team to help with
          any technical oversight.
        </li>
        <li>
          Providing advanced training and configuration support to the onshore
          and offshore Solutions Engineers.
        </li>
        <li>
          Follow the timelines set out by project management and proactively
          provide updates daily.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="text-md font-semibold mb-2">About You</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          Bachelor's degree in Technology, Data Science, or a related field; MBA
          or advanced degree preferred
        </li>
        <li>
          Atleast 9-12 years of total experience, Qualtrics Certified with real
          world experience
        </li>
        <li>Good to have hands on Medallia experience as well</li>
        <li>Experience configuring API workflows</li>
        <li>
          Proven track record of leading successful Qualtrics implementations
          and driving consumer insights
        </li>
        <li>
          Ability to manage 5-10 member team, own their solution and ensure
          quality
        </li>
        <li>
          Strong and efficient skills with the ability to translate data into
          meaningful insights
        </li>
        <li>Experience with Qualtrics and Medallia</li>
        <li>Proficiency in JavaScript, CSS</li>
      </ul>
    </div>

    <div className="flex flex-row gap-6">
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Role</h4>
        <p className="text-gray-700">Technical Lead</p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Industry Type</h4>
        <p className="text-gray-700">IT Services & Consulting</p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Department</h4>
        <p className="text-gray-700">Engineering - Software & QA</p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Employment Type</h4>
        <p className="text-gray-700">Full Time, Permanent</p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Role Category</h4>
        <p className="text-gray-700">Software Development</p>
      </div>
    </div>

    <div className="mb-6">
      <h4 className="text-md font-semibold mb-2">Education</h4>
      <p className="text-gray-700">UG: Any Graduate</p>
      <p className="text-gray-700">PG: MBA/PGDM in Any Specialization</p>
    </div>

    <div className="mb-6">
      <h4 className="text-md font-semibold mb-2">Key Skills</h4>
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Technical Architect
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Project Management
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Consulting
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          JavaScript
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Global Strategy
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Manage Technology
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Technical Lead
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Healthcare
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Wellness
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
          Counselling
        </span>
      </div>
    </div>

    <div className="flex flex-row gap-5">
      <button className="bg-black text-white rounded-[10px] px-5 py-2">Apply</button>
      <div className="mt-3 text-blue-600 text-sm">
        <a href="#">Report this job</a>
      </div>
    </div>
  </div>
);




const SuggestedJobs = () => {
  const jobs = [
    {
      title: "Technical Architect ( Salesforce / Integrations )",
      company: "Axa XI",
      rating: 3.6,
      reviews: 358,
      location: "Gurugram, Bengaluru",
      posted: "25 days ago",
      logo: "https://via.placeholder.com/50",
    },
    {
      title: "Technical Architect",
      company: "NovelVox Softwares India",
      rating: 3.8,
      reviews: 42,
      location: "Faridabad",
      posted: "26 days ago",
      logo: "https://via.placeholder.com/50",
    },
    {
      title: "Technology Solution Architect (Education/Edtech)",
      company: "Gedu Services",
      rating: 3.4,
      reviews: 30,
      location: "Noida",
      posted: "21 days ago",
      logo: "https://via.placeholder.com/50",
    },
    {
      title: "Technical Project Manager",
      company: "Decision Point",
      rating: 4.3,
      reviews: 108,
      location: "Chennai, Gurugram",
      posted: "14 days ago",
      logo: "https://via.placeholder.com/50",
    },
    {
      title: "Senior Solution Architect",
      company: "Globallogic",
      rating: 3.7,
      reviews: 3967,
      location: "Noida",
      posted: "14 days ago",
      logo: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
      <h3 className="text-lg font-semibold mb-4">Jobs you might be interested in</h3>
      {jobs.map((job, index) => (
        <div key={index} className="flex items-start mb-4">
          <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-full mr-4" />
          <div className="flex-1">
            <h4 className="text-md font-semibold">{job.title}</h4>
            <p className="text-gray-600">{job.company}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="inline-flex items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
                </svg>
                {job.rating} | {job.reviews} reviews
              </span>
              <span className="mr-2">•</span>
              <span>{job.location}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Posted {job.posted}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


const Reviews = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          Read all 106 reviews
        </a>
      </div>
      <div className="mb-2">
        <h4 className="text-md font-semibold">
          Technical Lead in New Delhi, Delhi
        </h4>
        <p className="text-gray-500 text-sm">Anonymous | 09 Sep 2022</p>
      </div>
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.004a1 1 0 00.95.69h4.21c.518 0 .765.631.364.95l-3.418 2.74a1 1 0 00-.342 1.12l1.287 4.004a1 1 0 01-1.539 1.118l-3.418-2.74a1 1 0 00-1.174 0l-3.418 2.74a1 1 0 01-1.539-1.118l1.287-4.004a1 1 0 00-.342-1.12L2.13 8.57a1 1 0 01.364-.95h4.21a1 1 0 00.95-.69l1.287-4.004z" />
        </svg>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Likes</p>
        <p className="text-gray-600">Good company to start with</p>
      </div>
      <p className="text-sm text-gray-400 mt-4">Powered by <span className="font-semibold">AmbitionBox</span></p>
    </div>
  );
};


const SalaryInsights = () => (
  <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Salary Insights</h3>
      <a href="#" className="text-blue-600 hover:underline text-sm">
        Compare salary
      </a>
    </div>
    <p className="text-gray-600 mb-4">
      Compare salaries of Technical Lead with similar companies.
    </p>
    <div className="flex justify-between items-center mb-4">
      <span className="font-semibold text-gray-700">Avg. salary - 24 LPA</span>
    </div>
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>Min 14 LPA</span>
      <span>Max 28 LPA</span>
    </div>
    <p className="text-sm text-gray-400 mt-4">Powered by <span className="font-semibold">AmbitionBox</span></p>
  </div>
);


const BenefitsPerks = () => (
  <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Benefits & Perks</h3>
      <a href="#" className="text-blue-600 hover:underline text-sm">
        View all
      </a>
    </div>
    <p className="text-gray-600 mb-4">31 Users reported these benefits</p>
    <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-700">
      <div>
        <img src="https://via.placeholder.com/40" alt="Work From Home" className="mx-auto mb-2" />
        Work From Home
      </div>
      <div>
        <img src="https://via.placeholder.com/40" alt="Health Insurance" className="mx-auto mb-2" />
        Health Insurance
      </div>
      <div>
        <img src="https://via.placeholder.com/40" alt="Team Outings" className="mx-auto mb-2" />
        Team Outings
      </div>
      <div>
        <img src="https://via.placeholder.com/40" alt="Soft Skill Training" className="mx-auto mb-2" />
        Soft Skill Training
      </div>
      <div>
        <img src="https://via.placeholder.com/40" alt="Job Training" className="mx-auto mb-2" />
        Job Training
      </div>
      <div>
        <img src="https://via.placeholder.com/40" alt="Education Assistance" className="mx-auto mb-2" />
        Education Assistance
      </div>
    </div>
    <p className="text-sm text-gray-400 mt-4">Powered by <span className="font-semibold">AmbitionBox</span></p>
  </div>
);



const JobDetailPage = () => (
  <>
  <Navbar/>
    <div className="container mx-auto p-4 flex flex-wrap lg:flex-nowrap">
    
      <div className="w-full lg:w-2/3 lg:pr-4 mb-4 lg:mb-0">
        <JobOverview />
        {/* <JobHighlights /> */}
        <JobDescription />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3">
        <SuggestedJobs />
        <Reviews />
        <SalaryInsights />
        <BenefitsPerks />
      </div>
    </div>
  </>
);

export default JobDetailPage;
