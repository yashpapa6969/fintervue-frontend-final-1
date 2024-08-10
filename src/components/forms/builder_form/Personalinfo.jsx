
import React, { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import ShimmerButton from "../../ui/shimmer-button";


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
  const replaceNewlines = (text) => {
    if (typeof text !== "string") {
      console.error(
        "Expected a string for newline replacement, but got:",
        text
      );
      return ""; // Or handle it in a way that suits your application
    }
    return text.replace(/\n/g, "\\\\");
  };

  // Replace \VAR{} placeholders first
  template = template.replace(/\{VAR\{([^}]+)\}\}/g, (match, key) => {
    if (data.hasOwnProperty(key)) {
      return replaceNewlines(data[key]);
    } else {
      console.warn(`Key ${key} not found in data.`);
      return ""; // Handle missing keys
    }
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
  {${item.companyName || "N/A"}}{${item.startDate || "N/A"} -- ${
              item.endDate || "N/A"
            }}
  {${item.jobRole || "N/A"}}{}
  \\resumeItemListStart
    \\resumeItem{${replaceNewlines(item.summary || "N/A")}}
  \\resumeItemListEnd`;
          } else if (key === "education") {
            itemContent = `
\\resumeSubheading
  {${item.institution || "N/A"}}{${item.startDate || "N/A"} -- ${
              item.endDate || "N/A"
            }}
  {${item.degree || "N/A"}}{}
  \\resumeItemListStart
    \\resumeItem{${replaceNewlines(item.description || "N/A")}}
  \\resumeItemListEnd`;
          } else if (key === "projects") {
            itemContent = `
\\resumeProjectHeading
  {${item.name || "N/A"}}{${replaceNewlines(item.summary || "N/A")}}{${
              item.date || "N/A"
            }}`;
          }
          arrayContent += itemContent + "\n    ";
        } else {
          arrayContent += `\\resumeItem{${replaceNewlines(
            item || "N/A"
          )}}\n    `;
        }
      });
      template = template.replace(re, arrayContent.trim());
    } else {
      // Handling simple key-value pairs
      let re = new RegExp(`\\{${key}\\}`, "g");
      template = template.replace(re, replaceNewlines(data[key] || "N/A"));
    }
  }

  return template;
};


  const sendPostRequest = async (populatedResume) => {
    try {
      const response = await fetch(
        "https://4508-2401-4900-1f24-bf9-b9eb-2e32-de29-756c.ngrok-free.app/latex",
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
   <div className="flex flex-col gap-5 p-6 bg-gray-100 rounded-lg shadow-md">
     {/* Name and Email */}
     <div className="flex flex-row gap-5">
       <div className="w-full">
         <div className="text-sm font-semibold text-gray-600">Name</div>
         <div className="mt-1">
           <input
             onChange={handleChange}
             value={userData["name"] || ""}
             name="name"
             placeholder="Full Name"
             className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       </div>

       <div className="w-full">
         <div className="text-sm font-semibold text-gray-600">Email</div>
         <div className="mt-1">
           <input
             onChange={handleChange}
             value={userData["email"] || ""}
             name="email"
             type="email"
             placeholder="Email Address"
             className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       </div>
     </div>

     {/* Phone Number and LinkedIn URL */}
     <div className="flex flex-row gap-5">
       <div className="w-full">
         <div className="text-sm font-semibold text-gray-600">Phone Number</div>
         <div className="mt-1">
           <input
             onChange={handleChange}
             value={userData["phone"] || ""}
             name="phone"
             type="tel"
             placeholder="Phone Number"
             className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       </div>

       <div className="w-full">
         <div className="text-sm font-semibold text-gray-600">LinkedIn URL</div>
         <div className="mt-1">
           <input
             onChange={handleChange}
             value={userData["linkedin"] || ""}
             name="linkedin"
             type="url"
             placeholder="LinkedIn Profile URL"
             className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       </div>
     </div>

     {/* Job Role */}
     <div className="w-full">
       <div className="text-sm font-semibold text-gray-600">Job Role</div>
       <div className="mt-1">
         <select
           onChange={handleChange}
           value={userData["jobRole"] || ""}
           name="jobRole"
           className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
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
     <div className="w-full">
       <div className="text-sm font-semibold text-gray-600">
         Professional Summary
       </div>
       <div className="mt-1">
         <textarea
           onChange={handleChange}
           value={userData["summary"] || ""}
           name="summary"
           placeholder="Brief summary of your experience"
           className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           rows="4"
         />
       </div>
     </div>

     {/* Experience and Education */}
     <div className="flex flex-row gap-5">
       {/* Experience */}
       <div className="w-full mt-4">
         <div className="text-sm font-semibold text-gray-600">Experience</div>
         {(userData.experience || []).map((exp, index) => (
           <div
             key={index}
             className="mt-3 p-4 border rounded-md bg-white border-gray-300"
           >
             <input
               onChange={(e) =>
                 handleChange(e, index, "experience", "companyName")
               }
               value={exp.companyName || ""}
               placeholder="Company Name"
               className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
             />
             <input
               onChange={(e) => handleChange(e, index, "experience", "jobRole")}
               value={exp.jobRole || ""}
               placeholder="Job Role"
               className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
             />
             <div className="flex flex-row gap-3">
               <input
                 onChange={(e) =>
                   handleChange(e, index, "experience", "startDate")
                 }
                 value={exp.startDate || ""}
                 type="date"
                 placeholder="Start Date"
                 className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               />
               <input
                 onChange={(e) =>
                   handleChange(e, index, "experience", "endDate")
                 }
                 value={exp.endDate || ""}
                 type="date"
                 placeholder="End Date"
                 className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               />
             </div>
             <textarea
               onChange={(e) => handleChange(e, index, "experience", "summary")}
               value={exp.summary || ""}
               placeholder="Experience Summary"
               className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               rows="3"
             />
           </div>
         ))}
         <div className="flex justify-center mt-3">
           <button onClick={addExperience} className="transition duration-300">
             <ShimmerButton className="shadow-2xl">
               <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                 Add experience
               </span>
             </ShimmerButton>
           </button>
         </div>
       </div>

       {/* Education */}
       <div className="w-full mt-4">
         <div className="text-sm font-semibold text-gray-600">Education</div>
         {(userData.education || []).map((edu, index) => (
           <div
             key={index}
             className="mt-3 p-4 border rounded-md bg-white border-gray-300"
           >
             <input
               onChange={(e) =>
                 handleChange(e, index, "education", "institution")
               }
               value={edu.institution || ""}
               placeholder="Institution Name"
               className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
             />
             <input
               onChange={(e) => handleChange(e, index, "education", "degree")}
               value={edu.degree || ""}
               placeholder="Degree"
               className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
             />
             <div className="flex flex-row gap-3">
               <input
                 onChange={(e) =>
                   handleChange(e, index, "education", "startDate")
                 }
                 value={edu.startDate || ""}
                 type="date"
                 placeholder="Start Date"
                 className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               />
               <input
                 onChange={(e) =>
                   handleChange(e, index, "education", "endDate")
                 }
                 value={edu.endDate || ""}
                 type="date"
                 placeholder="End Date"
                 className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               />
             </div>
             <textarea
               onChange={(e) =>
                 handleChange(e, index, "education", "description")
               }
               value={edu.description || ""}
               placeholder="Description"
               className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
               rows="3"
             />
           </div>
         ))}

         <div className="flex justify-center mt-3">
           <button onClick={addEducation} className="transition duration-300">
             <ShimmerButton className="shadow-2xl">
               <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                 Add education
               </span>
             </ShimmerButton>
           </button>
         </div>
        
       </div>
     </div>

     {/* Projects */}
     <div className="w-full mt-4">
       <div className="text-sm font-semibold text-gray-600">Projects</div>
       {(userData.projects || []).map((project, index) => (
         <div
           key={index}
           className="mt-3 p-4 border rounded-md bg-white border-gray-300"
         >
           <input
             onChange={(e) => handleChange(e, index, "projects", "name")}
             value={project.name || ""}
             placeholder="Project Name"
             className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
           <textarea
             onChange={(e) => handleChange(e, index, "projects", "summary")}
             value={project.summary || ""}
             placeholder="Project Summary"
             className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
             rows="3"
           />
           <input
             onChange={(e) => handleChange(e, index, "projects", "date")}
             value={project.date || ""}
             type="date"
             placeholder="Date"
             className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       ))}
       <button
         onClick={addProject}
         className="mt-3 p-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
       >
         Add Project
       </button>
     </div>

     {/* Skills */}
     <div className="w-full mt-4">
       <div className="text-sm font-semibold text-gray-600">Skills</div>
       {((userData.skills || "").split(",") || []).map((skill, index) => (
         <div key={index} className="mt-2">
           <input
             onChange={(e) => handleSkillChange(e, index)}
             value={skill || ""}
             placeholder="Skill"
             className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           />
         </div>
       ))}
       <button
         onClick={addSkill}
         className="mt-3 p-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
       >
         Add Skill
       </button>
     </div>

     {/* Achievements */}
     <div className="w-full mt-4">
       <div className="text-sm font-semibold text-gray-600">Achievements</div>
       <div className="mt-1">
         <textarea
           onChange={handleChange}
           value={userData["achievements"] || ""}
           name="achievements"
           placeholder="Achievements (comma-separated)"
           className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
           rows="4"
         />
       </div>
     </div>

     {/* Print JSON Button */}
     {/* <div className="w-full mt-6">
       <button
         onClick={handlePrintJson}
         className="w-full p-3 text-white bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300"
       >
        Get my Resume
       </button>
     </div> */}

     <div className="z-10 flex min-h-[16rem] items-center justify-center">
       <button onClick={handlePrintJson}>
         <ShimmerButton className="shadow-2xl">
           <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
             Get my resume
           </span>
         </ShimmerButton>
       </button>
     </div>
   </div>
 );

};

export default Personalinfo;
