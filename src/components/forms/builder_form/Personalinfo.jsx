import { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../../context/StepperContext";
import ShimmerButton from "../../ui/shimmer-button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredIndicator from "../../ui/RequiredIndicator";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Spinner } from "@chakra-ui/react";
import Ajv from "ajv";

const Personalinfo = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedResumeType, setSelectedResumeType] = useState("classic");
  const [schema, setSchema] = useState(null);

  const ajv = new Ajv();

  // Define a custom "phone" format
  ajv.addFormat("phone", {
    type: "string",
    validate: (phoneNumber) =>
      /^\+?[1-9]\d{1,14}$/.test(phoneNumber), // E.164 international phone format
  });
  
  ajv.addFormat("color", {
    type: "string",
    validate: (color) =>
      /^#([0-9A-Fa-f]{3}){1,2}$|^rgb\((\d{1,3},\s?){2}\d{1,3}\)$/.test(color),
  });
  
 
  const handleChange = (e, index, section, field) => {
    const { value } = e.target;

    if (section) {
      const updatedSection = [...(userData[section] || [])];
      if (index !== undefined) {
        if (field === "startDate" || field === "endDate") {
          const item = updatedSection[index];
          const startDate = field === "startDate" ? value : item.startDate;
          const endDate = field === "endDate" ? value : item.endDate;

          if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            toast.error("Start date cannot be after end date", {
              position: "top-right",
            });
            return;
          }
        }
        updatedSection[index] = { ...updatedSection[index], [field]: value };
      }
      setUserData({ ...userData, [section]: updatedSection });
    } else {
      setUserData({ ...userData, [e.target.name]: value });
    }
  };

  const addSectionItem = (section) => {
    const updatedSection = [...(userData[section] || []), {}];
    setUserData({ ...userData, [section]: updatedSection });
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
    if (!userData.name) newErrors.name = "Name is required.";
    if (!userData.email) newErrors.email = "Email is required.";
    if (!userData.phone) newErrors.phone = "Phone number is required.";
    if (!userData.jobRole) newErrors.jobRole = "Job role is required.";
    if (!userData.experience || userData.experience.length === 0) {
      newErrors.experience = "At least one experience entry is required.";
    }
    if (!userData.education || userData.education.length === 0) {
      newErrors.education = "At least one education entry is required.";
    }
    if (!userData.projects || userData.projects.length === 0) {
      newErrors.projects = "At least one project is required.";
    }
    if (!userData.skills || userData.skills.trim().length === 0) {
      newErrors.skills = "At least one skill is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const fetchSchema = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://raw.githubusercontent.com/sinaatalay/rendercv/main/schema.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch schema: ${response.status}`);
  //     }
  //     const schemaJson = await response.json();
  //     setSchema(schemaJson);
  //   } catch (error) {
  //     console.error("Schema fetch error:", error.message);
  //     toast.error(
  //       `Failed to fetch validation schema: ${error.message}. Please check your internet connection and try again.`,
  //       { position: "top-right" }
  //     );
  //   }
  // };
  

  // const validateWithSchema = (resumeJson) => {
  //   if (!schema) {
  //     toast.error("Validation schema is not loaded. Try again later.", {
  //       position: "top-right",
  //     });
  //     return false;
  //   }
  
  //   const validate = ajv.compile(schema);
  //   const isValid = validate(resumeJson);
  
  //   if (!isValid) {
  //     console.error("Validation Errors:", validate.errors);
  //     toast.error(
  //       `Invalid input data. Errors: ${validate.errors
  //         .map((err) => `${err.instancePath} ${err.message}`)
  //         .join(", ")}`,
  //       {
  //         position: "top-right",
  //       }
  //     );
  //     return false;
  //   }
  //   return true;
  // };
  
  
  const generateResumeJson = () => ({
    basics: {
      name: userData.basics?.name || "",
      label: userData.basics?.label || "",
      image: userData.basics?.image || "",
      email: userData.basics?.email || "",
      phone: userData.basics?.phone || "",
      url: userData.basics?.url || "",
      summary: userData.basics?.summary || "",
      location: {
        address: userData.basics?.location?.address || "",
        postalCode: userData.basics?.location?.postalCode || "",
        city: userData.basics?.location?.city || "",
        countryCode: userData.basics?.location?.countryCode || "",
        region: userData.basics?.location?.region || "",
      },
      profiles: (userData.basics?.profiles || []).map((profile) => ({
        network: profile.network || "",
        username: profile.username || "",
        url: profile.url || "",
      })),
    },
    work: (userData.work || []).map((job) => ({
      name: job.name || "",
      position: job.position || "",
      url: job.url || "",
      startDate: job.startDate || "",
      endDate: job.endDate || "",
      highlights: job.highlights || [],
      location: job.location || "",
    })),
    education: (userData.education || []).map((edu) => ({
      institution: edu.institution || "",
      url: edu.url || "",
      area: edu.area || "",
      studyType: edu.studyType || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
      score: edu.score || "",
      courses: edu.courses || [],
    })),
    languages: (userData.languages || []).map((lang) => ({
      language: lang.language || "",
      fluency: lang.fluency || "",
    })),
    publications: (userData.publications || []).map((pub) => ({
      name: pub.name || "",
      authors: pub.authors || [],
      releaseDate: pub.releaseDate || "",
      url: pub.url || "",
      doi: pub.doi || "",
    })),
    projects: (userData.projects || []).map((proj) => ({
      name: proj.name || "",
      startDate: proj.startDate || "",
      highlights: proj.highlights || [],
      url: proj.url || "",
    })),
    skills: (userData.skills || []).map((skillCategory) => ({
      name: skillCategory.name || "",
      keywords: skillCategory.keywords || [],
    })),
  });
  
  

  const sendPostRequest = async (resumeJson) => {
    try {
      setLoading(true);

      const validThemes = ["classic", "moderncv", "sb2nov", "engineeringresumes"];
      if (!validThemes.includes(selectedResumeType)) {
        throw new Error(`Invalid resume type: ${selectedResumeType}`);
      }

      console.log("Resume JSON being sent:", JSON.stringify(resumeJson, null, 2));
      
//     const data = {"basics": {
//     "name": "test",
//     "label": "Senior Software Engineer",
//     "image": "https://example.com/johndoe.jpg",
//     "email": "john.doe@email.com",
//     "phone": "tel:+90-541-999-99-99",
//     "url": "https://johndoe.com",
//     "summary": "Experienced software engineer with 8+ years of experience in full-stack development. Specialized in building scalable web applications and microservices architecture. Strong focus on clean code and best practices.",
//     "location": {
//       "address": "123 Main Street",
//       "postalCode": "94122",
//       "city": "San Francisco",
//       "countryCode": "US",
//       "region": "California"
//     },
//     "profiles": [
//       {
//         "network": "LinkedIn",
//         "username": "johndoe",
//         "url": "https://linkedin.com/in/johndoe"
//       },
//       {
//         "network": "GitHub",
//         "username": "johndoe",
//         "url": "https://github.com/johndoe"
//       }
//     ]
//   },
//   "work": [
//     {
//       "name": "Tech Solutions Inc",
//       "position": "Senior Software Engineer",
//       "url": "https://techsolutions.com",
//       "startDate": "2020-01",
//       "endDate": "2023-12",
//       "highlights": [
//         "Architected and implemented microservices-based platform reducing deployment time by 60%",
//         "Led a team of 5 developers in successful delivery of a major client project",
//         "Implemented CI/CD pipeline reducing deployment errors by 45%"
//       ]
//     },
//     {
//       "name": "Apple",
//       "position": "Software Engineer",
//       "location": "Cupertino, CA",
//       "startDate": "2005-06",
//       "endDate": "2007-08",
//       "highlights": [
//         "Reduced time to render user buddy lists by 75% by implementing a prediction algorithm",
//         "Integrated iChat with Spotlight Search",
//         "Redesigned chat file format and implemented backward compatibility"
//       ]
//     }
//   ],
//   "education": [
//     {
//       "institution": "University of California, Berkeley",
//       "url": "https://berkeley.edu",
//       "area": "Computer Science",
//       "studyType": "Bachelor",
//       "startDate": "2012-09",
//       "endDate": "2016-06",
//       "score": "3.8/4.0",
//       "courses": [
//         "Advanced Algorithms",
//         "Distributed Systems",
//         "Machine Learning"
//       ]
//     }
//   ],
  
//   "languages": [
//     {
//       "language": "English",
//       "fluency": "Native speaker"
//     },
//     {
//       "language": "Spanish",
//       "fluency": "Professional working proficiency"
//     }
//   ],
//     "publications": [
//     {
//       "name": "Machine Learning in Distributed Systems",
//       "authors": [
//         "**Jane Smith**",
//         "John Doe",
//         "Alice Johnson"
//       ],
//       "releaseDate": "2022-06",
//       "url": "https://example.com/paper",
//       "doi": "10.1234/example.2022"
//     },   {
//       "name": "Machine Learning in Distributed Systems",
//       "authors": [
//         "**Jane Smith**",
//         "John Doe",
//         "Alice Johnson"
//       ],
//       "releaseDate": "2022-06",
//       "url": "https://example.com/paper",
//       "doi": "10.1234/example.2022"
//     }
//   ],
//   "projects": [
//     {
//   "name": "Project Name",
//   "startDate": "2022-03",
//   "highlights": ["Point 1", "Point 2"],
//   "url": "github.com/link"
// },
//   {
//   "name": "Project Name",
//   "startDate": "2022-03",
//   "highlights": ["Point 1", "Point 2"],
//   "url": "github.com/link"
// }
//   ],
  
 
//   "skills": [
//     {
//       "name": "Languages",
//       "keywords": ["C++", "C", "Java", "Objective-C", "C#", "SQL", "JavaScript"]
//     },
//     {
//       "name": "Technologies",
//       "keywords": [".NET", "Microsoft SQL Server", "XCode", "Interface Builder"]
//     }
//   ]
// }
      const response = await fetch(
        `https://api.fintervue.com/render_resume?theme=${selectedResumeType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeJson),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Server Error Details:", errorDetails);
        throw new Error(`Server Error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Failed to generate resume: ${error.message}`, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResume = () => {
    // if (!schema) {
    //   toast.error("Validation schema not loaded. Please try again later.", {
    //     position: "top-right",
    //   });
    //   return;
    // }
  
    if (1) {
      const resumeJson = generateResumeJson();
  
      // if (!validateWithSchema(resumeJson)) {
      //   toast.error("Resume JSON does not meet schema requirements.", {
      //     position: "top-right",
      //   });
      //   return;
      // }
  
      sendPostRequest(resumeJson);
    } else {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
      });
    }
  };
  

  const handleResumeTypeChange = (type) => {
    const resumeTypeMap = {
      1: "classic",
      2: "moderncv",
      3: "sb2nov",
      4: "engineeringresumes",
    };
    setSelectedResumeType(resumeTypeMap[type]);
  };

  // useEffect(() => {
  //   fetchSchema();
  // }, []);
  
return (
  <div className="flex flex-col gap-5">
    {/* Name and Email */}
    <ToastContainer />
    <div className="text-xl font-semibold text-gray-600">Enter your information</div>
    <Tabs p={0}>
      <TabList>
        <Tab>Personal</Tab>
        <Tab>Job</Tab>
        <Tab>Projects</Tab>
      </TabList>
      <TabPanels>
        {/* Personal Information */}
        {/* Personal Information */}
<TabPanel px={0}>
  <div className="flex flex-row gap-5">
    {/* Name */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Name <RequiredIndicator /></div>
      <div className="mt-1">
        <input
          onChange={handleChange}
          value={userData.basics?.name || ""}
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
    {/* Label */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Position <RequiredIndicator /></div>
      <div className="mt-1">
        <input
          onChange={handleChange}
          value={userData.basics?.label || ""}
          name="label"
          placeholder="e.g., Senior Software Engineer"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  </div>

  <div className="flex flex-row gap-5 mt-5">
    {/* Email */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Email <RequiredIndicator /></div>
      <div className="mt-1">
        <input
          onChange={handleChange}
          value={userData.basics?.email || ""}
          name="email"
          type="email"
          placeholder="e.g., john.doe@email.com"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
    {/* Phone */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Phone Number <RequiredIndicator /></div>
      <div className="mt-1">
        <input
          onChange={handleChange}
          value={userData.basics?.phone || ""}
          name="phone"
          type="tel"
          placeholder="+90-541-999-99-99"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  </div>
  <div className="flex flex-row gap-5 mt-5">
    {/* LinkedIn */}
    <div className="w-full">
        <div className="text-xl font-semibold text-gray-600">LinkedIn URL</div>
        <div className="mt-1">
          <input
            onChange={(e) => handleChange(e, 0, "basics.profiles", "url")}
            value={
              userData.basics?.profiles?.[0]?.url || "https://linkedin.com/in/"
            }
            name="linkedin"
            type="url"
            placeholder="LinkedIn Profile URL"
            className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      {/* GitHub */}
      <div className="w-full">
        <div className="text-xl font-semibold text-gray-600">GitHub URL</div>
        <div className="mt-1">
          <input
            onChange={(e) => handleChange(e, 1, "basics.profiles", "url")}
            value={
              userData.basics?.profiles?.[1]?.url || "https://github.com/"
            }
            name="github"
            type="url"
            placeholder="GitHub Profile URL"
            className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
        </div>
      </div>
    </div>

  <div className="flex flex-row gap-5 mt-5">
    {/* URL */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">URL</div>
      <div className="mt-1">
        <input
          onChange={handleChange}
          value={userData.basics?.url || ""}
          name="url"
          type="url"
          placeholder="e.g., https://johndoe.com"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  </div>

  

  <div className="flex flex-col mt-5">
    {/* Summary */}
    <div className="text-xl font-semibold text-gray-600">Summary <RequiredIndicator /></div>
    <div className="mt-1">
      <textarea
        onChange={handleChange}
        value={userData.basics?.summary || ""}
        name="summary"
        placeholder="Brief professional summary"
        className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        rows="4"
      />
    </div>
  </div>

  <div className="mt-5">
    {/* Location */}
    <div className="text-xl font-semibold text-gray-600">Location <RequiredIndicator /></div>
    <div className="flex flex-row gap-5 mt-1">
      <div className="w-full">
        <input
          onChange={(e) => handleChange(e, null, "basics", "location.address")}
          value={userData.basics?.location?.address || ""}
          name="address"
          placeholder="Address"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
      <div className="w-full">
        <input
          onChange={(e) => handleChange(e, null, "basics", "location.city")}
          value={userData.basics?.location?.city || ""}
          name="city"
          placeholder="City"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
    <div className="flex flex-row gap-5 mt-2">
      <div className="w-full">
        <input
          onChange={(e) => handleChange(e, null, "basics", "location.postalCode")}
          value={userData.basics?.location?.postalCode || ""}
          name="postalCode"
          placeholder="Postal Code"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
      <div className="w-full">
        <input
          onChange={(e) => handleChange(e, null, "basics", "location.region")}
          value={userData.basics?.location?.region || ""}
          name="region"
          placeholder="State/Region"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
    <div className="flex flex-row gap-5 mt-2">
      <div className="w-full">
        <input
          onChange={(e) => handleChange(e, null, "basics", "location.countryCode")}
          value={userData.basics?.location?.countryCode || ""}
          name="countryCode"
          placeholder="Country Code (e.g., US)"
          className="w-full p-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  </div>
</TabPanel>


        {/* Job Information */}
        <TabPanel px={0}>
  <div className="flex flex-col md:flex-row gap-5 mt-5">
    {/* Work Experience */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Work Experience<RequiredIndicator /></div>
      {(userData.work || []).map((job, index) => (
        <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
          <input
            onChange={(e) => handleChange(e, index, "work", "name")}
            value={job.name || ""}
            placeholder="Company Name"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "work", "position")}
            value={job.position || ""}
            placeholder="Job Role"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "work", "url")}
            value={job.url || ""}
            placeholder="Company URL"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "work", "location")}
            value={job.location || ""}
            placeholder="Location"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <div className="flex flex-col md:flex-row md:gap-3">
            <input
              onChange={(e) => handleChange(e, index, "work", "startDate")}
              value={job.startDate || ""}
              type="date"
              placeholder="Start Date"
              className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            />
            <input
              onChange={(e) => handleChange(e, index, "work", "endDate")}
              value={job.endDate || ""}
              type="date"
              placeholder="End Date"
              className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            />
          </div>
          <textarea
            onChange={(e) => handleChange(e, index, "work", "highlights")}
            value={(job.highlights || []).join("\n")}
            placeholder="Key Highlights (one per line)"
            className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            rows="3"
          />
        </div>
      ))}
      <div className="flex justify-center mt-3">
        <button onClick={() => addSectionItem("work")} className="transition duration-300">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
              Add Job
            </span>
          </ShimmerButton>
        </button>
      </div>
    </div>

    {/* Education */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600">Education <RequiredIndicator /></div>
      {(userData.education || []).map((edu, index) => (
        <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
          <input
            onChange={(e) => handleChange(e, index, "education", "institution")}
            value={edu.institution || ""}
            placeholder="Institution Name"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "education", "url")}
            value={edu.url || ""}
            placeholder="Institution URL"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "education", "area")}
            value={edu.area || ""}
            placeholder="Field of Study"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "education", "studyType")}
            value={edu.studyType || ""}
            placeholder="Degree Type"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <div className="flex flex-col md:flex-row md:gap-3">
            <input
              onChange={(e) => handleChange(e, index, "education", "startDate")}
              value={edu.startDate || ""}
              type="date"
              placeholder="Start Date"
              className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            />
            <input
              onChange={(e) => handleChange(e, index, "education", "endDate")}
              value={edu.endDate || ""}
              type="date"
              placeholder="End Date"
              className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            />
          </div>
          <input
            onChange={(e) => handleChange(e, index, "education", "score")}
            value={edu.score || ""}
            placeholder="Score"
            className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <textarea
            onChange={(e) => handleChange(e, index, "education", "courses")}
            value={(edu.courses || []).join(", ")}
            placeholder="Courses (comma-separated)"
            className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
            rows="3"
          />
        </div>
      ))}
      <div className="flex justify-center mt-3">
        <button onClick={() => addSectionItem("education")} className="transition duration-300">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
              Add Education
            </span>
          </ShimmerButton>
        </button>
      </div>
    </div>
  </div>
</TabPanel>


<TabPanel px={0}>
  {/* Projects */}
  <div className="w-full mt-4">
    <div className="text-xl font-semibold text-gray-600">Projects <RequiredIndicator /></div>
    {(userData.projects || []).map((project, index) => (
      <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
        <input
          onChange={(e) => handleChange(e, index, "projects", "name")}
          value={project.name || ""}
          placeholder="Project Name"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e, index, "projects", "startDate")}
          value={project.startDate || ""}
          type="date"
          placeholder="Start Date"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <textarea
          onChange={(e) => handleChange(e, index, "projects", "highlights")}
          value={(project.highlights || []).join("\n")}
          placeholder="Highlights (one per line)"
          className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          rows="3"
        />
        <input
          onChange={(e) => handleChange(e, index, "projects", "url")}
          value={project.url || ""}
          placeholder="Project URL"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    ))}
    <div className="flex justify-center mt-3">
      <button onClick={() => addSectionItem("projects")} className="transition duration-300">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
            Add Project
          </span>
        </ShimmerButton>
      </button>
    </div>
  </div>

  {/* Skills */}
  <div className="w-full mt-4">
    <div className="text-xl font-semibold text-gray-600">Skills<RequiredIndicator /></div>
    {(userData.skills || []).map((skillCategory, index) => (
      <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
        <input
          onChange={(e) => handleChange(e, index, "skills", "name")}
          value={skillCategory.name || ""}
          placeholder="Skill Category (e.g., Languages, Technologies)"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <textarea
          onChange={(e) => handleChange(e, index, "skills", "keywords")}
          value={(skillCategory.keywords || []).join(", ")}
          placeholder="Skills (comma-separated)"
          className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          rows="3"
        />
      </div>
    ))}
    <div className="flex justify-center mt-3">
      <button onClick={() => addSectionItem("skills")} className="transition duration-300">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
            Add Skill Category
          </span>
        </ShimmerButton>
      </button>
    </div>
  </div>

  {/* Languages */}
  <div className="w-full mt-4">
    <div className="text-xl font-semibold text-gray-600">Languages<RequiredIndicator /></div>
    {(userData.languages || []).map((language, index) => (
      <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
        <input
          onChange={(e) => handleChange(e, index, "languages", "language")}
          value={language.language || ""}
          placeholder="Language"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e, index, "languages", "fluency")}
          value={language.fluency || ""}
          placeholder="Fluency (e.g., Native Speaker, Professional Proficiency)"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    ))}
    <div className="flex justify-center mt-3">
      <button onClick={() => addSectionItem("languages")} className="transition duration-300">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
            Add Language
          </span>
        </ShimmerButton>
      </button>
    </div>
  </div>

  {/* Publications */}
  <div className="w-full mt-4">
    <div className="text-xl font-semibold text-gray-600">Publications</div>
    {(userData.publications || []).map((publication, index) => (
      <div key={index} className="mt-3 p-4 border rounded-md bg-white border-gray-300">
        <input
          onChange={(e) => handleChange(e, index, "publications", "name")}
          value={publication.name || ""}
          placeholder="Publication Title"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <textarea
          onChange={(e) => handleChange(e, index, "publications", "authors")}
          value={(publication.authors || []).join(", ")}
          placeholder="Authors (comma-separated)"
          className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          rows="3"
        />
        <input
          onChange={(e) => handleChange(e, index, "publications", "releaseDate")}
          value={publication.releaseDate || ""}
          type="date"
          placeholder="Release Date"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e, index, "publications", "url")}
          value={publication.url || ""}
          placeholder="Publication URL"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e, index, "publications", "doi")}
          value={publication.doi || ""}
          placeholder="DOI"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
        />
      </div>
    ))}
    <div className="flex justify-center mt-3">
      <button onClick={() => addSectionItem("publications")} className="transition duration-300">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
            Add Publication
          </span>
        </ShimmerButton>
      </button>
    </div>
  </div>
</TabPanel>

      </TabPanels>
    </Tabs>

    <div className="z-10 mb-4 flex flex-col md:flex-row gap-4 min-h-[5rem] md:items-center justify-center mt-5">
  <div className="w-full">
    <div className="text-xl font-semibold text-gray-600">Choose Resume Type <RequiredIndicator /></div>
    <div className="mt-1 flex space-x-2">
      {[1, 2, 3, 4].map((type) => (
        <button
          key={type}
          onClick={() => handleResumeTypeChange(type)}
          className={`px-4 py-2 border rounded-md ${
            selectedResumeType === ["classic", "moderncv", "sb2nov", "engineeringresumes"][type - 1]
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          } border-gray-300 focus:outline-none`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
  <ShimmerButton
  className="shadow-2xl w-[220px]"
  onClick={handleGenerateResume}
  disabled={loading}
>
  {loading ? (
    <Spinner size="sm" color="white" />
  ) : (
    <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-xl">
      Get my resume
    </span>
  )}
</ShimmerButton>

</div>

    {loading && (
      <div className="mt-4">
        <Spinner size="lg" color="teal.500" />
      </div>
    )}
  </div>
);
};

export default Personalinfo;