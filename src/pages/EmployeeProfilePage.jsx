import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { motion } from 'framer-motion';
import Logo from "../assests/logo/logo.png";

// Finance-related icons
import { FaMoneyBillWave, FaChartLine, FaBalanceScale } from 'react-icons/fa';

// Replace tech roles with finance roles
const jobRoles = [
  { title: 'Financial Analyst', status: 'Pending', icon: <FaMoneyBillWave /> },
  { title: 'Investment Banker', status: 'Accepted', icon: <FaChartLine /> },
  { title: 'Auditor', status: 'Rejected', icon: <FaBalanceScale /> }
];

const ProfileCard = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Data for job application statuses
  const jobApplicationData = {
    labels: ['Pending', 'Success', 'Rejected'],
    datasets: [
      {
        label: 'Job Application Status',
        data: [5, 2, 3],
        backgroundColor: ['#FFC107', '#4CAF50', '#F44336'],
        borderColor: ['#FFB300', '#388E3C', '#D32F2F'],
        hoverBackgroundColor: ['#FFEB3B', '#81C784', '#E57373'],
        hoverBorderColor: ['#FDD835', '#66BB6A', '#EF5350'],
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  // Data for job history success rate
  const jobHistoryData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [3, 2, 2, 3, 4, 2],
        fill: true,
        borderColor: '#1E88E5',
        backgroundColor: 'rgba(30, 136, 229, 0.3)',
        pointBorderColor: '#1E88E5',
        pointBackgroundColor: '#FFFFFF',
        pointHoverBackgroundColor: '#1E88E5',
        pointHoverBorderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 bg-cover bg-center">
      <header className="w-full flex justify-between items-center p-4">
        <img src={Logo} alt="Logo" className="w-30 h-12" />
        <div className="space-x-4">
          <button className="bg-blue-700 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300 ease-in-out">Profile</button>
          <button className="bg-blue-700 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300 ease-in-out">Analytics</button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center mt-8"
      >
        <h1 className="text-3xl font-bold">Hi There, Samantha Jones!</h1>
        <p className="text-lg text-gray-700">Welcome to your profile </p>
      </motion.div>

      {/* Profile and Experience & Education on the same row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4 mt-8">
        {/* Main Profile Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl"
        >
          <div className="flex justify-between items-center">
            <button className="bg-blue-700 text-white py-1 px-3 rounded-full text-sm">Website</button>
            <button className="bg-gray-800 text-white py-1 px-3 rounded-full text-sm">Github</button>
          </div>
          <div className="text-center mt-4">
            <div className="relative inline-block">
              <img
                className="w-32 h-32 rounded-full border-4 border-white transition-transform transform hover:scale-105"
                src={image || 'default_profile_pic.jpg'}
                alt="Profile"
              />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
            <h2 className="text-xl font-semibold mt-2">Samantha Jones</h2>
            <p className="text-blue-700">Finance Analyst - Investment Strategist</p>
            <p className="text-gray-500 text-sm">Harvard University - Cambridge</p>
            <p className="text-gray-600">Email: samantha@example.com</p>
            <p className="text-gray-600">Phone: +1234567890</p>
            <p className="text-gray-600">DOB: July 10, 1985</p>
            <p className="text-gray-600">Current Company: Finance Global Corp.</p>

            {/* Professional Summary */}
            <h3 className="text-lg font-semibold mt-6">Professional Summary</h3>
            <p className="text-gray-600 mt-2">
              Financial analyst specializing in investment strategies and financial planning. Experienced in managing financial portfolios and working with diverse teams to drive business growth.
            </p>

            {/* Key Skills */}
            <h3 className="text-lg font-semibold mt-6">Key Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 text-xs font-semibold rounded">Financial Modeling</span>
              <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 text-xs font-semibold rounded">Risk Management</span>
              <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 text-xs font-semibold rounded">Investment Strategies</span>
              <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 text-xs font-semibold rounded">Data Analysis</span>
            </div>
          </div>
        </motion.div>

        {/* Experience & Education */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold mb-3">Experience</h2>
          <ul>
            <li className="mb-2">
              <p className="text-gray-800 font-semibold">Finance Global Corp.</p>
              <p className="text-gray-600">Financial Analyst - Jan 2020 to Present</p>
            </li>
            <li className="mb-2">
              <p className="text-gray-800 font-semibold">Capital Ventures</p>
              <p className="text-gray-600">Investment Analyst - Jun 2017 to Dec 2019</p>
            </li>
          </ul>

          <h2 className="text-lg font-semibold mb-3">Education</h2>
          <ul>
            <li className="mb-2">
              <p className="text-gray-800 font-semibold">Harvard University</p>
              <p className="text-gray-600">B.S. in Finance - Graduated 2019</p>
            </li>
          </ul>

          {/* Certifications */}
          <h2 className="text-lg font-semibold mb-3">Certifications</h2>
          <ul>
            <li className="mb-2">
              <p className="text-gray-600">Certified Financial Analyst (CFA)</p>
            </li>
            <li className="mb-2">
              <p className="text-gray-600">Certified Risk Manager (CRM)</p>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Recent Jobs Applied and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-6 mt-10">
        {/* Recent Jobs Applied */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1,          y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Jobs Applied</h2>
          <ul className="space-y-4">
            {jobRoles.map((role, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="text-2xl">{role.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{role.title}</p>
                  <p className={`text-sm ${role.status === 'Accepted' ? 'text-green-600' : role.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{role.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Application Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold mb-4">Job Application Status</h2>
          <Pie data={jobApplicationData} />
        </motion.div>

        {/* Job History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold mb-4">Job History Success Rate</h2>
          <Line data={jobHistoryData} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;

