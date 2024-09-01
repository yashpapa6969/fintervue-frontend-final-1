import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Line } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import Logo from "../assests/logo/logo5.jpeg";

import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement,ArcElement, Title, Tooltip, Legend);

const Employee = () => {
  const [image, setImage] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    customJobTitle: "",
    socials: [{ platform: "", link: "" }],
    experience: [{ company: "", role: "", description: "", From: "", To: "",duration: "" }],
    education: [{ institution: "", degree: "",From: "", To: "", marks: "", year: "" }],
    summary: "",
    projects: [{ title: "", description: "", From: "", To: "",link: "" }],
    skills: "",
    achievements: "",
    certifications: [{ name: "", date: "", company: "", id: "", link: "" }],
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddField = (section) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], {}],
    }));
  };

  const handleSectionInputChange = (index, section, field, value) => {
    const updatedSection = employeeData[section].map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setEmployeeData((prevData) => ({ ...prevData, [section]: updatedSection }));
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Data for the Pie Chart
const pieData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Job Application Success Rate',
      data: [60, 70, 80, 75, 90, 85],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4CAF50',
        '#FFC107',
        '#E91E63',
      ],
      hoverOffset: 4,
    },
  ],
};

// Data for the Line Chart
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Job Application Success Rate",
      data: [60, 70, 80, 75, 90, 85],
      fill: false,
      backgroundColor: "#4CAF50",
      borderColor: "#4CAF50",
    },
  ],
};


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white rounded-r-3xl p-6 flex flex-col items-center shadow-lg transform transition-transform duration-300 hover:translate-x-2 hover:scale-100">
      <div className="flex items-center space-x-3 mb-8">
        <a href="#"> {/* Wrap the logo in an anchor tag */}
          <img src={Logo} alt="Logo" className="h-15" /> {/* Adjust the height and add margin-right */}
        </a>
      </div>


        <nav>
          <ul className="space-y-6 text-lg">
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('Summary').scrollIntoView()}>Professional Summary</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('experience-education').scrollIntoView()}>Experience</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('experience-education').scrollIntoView()}>Education</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('projects-skills').scrollIntoView()}>Projects</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('projects-skills').scrollIntoView()}>Skills</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('Certifications').scrollIntoView()}>Certifications</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('achievements').scrollIntoView()}>Achievements</li>
            <li className="hover:text-gray-700 cursor-pointer" onClick={() => document.getElementById('activity').scrollIntoView()}>Activity & Analytics</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header id="dashboard" className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Employee Profile</h1>
        </header>

        {/* Employee Info Section */}
        <section id="profile" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {image ? (
                <img
                  src={image}
                  alt="Employee"
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Upload Image</h3>
          </div>

          {/* Employee Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Job Title</label>
                <select
                  name="jobTitle"
                  value={employeeData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Job Title</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Other">Other</option>
                </select>
                {employeeData.jobTitle === "Other" && (
                  <input
                    type="text"
                    name="customJobTitle"
                    value={employeeData.customJobTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter custom job title"
                  />
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Socials Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
          {employeeData.socials.map((social, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Platform"
                value={social.platform}
                onChange={(e) =>
                  handleSectionInputChange(index, "socials", "platform", e.target.value)
                }
                className="w-1/2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="url"
                placeholder="Link"
                value={social.link}
                onChange={(e) =>
                  handleSectionInputChange(index, "socials", "link", e.target.value)
                }
                className="w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            onClick={() => handleAddField("socials")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Add Social
          </button>
        </section>

        {/* Professional Summary Section */}
        <section id= "Summary" className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
          <textarea
            name="summary"
            value={employeeData.summary}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Write a brief professional summary"
            rows="4"
          ></textarea>
        </section>

        {/* Add Experience, Education, Projects, Skills, Certifications */}
        <section id="experience-education" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            {employeeData.experience.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={item.company}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "company", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={item.role}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "role", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "description", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  rows="3"
                ></textarea>
                <input
                  type="text"
                  placeholder="From DD-MM-YYYY"
                  value={item.company}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "From", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="To DD-MM-YYYY"
                  value={item.company}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "To", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={item.duration}
                  onChange={(e) =>
                    handleSectionInputChange(index, "experience", "duration", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddField("experience")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add Experience
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            {employeeData.education.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={item.institution}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "institution", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={item.degree}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "degree", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Marks"
                  value={item.marks}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "marks", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                 <input
                  type="text"
                  placeholder="From DD-MM-YYYY"
                  value={item.company}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "From", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="To DD-MM-YYYY"
                  value={item.company}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "To", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={item.year}
                  onChange={(e) =>
                    handleSectionInputChange(index, "education", "year", e.target.value)
                  }
                  
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddField("education")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add Education
            </button>
          </div>
        </section>

        <section id="projects-skills" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            {employeeData.projects.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={item.title}
                  onChange={(e) =>
                    handleSectionInputChange(index, "projects", "title", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Project Description"
                  value={item.description}
                  onChange={(e) =>
                    handleSectionInputChange(index, "projects", "description", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  rows="3"
                ></textarea>
                <input
                  type="url"
                  placeholder="Project Link"
                  value={item.link}
                  onChange={(e) =>
                    handleSectionInputChange(index, "projects", "link", e.target.value)
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddField("projects")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <textarea
              name="skills"
              value={employeeData.skills}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="List your skills"
              rows="6"
            ></textarea>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="Certifications" className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
          {employeeData.certifications.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Certification Name"
                value={item.name}
                onChange={(e) =>
                  handleSectionInputChange(index, "certifications", "name", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                placeholder="Date"
                value={item.date}
                onChange={(e) =>
                  handleSectionInputChange(index, "certifications", "date", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Company Offering"
                value={item.company}
                onChange={(e) =>
                  handleSectionInputChange(index, "certifications", "company", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="ID"
                value={item.id}
                onChange={(e) =>
                  handleSectionInputChange(index, "certifications", "id", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
              <input
                type="url"
                placeholder="Link"
                value={item.link}
                onChange={(e) =>
                  handleSectionInputChange(index, "certifications", "link", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            onClick={() => handleAddField("certifications")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Add Certification
          </button>
        </section>

        <section id="achievements" className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <textarea
            name="achievements"
            value={employeeData.achievements}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="List your achievements"
            rows="4"
          ></textarea>
        </section>

        {/* Activity & Analytics */}
<section id="activity" className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Activity & Analytics</h2>
  <div className="flex space-x-8">
    {/* Line Chart */}
    <div className="bg-white p-4 rounded-lg shadow-lg flex-1 min-w-[300px] max-w-[500px] h-[300px]">
      <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
      <Line
        data={lineData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          }
        }}
        width={undefined} // Remove width to use container width
        height={undefined} // Remove height to use container height
      />
    </div>

    {/* Pie Chart */}
    <div className="bg-white p-4 rounded-lg shadow-lg flex-1 min-w-[300px] max-w-[500px] h-[300px]">
      <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
      <Pie
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          }
        }}
        width={undefined} // Remove width to use container width
        height={undefined} // Remove height to use container height
      />
    </div>
  </div>
</section>

{/* Save and View Button */}
<div className="flex justify-center mt-8">
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform duration-300 mb-8"
          >
            Save and View
          </button>
        </div>

      </main>
    </div>
  );
};

export default Employee;
