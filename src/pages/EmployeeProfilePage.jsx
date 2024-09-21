import React, { useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { motion } from "framer-motion";
import Logo from "../assests/logo/logo.png";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaMoneyBillWave,
  FaChartLine,
  FaBalanceScale,
} from "react-icons/fa";
import Navbar from "../components/navbar";

const jobRoles = [
  { title: "Financial Analyst", status: "Pending", icon: <FaMoneyBillWave /> },
  { title: "Investment Banker", status: "Accepted", icon: <FaChartLine /> },
  { title: "Auditor", status: "Rejected", icon: <FaBalanceScale /> },
];

const ProfileCard = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const jobApplicationData = {
    labels: ["Pending", "Success", "Rejected"],
    datasets: [
      {
        label: "Job Application Status",
        data: [5, 2, 3],
        backgroundColor: ["#FFC107", "#4CAF50", "#F44336"],
        borderColor: ["#FFB300", "#388E3C", "#D32F2F"],
        borderWidth: 2,
      },
    ],
  };

  const jobHistoryData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Number of Applications",
        data: [3, 2, 2, 3, 4, 2],
        fill: true,
        borderColor: "#1E88E5",
        backgroundColor: "rgba(30, 136, 229, 0.3)",
        pointBorderColor: "#0070d1",
        pointBackgroundColor: "#FFFFFF",
        pointHoverBackgroundColor: "#0070d1",
        pointHoverBorderColor: "#FFFFFF",
        tension: 0.4,
      },
    ],
  };

  return (
    <div> {/* Added font-sans class */}
      <Navbar/>
      <div className="pt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/3 mx-auto bg-white rounded-lg shadow-lg p-6"
        >
          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={image || "default_profile_pic.jpg"}
                    alt="Profile"
                  />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Charlie Romance
                </h2>
                <p className="text-gray-600">
                  Finance Analyst - Investment Strategist
                </p>
                <p className="text-gray-500">Harvard University - Cambridge</p>
                <p className="text-gray-500">Email: hello@personalemail.com</p>
                <p className="text-gray-500">Phone: +1234567890</p>
                <p className="text-gray-500">DOB: July 10, 1985</p>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 p-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg"> {/* Added hover effect */}
                <h3 className="text-lg font-semibold text-gray-700">
                  Professional Summary
                </h3>
                <p className="text-gray-600 mt-2">
                  Experienced financial analyst with a background in financial
                  planning, investment strategies, and risk management. Proven
                  track record in optimizing portfolios and driving business
                  growth.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg"> {/* Added hover effect */}
              <h4 className="font-semibold text-gray-800">Email Address</h4>
              <p className="text-gray-600">Primary: hello@personalemail.com</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg"> {/* Added hover effect */}
              <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
              <p className="text-gray-600">Primary: +1234567890</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg"> {/* Added hover effect */}
              <h4 className="font-semibold text-gray-800">Social Accounts</h4>
              <p className="text-gray-600">Facebook: charlie_f</p>
              <p className="text-gray-600">Google: charlie.r@gmail.com</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg" 
            >
              <h4 className="font-semibold text-gray-800">
                Job Application Status
              </h4>
              <div className="w-64 h-64">
                <Pie data={jobApplicationData} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg" 
            >
              <h4 className="font-semibold text-gray-800">Job History</h4>
              <Line data={jobHistoryData} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;
