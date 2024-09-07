import React from "react";
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

const marqueeVariants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear",
      },
    },
  },
};

const TopJobRoles = () => {
  return (
    <section className="bg-blue-700 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          Explore Top Finance Job Roles in Demand
        </h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-6"
            variants={marqueeVariants}
            animate="animate"
          >
            {jobRolesData.concat(jobRolesData).map((job, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] max-w-xs p-6 bg-white border rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => (window.location.href = job.link)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {job.role} &rarr;
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {job.activePositions} positions available
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-200 text-blue-700 px-3 py-1 text-xs font-semibold rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TopJobRoles;
