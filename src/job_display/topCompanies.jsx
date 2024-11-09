import React, { memo } from "react";
import { motion } from "framer-motion";

const jobRolesData = [
  {
    role: "Financial Analyst",
    skills: ["Financial Modeling", "Excel", "Data Analysis"],
    link: "#",
    activePositions: 100,
  },
  {
    role: "Investment Banker",
    skills: ["Valuation", "Mergers & Acquisitions", "Corporate Finance"],
    link: "#",
    activePositions: 60,
  },
  {
    role: "Portfolio Manager",
    skills: ["Risk Management", "Asset Allocation", "Financial Planning"],
    link: "#",
    activePositions: 45,
  },
  {
    role: "Accountant",
    skills: ["Bookkeeping", "Tax Compliance", "Financial Reporting"],
    link: "#",
    activePositions: 80,
  },
  {
    role: "Auditor",
    skills: ["Auditing", "Internal Controls", "Compliance"],
    link: "#",
    activePositions: 50,
  },
  // Add more finance-related job roles as needed
];

// Extracted JobCard component for better organization and memoization
const JobCard = memo(({ job }) => (
  <motion.div
    className="min-w-[300px] max-w-xs p-6 bg-white border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
    onClick={() => (window.location.href = job.link)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-between">
        {job.role}
        <motion.span 
          className="text-blue-600"
          whileHover={{ x: 5 }}
        >
          →
        </motion.span>
      </h3>
      
      <div className="bg-green-50 rounded-lg px-3 py-2 mb-4">
        <p className="text-sm font-medium text-green-700">
          {job.activePositions} active positions
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {job.skills.map((skill, i) => (
          <span
            key={i}
            className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 text-sm font-medium rounded-full transition-colors hover:bg-blue-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

JobCard.displayName = 'JobCard';

const marqueeVariants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

// Memoize the entire component
const TopJobRoles = memo(() => {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-800 py-16">
      <div className="container mx-auto text-center px-4">
        <motion.h2 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Top Finance Job Roles in Demand
        </motion.h2>
        <motion.p 
          className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover opportunities that match your skills and experience level
        </motion.p>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-6"
            variants={marqueeVariants}
            animate="animate"
          >
            {jobRolesData.concat(jobRolesData).map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

TopJobRoles.displayName = 'TopJobRoles';

export default TopJobRoles;
