import { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import ShimmerButton from "../../ui/shimmer-button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredIndicator from "../../ui/RequiredIndicator";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const Personalinfo = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    // Check if required fields are empty
    if (!userData.name) newErrors.name = "Name is required.";
    if (!userData.email) newErrors.email = "Email is required.";
    if (!userData.phone) newErrors.phone = "Phone number is required.";

    if (!userData.jobRole) newErrors.jobRole = "Job role is required.";


    // Check for at least one experience, education, and project
    if (!userData.experience || userData.experience.length === 0) {
      newErrors.experience = "At least one experience is required.";
    }
    if (!userData.education || userData.education.length === 0) {
      newErrors.education = "At least one education entry is required.";
    }
    if (!userData.projects || userData.projects.length === 0) {
      newErrors.projects = "At least one project is required.";
    }
    if (!userData.skills || userData.skills.length === 0) {
      newErrors.skills = "At least one project is required.";
    }

    // Set the errors state with the validation results
    setErrors(newErrors);

    // If there are no errors, return true; otherwise, return false
    return Object.keys(newErrors).length === 0;
  };

  const resumeTemplate1 = `
  \\documentclass[letterpaper,11pt]{article}
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

  const resumeTemplate2 = `
\\documentclass[11pt]{article}
\\usepackage[margin=1in, a4paper]{geometry}
\\setcounter{secnumdepth}{0}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref} % This package is required for hyperlinks

\\titlespacing{\\section}{0pt}{*1}{*1}
\\titlespacing{\\subsection}{0pt}{*0}{*0}
\\titlespacing{\\subsubsection}{0pt}{*0}{*0}
\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0pt}{}[\\titlerule]
\\titleformat*{\\subsubsection}{\\large\\itshape}
\\setlist[itemize]{noitemsep,left=0pt}
\\pagestyle{empty}
\\pdfgentounicode=1

\\begin{document}
\\begin{center}
\\begin{minipage}{0.5\\textwidth}
{\\Huge\\bfseries
\\textnormal{{name}}
} \\\\ \\medskip
{\\textnormal{{jobRole}}}
\\end{minipage} \\hfill
\\begin{minipage}{0.4\\textwidth}
\\raggedleft
Email: \\href{mailto:{email}}{\\texttt{{email}}} \\\\
Mobile: \\href{tel:{phone}}{\\texttt{{phone}}} \\\\
LinkedIn: \\href{{linkedin}}{\\texttt{{linkedin}}} \\\\
GitHub: \\href{{github}}{\\texttt{{github}}}
\\end{minipage}
\\end{center}

\\vspace{20pt}

\\section{Education}
{educationDetails}

\\vspace{20pt}

\\section{Experience}
{experienceDetails}

\\vspace{20pt}

\\section{Certification \\& Awards}
\\begin{itemize}[left=0pt, itemsep=0pt]
\\item {achievements}
\\end{itemize}

\\vspace{20pt}

\\section{Skills \\& Interests}
\\begin{itemize}[itemsep=0pt]
\\item {skills}
\\end{itemize}

\\vspace{20pt}

\\section{Projects}
{projectDetails}

\\end{document}
`;



  const populateTemplate2 = (template, data) => {
    const replaceNewlines = (text) => {
      if (typeof text !== "string") {
        console.error("Expected a string for newline replacement, but got:", text);
        return "";
      }
      return text.replace(/\n/g, "\\\\");
    };

    // General placeholder replacement
    for (let key in data) {
      if (typeof data[key] !== "object") {
        template = template.replace(new RegExp(`\\{${key}\\}`, "g"), replaceNewlines(data[key]));
      }
    }

    // Section-specific content generation
    const generateSectionContent = (items, type) => {
      return items.map(item => {
        switch (type) {
          case 'experience':
            return `\\subsection{${item.jobRole || ""}, ${item.companyName || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.summary || "")}`;
          case 'education':
            return `\\subsection{${item.degree || ""}, ${item.institution || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.description || "")}`;
          case 'projects':
            return `\\subsection{${item.name || ""} \\hfill ${item.date || ""}}\n${replaceNewlines(item.summary || "")}`;
          default:
            return "";
        }
      }).join("\n\\vspace{10pt}\n");
    };

    template = template.replace("{experienceDetails}", generateSectionContent(data.experience, 'experience'));
    template = template.replace("{educationDetails}", generateSectionContent(data.education, 'education'));
    template = template.replace("{projectDetails}", generateSectionContent(data.projects, 'projects'));

    return template;
  };

  const resumeTemplate3 = `
\\documentclass[11pt]{article}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\geometry{
  a4paper,
  top=1.8cm,
  bottom=1in,
  left=2.5cm,
  right=2.5cm
}

\\setcounter{secnumdepth}{0}
\\pdfgentounicode=1
\\usepackage[dvipsnames]{xcolor}
\\colorlet{icnclr}{gray}
\\usepackage{enumitem}
\\setlist[itemize]{
  noitemsep,
  left=0pt
}
\\setlist[description]{itemsep=0pt}
\\setlist[enumerate]{align=left, itemsep=0pt}

\\usepackage{titlesec}
\\titlespacing{\\section}{0pt}{*1}{*1}
\\titlespacing{\\subsection}{0pt}{*0}{*0}
\\titlespacing{\\subsubsection}{0pt}{*0}{*0}
\\titleformat{\\section}{\\color{Sepia}\\large\\bfseries\\uppercase}{}{0pt}{}[\\ruleafter]
\\titleformat{\\subsection}{\\large\\bfseries}{}{0pt}{}
\\titleformat{\\subsubsection}{\\large\\bfseries}{}{0pt}{\\vspace{-1.5ex}}

\\usepackage{xhfill}
\\newcommand\\ruleafter[1]{#1~\\xrfill[.5ex]{1pt}[gray]}

\\newif\\ifRemVS
\\newcommand{\\rvs}{
  \\ifRemVS
  \\vspace{-1.5ex}
  \\fi
  \\global\\RemVSfalse
}

\\usepackage{fontawesome5}
\\usepackage[bookmarks=false]{hyperref}
\\hypersetup{
  colorlinks=true,
  urlcolor=Sepia,
  pdftitle={My Resume},
}

\\usepackage[page]{totalcount}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\renewcommand{\\headrulewidth}{0pt}
\\fancyhf{}
\\cfoot{\\color{darkgray} My Resume -- Page \\thepage{} of \\totalpages}

\\begin{document}

\\begin{center}
    {\\fontsize{36}{36}\\selectfont \\textnormal{Name}} \\par
    \\bigskip

    {\\color{icnclr}\\texttt{@}} \\href{mailto:{email}}{{email}}
    \\hspace{0.5em} $|$ \\hspace{0.5em}
    {\\color{icnclr}\\texttt{\\faPhone}} \\href{tel:{phone}}{{phone}}

    \\hspace{0.5em} $|$ \\hspace{0.5em}
    {\\color{icnclr}\\faLinkedinIn} \\href{{linkedin}}{{linkedin}}
\\end{center}

\\vspace{20pt}

\\section{Education}
\\subsection{Institution Name, Degree, Year}
{educationDetails}

\\vspace{20pt}

\\section{Experience}
\\subsection{Job Title, Company Name, Dates}
{experienceDetails}

\\vspace{20pt}

\\section{Skills}
\\begin{itemize}
\\item {skills}
\\end{itemize}

\\vspace{20pt}

\\section{Projects}
\\subsection{Project Name, Date}
{projectDetails}

\\vspace{20pt}

\\section{Certifications \\& Awards}
\\begin{enumerate}[itemsep=0pt]
\\item {achievements}
\\end{enumerate}

\\end{document}
`;

  const resumeTemplate4 = `
\\documentclass{article}
\\usepackage{charter}
\\usepackage{tgadventor}
\\usepackage[letterspace=100]{microtype}
\\usepackage{soul}
\\usepackage[margin=1.5in,bottom=1.2in]{geometry}
\\setcounter{secnumdepth}{0}
\\usepackage{titlesec}
\\titlespacing{\\section}{0pt}{4ex}{1ex}
\\titlespacing{\\subsection}{0pt}{*1}{*0.5}
\\titlespacing{\\subsubsection}{0pt}{*0.5}{*1}
\\titleformat*{\\section}{\\titlerule\\smallskip\\footnotesize\\sffamily\\lsstyle\\uppercase}
\\titleformat*{\\subsection}{\\Large}
\\titleformat*{\\subsubsection}{\\large\\itshape}
\\usepackage{enumitem}
\\setlist[itemize]{left=0pt..2em,itemsep=0pt}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\renewcommand{\\headrulewidth}{0pt}
\\fancyhf{}
\\cfoot{\\sffamily\\lsstyle\\footnotesize MILKY R\\'ESUM\\'E — PAGE \\thepage{} OF 2}

\\begin{document}
\\begin{center}
{\\sffamily\\LARGE\\bfseries \\so{{name}}} \\par\\bigskip
\\sffamily\\footnotesize \\href{{linkedin}}{\\texttt{{linkedin}}} \\\\ \\medskip
\\href{tel:{phone}}{\\texttt{{phone}}} \\quad \\href{mailto:{email}}{\\texttt{{email}}} \\par\\bigskip
\\end{center}

\\vspace{20pt}

\\section{Education}
{educationDetails}

\\vspace{20pt}

\\section{Business Experience}
{experienceDetails}

\\vspace{20pt}

\\section{Skills}
{skillsDetails}

\\vspace{20pt}

\\section{Achievements}
{achievementsDetails}

\\vspace{20pt}

\\section{Projects}
{projectsDetails}

\\end{document}
`;


  const populateTemplate4 = (template, data) => {
    const replaceNewlines = (text) => {
      if (typeof text !== "string") {
        console.error("Expected a string for newline replacement, but got:", text);
        return "";
      }
      return text.replace(/\n/g, "\\\\");
    };

    const generateListContent = (items) => {
      if (!Array.isArray(items) || items.length === 0) {
        return ""; // Return an empty string if no items are provided
      }
      return `\\begin{itemize}\n` + items.map(item => `\\item ${replaceNewlines(item)}`).join("\n") + `\n\\end{itemize}`;
    };

    const generateSubsectionContent = (items, type) => {
      if (!Array.isArray(items) || items.length === 0) {
        console.warn(`No items found for ${type}: ${items}`);
        return ""; // Return an empty string if no items are provided
      }

      return items.map(item => {
        switch (type) {
          case 'experience':
            return `\\subsection{${item.jobRole || ""}, ${item.companyName || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.summary || "")}`;
          case 'education':
            return `\\subsection{${item.degree || ""}, ${item.institution || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.description || "")}`;
          case 'projects':
            return `\\subsection{${item.name || ""} \\hfill ${item.date || ""}}\n${replaceNewlines(item.description || "")}`;
          default:
            return "";
        }
      }).join("\n");
    };

    // Convert skills and achievements strings to arrays if they are comma-separated
    const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()) : [];
    const achievementsArray = data.achievements ? data.achievements.split(',').map(achievement => achievement.trim()) : [];

    // General placeholder replacement
    template = template.replace("{name}", replaceNewlines(data.name || ""));
    template = template.replace("{linkedin}", replaceNewlines(data.linkedin || ""));
    template = template.replace("{phone}", replaceNewlines(data.phone || ""));
    template = template.replace("{email}", replaceNewlines(data.email || ""));

    // Replace each section with its generated content
    template = template.replace("{educationDetails}", generateSubsectionContent(data.education, 'education'));
    template = template.replace("{experienceDetails}", generateSubsectionContent(data.experience, 'experience'));
    template = template.replace("{skillsDetails}", generateListContent(skillsArray));
    template = template.replace("{achievementsDetails}", generateListContent(achievementsArray));
    template = template.replace("{projectsDetails}", generateSubsectionContent(data.projects, 'projects'));

    return template;
  };



  const populateTemplate = (template, data) => {
    // Replace newlines with double backslashes for LaTeX
    const replaceNewlines = (text) => {
      if (typeof text !== "string") {
        console.error("Expected a string for newline replacement, but got:", text);
        return "";
      }
      return text.replace(/\n/g, "\\\\");
    };

    // Replace {VAR{key}} placeholders first
    template = template.replace(/\{VAR\{([^}]+)\}\}/g, (match, key) => {
      if (data.hasOwnProperty(key)) {
        return replaceNewlines(data[key]);
      } else {
        console.warn(`Key ${key} not found in data.`);
        return "";
      }
    });

    // Replace {key} placeholders
    for (let key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        for (let subKey in data[key]) {
          let re = new RegExp(`\\{${key}\\.${subKey}\\}`, "g");
          template = template.replace(re, replaceNewlines(data[key][subKey]));
        }
      } else if (Array.isArray(data[key])) {
        let re = new RegExp(`\\{${key}\\}`, "g");
        let arrayContent = "";
        data[key].forEach((item) => {
          if (typeof item === "object") {
            let itemContent = "";
            if (key === "experience") {
              itemContent = `
  \\resumeSubheading
    {${item.companyName || "N/A"}}{${item.startDate || "N/A"} -- ${item.endDate || "N/A"}}
    {${item.jobRole || "N/A"}}{}
    \\resumeItemListStart
      \\resumeItem{${replaceNewlines(item.summary || "N/A")}}
    \\resumeItemListEnd`;
            } else if (key === "education") {
              itemContent = `
  \\resumeSubheading
    {${item.institution || "N/A"}}{${item.startDate || "N/A"} -- ${item.endDate || "N/A"}}
    {${item.degree || "N/A"}}{}
    \\resumeItemListStart
      \\resumeItem{${replaceNewlines(item.description || "N/A")}}
    \\resumeItemListEnd`;
            } else if (key === "projects") {
              itemContent = `
  \\resumeProjectHeading
    {${item.name || "N/A"}}{${replaceNewlines(item.summary || "N/A")}}{${item.date || "N/A"}}`;
            }
            arrayContent += itemContent + "\n    ";
          } else {
            arrayContent += `\\resumeItem{${replaceNewlines(item || "N/A")}}\n    `;
          }
        });
        template = template.replace(re, arrayContent.trim());
      } else {
        let re = new RegExp(`\\{${key}\\}`, "g");
        template = template.replace(re, replaceNewlines(data[key] || "N/A"));
      }
    }

    return template;
  };

  const populateTemplate3 = (template, data) => {
    const replaceNewlines = (text) => {
      if (typeof text !== "string") {
        console.error("Expected a string for newline replacement, but got:", text);
        return "";
      }
      return text.replace(/\n/g, "\\\\");
    };

    // Replacing general placeholders like {name}, {email}, etc.
    for (let key in data) {
      if (typeof data[key] !== "object") {
        template = template.replace(new RegExp(`\\{${key}\\}`, "g"), replaceNewlines(data[key]));
      }
    }

    // Handling the experience, education, and project details
    const generateSectionContent = (items, type) => {
      return items.map(item => {
        switch (type) {
          case 'experience':
            return `\\subsection{${item.jobRole || ""}, ${item.companyName || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.summary || "")}`;
          case 'education':
            return `\\subsection{${item.degree || ""}, ${item.institution || ""} \\hfill ${item.startDate || ""} -- ${item.endDate || ""}}\n${replaceNewlines(item.description || "")}`;
          case 'projects':
            return `\\subsection{${item.name || ""} \\hfill ${item.date || ""}}\n${replaceNewlines(item.summary || "")}`;
          default:
            return "";
        }
      }).join("\n\\vspace{10pt}\n");
    };

    template = template.replace("{experienceDetails}", generateSectionContent(data.experience, 'experience'));
    template = template.replace("{educationDetails}", generateSectionContent(data.education, 'education'));
    template = template.replace("{projectDetails}", generateSectionContent(data.projects, 'projects'));

    return template;
  };


  const [selectedResumeType, setSelectedResumeType] = useState(1);

  // Function to handle resume type change
  const handleResumeTypeChange = (type) => {
    if (typeof type === 'number' && [1, 2, 3, 4].includes(type)) {
      setSelectedResumeType(type);
      console.log(`Resume type set to: ${type}`);
    } else {
      console.error(`Invalid resume type: ${type}`);
    }
  };


  // Function to handle the POST request and download the PDF
  const sendPostRequest = async (populatedResume) => {
    try {
      const response = await fetch("https://b5ba-2401-4900-1cbd-4d-e40d-46ba-3958-6678.ngrok-free.app/latex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latex_content: populatedResume }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to handle form validation, template selection, and triggering the PDF download
  const handlePrintJson = () => {
    if (validateForm()) {
      let populatedResume;
      switch (selectedResumeType) {
        case 1:
          populatedResume = populateTemplate(resumeTemplate1, userData);
          break;
        case 2:
          populatedResume = populateTemplate2(resumeTemplate2, userData);
          break;
        case 3:
          populatedResume = populateTemplate3(resumeTemplate3, userData);
          break;
        case 4:
          populatedResume = populateTemplate4(resumeTemplate4, userData);
          break;
        default:
          populatedResume = populateTemplate4(resumeTemplate1, userData);
      }

      console.log("Populated Resume for Template", selectedResumeType, ":", populatedResume);

      sendPostRequest(populatedResume);
    } else {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
      });
    }
  };


  return (
    <div className="flex flex-col gap-5">
      {/* Name and Email */}
      <ToastContainer />
      <div className="w-full">
        <div className="text-xl font-semibold text-gray-600">
          Choose Resume Type
        </div>
        <div className="mt-1 flex space-x-2">
          <button
            onClick={() => handleResumeTypeChange(1)}
            className={`px-4 py-2 border rounded-md ${selectedResumeType === 1
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
              } border-gray-300 focus:outline-none`}
          >
            1
          </button>
          <button
            onClick={() => handleResumeTypeChange(2)}
            className={`px-4 py-2 border rounded-md ${selectedResumeType === 2
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
              } border-gray-300 focus:outline-none`}
          >
            2
          </button>
          <button
            onClick={() => handleResumeTypeChange(3)}
            className={`px-4 py-2 border rounded-md ${selectedResumeType === 3
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
              } border-gray-300 focus:outline-none`}
          >
            3
          </button>
          <button
            onClick={() => handleResumeTypeChange(4)}
            className={`px-4 py-2 border rounded-md ${selectedResumeType === 4
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
              } border-gray-300 focus:outline-none`}
          >
            4
          </button>
        </div>
      </div>

      <div className="text-xl font-semibold text-gray-600">
        Enter your information
      </div>
      <Tabs p={0}>
        <TabList>
          <Tab>Personal</Tab>
          <Tab>Job</Tab>
          <Tab>Projects</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <div className="flex flex-row gap-5">
              <div className="w-full">
                <div className="text-xl font-semibold text-gray-600">Name<RequiredIndicator /></div>
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
                <div className="text-xl font-semibold text-gray-600">Email<RequiredIndicator /></div>
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
            <div className="flex flex-row gap-5 mt-5">
              <div className="w-full">
                <div className="text-xl font-semibold text-gray-600">
                  Phone Number*
                </div>
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
                <div className="text-xl font-semibold text-gray-600">
                  LinkedIn URL
                </div>
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
          </TabPanel>
          <TabPanel px={0}>
            {/* Job Role */}
            <div className="w-full">
              <div className="text-xl font-semibold text-gray-600">Job Role<RequiredIndicator /></div>
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
              <div className="text-xl font-semibold text-gray-600">
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
            <div className="flex flex-col md:flex-row gap-5">
              {/* Experience */}
              <div className="w-full mt-4">
                <div className="text-xl font-semibold text-gray-600">Experience<RequiredIndicator /></div>
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
                      onChange={(e) =>
                        handleChange(e, index, "experience", "jobRole")
                      }
                      value={exp.jobRole || ""}
                      placeholder="Job Role"
                      className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                    />
                    <div className="flex flex-col md:flex-row md:gap-3">
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
                      onChange={(e) =>
                        handleChange(e, index, "experience", "summary")
                      }
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
                      <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                        Add experience
                      </span>
                    </ShimmerButton>
                  </button>
                </div>
              </div>

              {/* Education */}
              <div className="w-full mt-4">
                <div className="text-xl font-semibold text-gray-600">Education<RequiredIndicator /></div>
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
                    <div className="flex flex-col md:flex-row md:gap-3">
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
                      <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                        Add education
                      </span>
                    </ShimmerButton>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel px={0}>
            {/* Projects */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full mt-4">
                <div className="text-xl font-semibold text-gray-600">Projects<RequiredIndicator /></div>
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
                      className="w-full p-2  border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                      rows="3"
                    />
                    <input
                      onChange={(e) => handleChange(e, index, "projects", "date")}
                      value={project.date || ""}
                      type="date"
                      placeholder="Date"
                      className="w-full p-2 mb-3 mt-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                    />
                  </div>
                ))}
                <div className="flex justify-center mt-3">
                  <button onClick={addProject} className="transition duration-300">
                    <ShimmerButton className="shadow-2xl">
                      <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                        Add projects
                      </span>
                    </ShimmerButton>
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div className="w-full mt-4">
                <div className="w-full">
                  <div className="text-xl font-semibold text-gray-600">Skills<RequiredIndicator /></div>
                  <div className="flex flex-row gap-5">
                    {((userData.skills || "").split(",") || []).map(
                      (skill, index) => (
                        <div key={index} className="mt-2">
                          <input
                            onChange={(e) => handleSkillChange(e, index)}
                            value={skill || ""}
                            placeholder="Skill"
                            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                          />
                        </div>
                      )
                    )}

                    <div className="flex justify-center ">
                      <button onClick={addSkill} className="transition duration-300">
                        <ShimmerButton className="shadow-2xl ">
                          <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                            Add Skills
                          </span>
                        </ShimmerButton>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="w-full mt-4">
                  <div className="text-xl font-semibold text-gray-600">
                    Achievements
                  </div>
                  <div className="mt-1">
                    <textarea
                      onChange={handleChange}
                      value={userData["achievements"] || ""}
                      name="achievements"
                      placeholder="Achievements (comma-separated)"
                      className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
                      rows="7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <div className="z-10 flex min-h-[5rem] items-center justify-center mt-5">
        <button onClick={handlePrintJson}>
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-xl">
              Get my resume
            </span>
          </ShimmerButton>
        </button>
      </div>
    </div>
  );
};

export default Personalinfo;