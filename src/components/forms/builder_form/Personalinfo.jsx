import { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../../context/StepperContext";
import ShimmerButton from "../../ui/shimmer-button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredIndicator from "../../ui/RequiredIndicator";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Spinner, Input, Tooltip } from "@chakra-ui/react";
import Ajv from "ajv";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const RESUME_TYPES = [
  { id: 1, name: "Classic", value: "classic", description: "Traditional resume layout" },
  { id: 2, name: "Modern CV", value: "moderncv", description: "Contemporary design with modern elements" },
  { id: 3, name: "SB2nov", value: "sb2nov", description: "Clean and minimal style" },
  { id: 4, name: "Engineering", value: "engineeringresumes", description: "Optimized for technical roles" }
];

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
    const { name, value } = e.target;
    
    setUserData(prev => {
      const newData = { ...prev };
      
      // Handle nested fields with dot notation
      if (name && !section) {
        const keys = name.split('.');
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }
      
      // Handle array fields
      if (section) {
        if (!newData[section]) newData[section] = [];
        if (!newData[section][index]) newData[section][index] = {};
        
        // Handle different array types based on schema
        switch(field) {
          case 'authors':
          case 'keywords':
          case 'courses':
            newData[section][index][field] = value.split(',')
              .map(item => item.trim())
              .filter(Boolean);
            break;
          case 'highlights':
            newData[section][index][field] = value.split('\n')
              .map(item => item.trim())
              .filter(Boolean);
            break;
          default:
            newData[section][index][field] = value;
        }
      }
      
      return newData;
    });
  };

  const handleProfileChange = (index, field, value) => {
    setUserData(prev => {
      const newData = { ...prev };
      if (!newData.basics) newData.basics = {};
      if (!newData.basics.profiles) newData.basics.profiles = [];
      newData.basics.profiles[index] = {
        ...newData.basics.profiles[index],
        [field]: value
      };
      return newData;
    });
  };

  const addProfile = () => {
    setUserData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        profiles: [...(prev.basics?.profiles || []), { network: '', username: '', url: '' }]
      }
    }));
  };

  const removeProfile = (index) => {
    setUserData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        profiles: prev.basics.profiles.filter((_, i) => i !== index)
      }
    }));
  };

  const addSectionItem = (section) => {
    setUserData(prev => {
      const newData = { ...prev };
      if (!newData[section]) newData[section] = [];
      
      const newItem = {
        work: { name: "", position: "", startDate: "", endDate: "", highlights: [] },
        education: { institution: "", area: "", studyType: "", startDate: "", endDate: "", score: "", courses: [] },
        projects: { name: "", startDate: "", highlights: [], url: "" },
        skills: { name: "", keywords: [] },
        languages: { language: "", fluency: "" },
        publications: { name: "", authors: [], releaseDate: "", url: "", doi: "" }
      }[section];

      newData[section].push(newItem);
      return newData;
    });
  };

  const removeSection = (section, index) => {
    setUserData(prev => {
      const newData = { ...prev };
      newData[section] = newData[section].filter((_, i) => i !== index);
      return newData;
    });
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
  
  
  const generateResumeJson = () => {
    // Helper to ensure arrays are properly formatted
    const formatArray = (arr, separator = ',') => {
      if (!arr) return [];
      if (Array.isArray(arr)) return arr;
      return arr.split(separator).map(item => item.trim()).filter(Boolean);
    };

    // Helper to ensure dates are in YYYY-MM format
    const formatDate = (date) => {
      if (!date) return '';
      return date.substring(0, 7); // Takes YYYY-MM from YYYY-MM-DD
    };

    return {
      basics: {
        name: userData.basics?.name || "",
        label: userData.basics?.label || "",
        image: userData.basics?.image || "",
        email: userData.basics?.email || "",
        phone: userData.basics?.phone?.replace(/[^\d+]/g, '') || "", // Clean phone number
        url: userData.basics?.url || "",
        summary: userData.basics?.summary || "",
        location: {
          address: userData.basics?.location?.address || "",
          postalCode: userData.basics?.location?.postalCode || "",
          city: userData.basics?.location?.city || "",
          countryCode: userData.basics?.location?.countryCode?.toUpperCase() || "", // Ensure uppercase
          region: userData.basics?.location?.region || "",
        },
        profiles: (userData.basics?.profiles || []).map((profile) => ({
          network: profile.network || "",
          username: profile.username || "",
          url: profile.url || "",
        })).filter(profile => profile.network || profile.username || profile.url),
      },
      work: (userData.work || []).map((job) => ({
        name: job.name || "",
        position: job.position || "",
        url: job.url || "",
        startDate: formatDate(job.startDate),
        endDate: formatDate(job.endDate),
        highlights: formatArray(job.highlights, '\n'),
        location: job.location || "",
      })).filter(job => job.name || job.position),
      education: (userData.education || []).map((edu) => ({
        institution: edu.institution || "",
        url: edu.url || "",
        area: edu.area || "",
        studyType: edu.studyType || "",
        startDate: formatDate(edu.startDate),
        endDate: formatDate(edu.endDate),
        score: edu.score || "",
        courses: formatArray(edu.courses),
      })).filter(edu => edu.institution || edu.area),
      languages: (userData.languages || []).map((lang) => ({
        language: lang.language || "",
        fluency: lang.fluency || "",
      })).filter(lang => lang.language),
      publications: (userData.publications || []).map((pub) => ({
        name: pub.name || "",
        authors: formatArray(pub.authors),
        releaseDate: formatDate(pub.releaseDate),
        url: pub.url || "",
        doi: pub.doi || "",
      })).filter(pub => pub.name),
      projects: (userData.projects || []).map((proj) => ({
        name: proj.name || "",
        startDate: formatDate(proj.startDate),
        highlights: formatArray(proj.highlights, '\n'),
        url: proj.url || "",
      })).filter(proj => proj.name),
      skills: (userData.skills || []).map((skillCategory) => ({
        name: skillCategory.name || "",
        keywords: formatArray(skillCategory.keywords),
      })).filter(skill => skill.name && skill.keywords.length > 0),
    };
  };
  
  
// Format phone number to match schema
const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  
  // Remove any non-digit characters except + 
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Add tel: prefix if not present
  if (cleaned.startsWith('tel:')) {
    return cleaned;
  }
  
  // Format number with hyphens for readability
  let formatted = cleaned;
  if (cleaned.startsWith('+')) {
    // International format: tel:+XX-XXX-XXX-XXXX
    const groups = cleaned.match(/^\+(\d{2})(\d{3})(\d{3})(\d{4})$/);
    if (groups) {
      formatted = `+${groups[1]}-${groups[2]}-${groups[3]}-${groups[4]}`;
    }
  }
  
  return `tel:${formatted}`;
};
// Format date to YYYY-MM format
const formatDate = (date) => {
  if (!date) return "";
  // If already in correct format, return as is
  if (/^\d{4}-\d{2}$/.test(date)) return date;
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  
  // Format as YYYY-MM
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${month}`;
};

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
    // Basic validation
    if (!userData.basics?.name) {
      toast.error("Please enter your full name", { position: "top-right" });
      return;
    }
    if (!userData.basics?.label) {
      toast.error("Please enter your professional title", { position: "top-right" });
      return;
    }
    if (!userData.basics?.email) {
      toast.error("Please enter your email", { position: "top-right" });
      return;
    }

    // Format the data
    const formattedData = formatDataForSubmission(userData);
    console.log(formattedData)
    
    // Additional validation
    if (!formattedData.work?.length) {
      toast.error("Please add at least one work experience", { position: "top-right" });
      return;
    }
    if (!formattedData.education?.length) {
      toast.error("Please add at least one education entry", { position: "top-right" });
      return;
    }
    if (!formattedData.skills?.length) {
      toast.error("Please add at least one skill category", { position: "top-right" });
      return;
    }

    // Send the formatted data
    sendPostRequest(formattedData);
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
  

  const validateData = (data) => {
    const errors = {};
    
    // Required fields validation
    if (!data.basics?.name) {
      errors.name = "Name is required";
    }
    
    // Email format validation
    if (data.basics?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.basics.email)) {
      errors.email = "Invalid email format";
    }
    
    // Phone format validation (E.164)
    if (data.basics?.phone && !/^\+?[1-9]\d{1,14}$/.test(data.basics.phone)) {
      errors.phone = "Invalid phone format. Use E.164 format (e.g., +1234567890)";
    }
    
    // URL format validation
    if (data.basics?.url && !/^https?:\/\/.+/.test(data.basics.url)) {
      errors.url = "Invalid URL format";
    }
    
    // Publications DOI format
    data.publications?.forEach((pub, index) => {
      if (pub.doi && !/^10\..+/.test(pub.doi)) {
        if (!errors.publications) errors.publications = {};
        errors.publications[index] = "Invalid DOI format";
      }
    });
    
    return errors;
  };
  

  const formatDataForSubmission = (userData) => {
    // Helper function to format dates according to schema pattern
    const formatDate = (date) => {
      if (!date) return "2024-01"; // Default to current year-month
      if (/^\d{4}-\d{2}$/.test(date)) return date;
      try {
        const d = new Date(date);
        return isNaN(d.getTime()) ? "2024-01" : 
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      } catch {
        return "2024-01";
      }
    };

    // Helper function to format URL
    const formatUrl = (url) => {
      if (!url) return "https://example.com"; // Default URL if empty
      try {
        new URL(url);
        return url;
      } catch {
        return url.startsWith('http') ? url : `https://${url}`;
      }
    };

    // Helper function to ensure array format
    const ensureArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      return value.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
    };

    return {
      basics: {
        name: userData.basics?.name || "Anonymous",
        label: userData.basics?.label || "Professional",
        image: userData.basics?.image || "https://example.com/photo.jpg",
        email: userData.basics?.email || "",
        phone: userData.basics?.phone || "",
        url: formatUrl(userData.basics?.url),
        summary: userData.basics?.summary || "",
        location: {
          address: userData.basics?.location?.address || "",
          postalCode: userData.basics?.location?.postalCode || "",
          city: userData.basics?.location?.city || "",
          countryCode: userData.basics?.location?.countryCode === "INDIA" ? "IN" : 
            (userData.basics?.location?.countryCode || "US"),
          region: userData.basics?.location?.region || ""
        },
        profiles: (userData.basics?.profiles || []).map(profile => ({
          network: profile.network || "",
          username: profile.username || "",
          url: formatUrl(profile.url)
        }))
      },
      work: (userData.work || []).map(job => ({
        name: job.name || "Company",
        position: job.position || "Position",
        url: formatUrl(job.url),
        startDate: formatDate(job.startDate),
        endDate: formatDate(job.endDate),
        highlights: ensureArray(job.highlights),
        location: job.location || ""
      })),
      education: (userData.education || []).map(edu => ({
        institution: edu.institution || "Institution",
        url: formatUrl(edu.url),
        area: edu.area || "Study Area",
        studyType: edu.studyType || "Degree",
        startDate: formatDate(edu.startDate),
        endDate: formatDate(edu.endDate),
        score: edu.score || "4.0",
        courses: ensureArray(edu.courses)
      })),
      publications: (userData.publications || []).map(pub => ({
        name: pub.name || "Publication Title",
        authors: ensureArray(pub.authors),
        releaseDate: formatDate(pub.releaseDate),
        url: formatUrl(pub.url),
        doi: pub.doi || ""
      })),
      projects: (userData.projects || []).map(proj => ({
        name: proj.name || "Project Name",
        startDate: formatDate(proj.startDate),
        highlights: ensureArray(proj.highlights),
        url: formatUrl(proj.url)
      })),
      skills: (userData.skills || []).map(skill => ({
        name: skill.name || "Skill Category",
        keywords: ensureArray(skill.keywords)
      }))
    };
  };
  
return (
  <div className="flex flex-col gap-5">
    {/* Name and Email */}
    <ToastContainer limit={1} />
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
  {/* Personal Information Section */}
  <div className="space-y-6">
    {/* Basic Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name <RequiredIndicator />
        </label>
        <input
          type="text"
          name="basics.name"
          value={userData.basics?.name || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Professional Title <RequiredIndicator />
        </label>
        <input
          type="text"
          name="basics.label"
          value={userData.basics?.label || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Senior Software Engineer"
        />
      </div>

      {/* Contact Information */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email <RequiredIndicator />
        </label>
        <input
          type="email"
          name="basics.email"
          value={userData.basics?.email || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone <RequiredIndicator />
        </label>
        <input
          type="tel"
          name="basics.phone"
          value={userData.basics?.phone || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="+1-234-567-8900"
        />
      </div>
    </div>

    {/* Location Information */}
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="basics.location.address"
          value={userData.basics?.location?.address || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="123 Main Street"
        />
        <input
          type="text"
          name="basics.location.city"
          value={userData.basics?.location?.city || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="San Francisco"
        />
        <input
          type="text"
          name="basics.location.region"
          value={userData.basics?.location?.region || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="California"
        />
        <input
          type="text"
          name="basics.location.postalCode"
          value={userData.basics?.location?.postalCode || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="94122"
        />
        <input
          type="text"
          name="basics.location.countryCode"
          value={userData.basics?.location?.countryCode || ""}
          onChange={(e) => handleChange(e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="US"
        />
      </div>
    </div>

    {/* Professional Summary */}
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
      <textarea
        name="basics.summary"
        value={userData.basics?.summary || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-md min-h-[100px]"
        placeholder="Brief professional summary highlighting your key experiences and skills..."
      />
    </div>

    {/* Social Profiles */}
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Social Profiles</h3>
      {(userData.basics?.profiles || []).map((profile, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <select
            value={profile.network || ""}
            onChange={(e) => handleProfileChange(index, "network", e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Select Network</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="GitHub">GitHub</option>
            <option value="Twitter">Twitter</option>
          </select>
          <Input
            placeholder="Username"
            value={profile.username || ""}
            onChange={(e) => handleProfileChange(index, "username", e.target.value)}
          />
          <Input
            placeholder="Profile URL"
            value={profile.url || ""}
            onChange={(e) => handleProfileChange(index, "url", e.target.value)}
          />
          <button 
            onClick={() => removeProfile(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        onClick={addProfile}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Profile
      </button>
    </div>
  </div>
</TabPanel>


        {/* Job Information */}
        <TabPanel px={0}>
  <div className="flex flex-col md:flex-row gap-5 mt-5">
    {/* Work Experience */}
    <div className="w-full">
      <div className="text-xl font-semibold text-gray-600 mb-4">
        Work Experience <RequiredIndicator />
      </div>
      
      <AnimatePresence initial={false}>
        {(userData.work || []).map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-6 border rounded-lg bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                onChange={(e) => handleChange(e, index, "work", "name")}
                value={job.name || ""}
                placeholder="Company Name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                onChange={(e) => handleChange(e, index, "work", "position")}
                value={job.position || ""}
                placeholder="Job Title"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="month"
                onChange={(e) => handleChange(e, index, "work", "startDate")}
                value={job.startDate || ""}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="month"
                onChange={(e) => handleChange(e, index, "work", "endDate")}
                value={job.endDate || ""}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              onChange={(e) => handleChange(e, index, "work", "highlights")}
              value={(job.highlights || []).join("\n")}
              placeholder="Key achievements and responsibilities (one per line)"
              className="w-full p-3 mt-4 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />

            <button
              onClick={() => removeSection("work", index)}
              className="mt-4 text-red-500 hover:text-red-700 flex items-center gap-2"
            >
              <FiTrash2 /> Remove Entry
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={() => addSectionItem("work")}
        className="w-full mt-4 p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md flex items-center justify-center gap-2"
      >
        <FiPlus /> Add Work Experience
      </button>
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
            value={Array.isArray(edu.courses) ? edu.courses.join(", ") : ""}
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
          value={Array.isArray(skillCategory.keywords) ? skillCategory.keywords.join(", ") : ""}
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
          value={Array.isArray(publication.authors) ? publication.authors.join(", ") : ""}
          placeholder="Authors (comma-separated)"
          className="w-full p-2 mb-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          rows="2"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            onChange={(e) => handleChange(e, index, "publications", "releaseDate")}
            value={publication.releaseDate || ""}
            className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
          <input
            onChange={(e) => handleChange(e, index, "publications", "url")}
            value={publication.url || ""}
            placeholder="URL"
            className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
          />
        </div>
        <input
          onChange={(e) => handleChange(e, index, "publications", "doi")}
          value={publication.doi || ""}
          placeholder="DOI"
          className="w-full p-2 mt-3 border rounded-md bg-white border-gray-300 text-gray-800 focus:outline-none"
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
    <div className="text-xl font-semibold text-gray-600 mb-3">
      Choose Template <RequiredIndicator />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {RESUME_TYPES.map((type) => (
        <Tooltip key={type.id} label={type.description}>
          <button
            onClick={() => handleResumeTypeChange(type.id)}
            className={`
              p-4 border rounded-lg transition-all duration-200
              ${selectedResumeType === type.value 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <div className="text-sm font-medium">{type.name}</div>
          </button>
        </Tooltip>
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