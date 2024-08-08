import React, { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";

const Personalinfo = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e, index, section, field) => {
    const { value } = e.target;

    if (section) {
      const updatedSection = [...userData[section]];
      if (index !== undefined) {
        updatedSection[index] = { ...updatedSection[index], [field]: value };
      }
      setUserData({ ...userData, [section]: updatedSection });
    } else {
      setUserData({ ...userData, [e.target.name]: value });
    }
  };

  const addExperience = () => {
    const updatedExperience = [...(userData.experience || []), {}];
    setUserData({ ...userData, experience: updatedExperience });
  };

  const addProject = () => {
    const updatedProjects = [...(userData.projects || []), {}];
    setUserData({ ...userData, projects: updatedProjects });
  };

  const addEducation = () => {
    const updatedEducation = [...(userData.education || []), {}];
    setUserData({ ...userData, education: updatedEducation });
  };

  const addSkill = () => {
    const skillsArray = (userData.skills || "")
      .split(",")
      .map((skill) => skill.trim());
    skillsArray.push("");
    setUserData({ ...userData, skills: skillsArray.join(", ") });
  };

  const handleSkillChange = (e, index) => {
    const skillsArray = (userData.skills || "")
      .split(",")
      .map((skill) => skill.trim());
    skillsArray[index] = e.target.value;
    setUserData({ ...userData, skills: skillsArray.join(", ") });
  };

  let resumeTemplate = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{xcolor}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} 
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}
\\definecolor{deepblue}{RGB}{0,51,151}
\\definecolor{darkblue}{RGB}{0,0,139}

\\titleformat{\\section}{\\color{darkblue}
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\color{deepblue}\\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[3]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #3} \\\\
    \\end{tabular*}\\vspace{-7pt}
    \\resumeItemListStart
        \\resumeItem{#2}
    \\resumeItemListEnd
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape \\color{darkblue}{name}} \\\\ \\vspace{+10pt}
    \\small \\raisebox{-0.1\\height}\\faPhone\\ {phone} ~ \\href{mailto:{email}}{\\raisebox{-0.2\\height}\\faEnvelope\\  \\underline{{email}}} ~
    \\href{{linkedin}}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\underline{{linkedin}}}
    \\vspace{-3pt}
\\end{center}

\\section{Summary}
  \\resumeItemListStart
    \\resumeItem{{summary}}
  \\resumeItemListEnd

\\section{Education}
  \\resumeSubHeadingListStart
    {education}
  \\resumeSubHeadingListEnd

\\section{Experience}
  \\resumeSubHeadingListStart
    {experience}
  \\resumeSubHeadingListEnd



\\section{Projects}
  \\resumeSubHeadingListStart
    {projects}
  \\resumeSubHeadingListEnd

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: {skills}} \\\\
    }}
 \\end{itemize}

\\section{Achievements}
  \\resumeSubHeadingListStart
    \\resumeItem{{achievements}}
  \\resumeSubHeadingListEnd

\\end{document}
`;

  const populateTemplate = (template, data) => {
    // Function to replace newline characters with LaTeX line breaks
    const replaceNewlines = (text) => text.replace(/\n/g, "\\\\");

    // Replace \VAR{} placeholders first
    template = template.replace(/\{VAR\{([^}]+)\}\}/g, (match, key) => {
      return data[key] ? replaceNewlines(data[key]) : "";
    });

    // Handle other keys
    for (let key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        // Handling objects within data
        for (let subKey in data[key]) {
          let re = new RegExp(`\\{${key}\\.${subKey}\\}`, "g");
          template = template.replace(re, replaceNewlines(data[key][subKey]));
        }
      } else if (Array.isArray(data[key])) {
        // Handling arrays within data
        let re = new RegExp(`\\{${key}\\}`, "g");
        let arrayContent = "";
        data[key].forEach((item) => {
          if (typeof item === "object") {
            let itemContent = "";
            if (key === "experience") {
              itemContent = `
\\resumeSubheading
  {${item.companyName}}{${item.startDate} -- ${item.endDate}}
  {${item.jobRole}}{}
  \\resumeItemListStart
    \\resumeItem{${replaceNewlines(item.summary)}}
  \\resumeItemListEnd`;
            } else if (key === "education") {
              itemContent = `
\\resumeSubheading
  {${item.institution}}{${item.startDate} -- ${item.endDate}}
  {${item.degree}}{}
  \\resumeItemListStart
    \\resumeItem{${replaceNewlines(item.description)}}
  \\resumeItemListEnd`;
            } else if (key === "projects") {
              itemContent = `
\\resumeProjectHeading
  {${item.name}}{${replaceNewlines(item.summary)}}{${item.date}}`;
            }
            arrayContent += itemContent + "\n    ";
          } else {
            arrayContent += `\\resumeItem{${replaceNewlines(item)}}\n    `;
          }
        });
        template = template.replace(re, arrayContent.trim());
      } else {
        // Handling simple key-value pairs
        let re = new RegExp(`\\{${key}\\}`, "g");
        template = template.replace(re, replaceNewlines(data[key]));
      }
    }
    return template;
  };

  const sendPostRequest = async (populatedResume) => {
    try {
      const response = await fetch(
        "https://e9bb-2401-4900-1f24-bf9-b9eb-2e32-de29-756c.ngrok-free.app/latex",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latex_content: populatedResume }), // Replace with your data
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response as a blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger a download
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf"; // Filename for the downloaded file
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handlePrintJson = () => {
    let populatedResume = populateTemplate(resumeTemplate, userData);
    console.log(populatedResume);
    sendPostRequest(populatedResume);
    console.log(JSON.stringify(userData, null, 2));
  };

  return (
    <div className="flex flex-col">
      {/* Name */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["name"] || ""}
            name="name"
            placeholder="Full Name"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* Email */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Email
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            type="email"
            placeholder="Email Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Phone Number
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["phone"] || ""}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* LinkedIn URL */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          LinkedIn URL
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["linkedin"] || ""}
            name="linkedin"
            type="url"
            placeholder="LinkedIn Profile URL"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* Job Role */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Job Role
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <select
            onChange={handleChange}
            value={userData["jobRole"] || ""}
            name="jobRole"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-white"
          >
            <option value="" disabled>
              Select Job Role
            </option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Professional Summary
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <textarea
            onChange={handleChange}
            value={userData["summary"] || ""}
            name="summary"
            placeholder="Brief summary of your experience"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            rows="4"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Experience
        </div>
        {(userData.experience || []).map((exp, index) => (
          <div
            key={index}
            className="bg-white my-4 p-2 border border-gray-200 rounded"
          >
            <input
              onChange={(e) =>
                handleChange(e, index, "experience", "companyName")
              }
              value={exp.companyName || ""}
              placeholder="Company Name"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleChange(e, index, "experience", "jobRole")}
              value={exp.jobRole || ""}
              placeholder="Job Role"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) =>
                handleChange(e, index, "experience", "startDate")
              }
              value={exp.startDate || ""}
              type="date"
              placeholder="Start Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleChange(e, index, "experience", "endDate")}
              value={exp.endDate || ""}
              type="date"
              placeholder="End Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <textarea
              onChange={(e) => handleChange(e, index, "experience", "summary")}
              value={exp.summary || ""}
              placeholder="Experience Summary"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
              rows="3"
            />
          </div>
        ))}
        <button
          onClick={addExperience}
          className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Add Experience
        </button>
      </div>

      {/* Projects */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Projects
        </div>
        {(userData.projects || []).map((project, index) => (
          <div
            key={index}
            className="bg-white my-4 p-2 border border-gray-200 rounded"
          >
            <input
              onChange={(e) => handleChange(e, index, "projects", "name")}
              value={project.name || ""}
              name={`projects-${index}-name`}
              placeholder="Project Name"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <textarea
              onChange={(e) => handleChange(e, index, "projects", "summary")}
              value={project.summary || ""}
              name={`projects-${index}-summary`}
              placeholder="Project Summary"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
              rows="3"
            />
            <input
              onChange={(e) => handleChange(e, index, "projects", "date")}
              value={project.date || ""}
              name={`projects-${index}-date`}
              type="text"
              placeholder="Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
          </div>
        ))}
        <button
          onClick={addProject}
          className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Add Project
        </button>
      </div>

      {/* Education */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Education
        </div>
        {(userData.education || []).map((edu, index) => (
          <div
            key={index}
            className="bg-white my-4 p-2 border border-gray-200 rounded"
          >
            <input
              onChange={(e) =>
                handleChange(e, index, "education", "institution")
              }
              value={edu.institution || ""}
              name={`education-${index}-institution`}
              placeholder="Institution Name"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleChange(e, index, "education", "degree")}
              value={edu.degree || ""}
              name={`education-${index}-degree`}
              placeholder="Degree"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleChange(e, index, "education", "startDate")}
              value={edu.startDate || ""}
              name={`education-${index}-startDate`}
              type="date"
              placeholder="Start Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <input
              onChange={(e) => handleChange(e, index, "education", "endDate")}
              value={edu.endDate || ""}
              name={`education-${index}-endDate`}
              type="date"
              placeholder="End Date"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800 mb-2"
            />
            <textarea
              onChange={(e) =>
                handleChange(e, index, "education", "description")
              }
              value={edu.description || ""}
              name={`education-${index}-description`}
              placeholder="Description"
              className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
              rows="3"
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Skills
        </div>
        {((userData.skills || "").split(",") || []).map((skill, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              onChange={(e) => handleSkillChange(e, index)}
              value={skill || ""}
              placeholder="Skill"
              className="p-1 px-2 appearance-none outline-none border border-gray-200 w-full text-gray-800"
            />
          </div>
        ))}
        <button
          onClick={addSkill}
          className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Add Skill
        </button>
      </div>

      {/* Achievements */}
      <div className="w-full mx-2 flex-1 mt-4">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Achievements
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <textarea
            onChange={handleChange}
            value={userData["achievements"] || ""}
            name="achievements"
            placeholder="Achievements (comma-separated)"
            className="p-1 px-2 appearance-none outline-none w-full border border-gray-200 text-gray-800"
            rows="4"
          />
        </div>
      </div>

      {/* Print JSON Button */}
      <div className="w-full mx-2 flex-1 mt-4">
        <button
          onClick={handlePrintJson}
          className="w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
        >
          Print JSON
        </button>
      </div>
    </div>
  );
};

export default Personalinfo;
