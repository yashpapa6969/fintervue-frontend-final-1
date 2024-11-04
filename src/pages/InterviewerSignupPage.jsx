import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import InterviewerSignupForm from "../components/forms/InterviewerSignupForm";
import {
 FrontendIcon1,
 FrontendIcon2,
 FrontendIcon3,
 FrontendIcon4,
 FrontendIcon5,
 FrontendIcon6,
 FrontendIcon7,
 FrontendIcon8,
 FrontendIcon9,
 FrontendIcon10,
 FrontendIcon11,
 FrontendIcon12,
 FrontendIcon13,
 FrontendIcon14,
 FrontendIcon15,
} from "../assests/Domain_images";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';


const InterviewerSignupPage = () => {
 const toast = useToast();
 const navigate = useNavigate();


 const [loading, setLoading] = useState(false);
 const [currentStep, setCurrentStep] = useState(1);
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedProcesses, setSelectedProcesses] = useState([]);
 const [selectedDays, setSelectedDays] = useState([]);
 const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
 const [interviewerData, setInterviewerData] = useState({
   firstName: "",
   lastName: "",
   phoneNumber: "",
   resume: "",
   email: "",
   password: "",
   linkedInProfile: "",
   industryExpertise: [],
   availability: {
     availableDays: [],
     availableTimeSlots: [],
   },
 });
 const [errors, setErrors] = useState({});


 const handleDomainSelection = (profileId) => {
   setSelectedProcesses((prevSelected) => {
     if (prevSelected.includes(profileId)) {
       const updatedSelections = prevSelected.filter((id) => id !== profileId);
       updateIndustryExpertise(updatedSelections);
       return updatedSelections;
     } else {
       const updatedSelections = [...prevSelected, profileId];
       updateIndustryExpertise(updatedSelections);
       return updatedSelections;
     }
   });
 };


 const updateIndustryExpertise = (updatedSelections) => {
   const selectedDomains = profiles
     .filter((profile) => updatedSelections.includes(profile.id))
     .map((profile) => profile.name);


   setInterviewerData((prevData) => ({
     ...prevData,
     industryExpertise: selectedDomains,
   }));
 };


 const validateForm = () => {
   const newErrors = {};
   let isValid = true;


   if (!interviewerData.email || !/\S+@\S+\.\S+/.test(interviewerData.email)) {
     newErrors.email = "Please enter a valid email address.";
     isValid = false;
   }
   if (!interviewerData.phoneNumber || !/^\d{10}$/.test(interviewerData.phoneNumber)) {
     newErrors.phoneNumber = "Please enter a valid phone number.";
     isValid = false;
   }
   if (!interviewerData.linkedInProfile) {
     newErrors.linkedInProfile = "Please enter a valid LinkedIn profile.";
     isValid = false;
   }
   if (!interviewerData.firstName) {
     newErrors.firstName = "Please enter your first name.";
     isValid = false;
   }
   if (!interviewerData.lastName) {
     newErrors.lastName = "Please enter your last name.";
     isValid = false;
   }
   if (!interviewerData.password) {
     newErrors.password = "Please enter your password.";
     isValid = false;
   }
   setErrors(newErrors);
   return isValid;
 };


 const AvailabilitySelector = () => {
   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   const timeSlots = ["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];


   const toggleDaySelection = (day) => {
     setSelectedDays((prev) => {
       const newSelection = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
       setInterviewerData((prevData) => ({
         ...prevData,
         availability: {
           ...prevData.availability,
           availableDays: newSelection,
         },
       }));
       return newSelection;
     });
   };


   const toggleTimeSlotSelection = (timeSlot) => {
     setSelectedTimeSlots((prev) => {
       const newSelection = prev.includes(timeSlot) ? prev.filter((t) => t !== timeSlot) : [...prev, timeSlot];
       setInterviewerData((prevData) => ({
         ...prevData,
         availability: {
           ...prevData.availability,
           availableTimeSlots: newSelection,
         },
       }));
       return newSelection;
     });
   };


   return (
     <div className="flex flex-col gap-8 mt-6 w-full">
       <div className="w-full">
         <h2 className="text-lg font-semibold mb-4 text-blue-900">Choose Your Available Days</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
           {daysOfWeek.map((day) => (
             <button
               key={day}
               onClick={() => toggleDaySelection(day)}
               className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                 ${
                   selectedDays.includes(day)
                     ? "bg-blue-600 text-white"
                     : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                 }`}
             >
               {day}
             </button>
           ))}
         </div>
       </div>


       <div className="w-full">
         <h2 className="text-lg font-semibold mb-4 text-blue-900">Choose Your Available Time Slots</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
           {timeSlots.map((slot) => (
             <button
               key={slot}
               onClick={() => toggleTimeSlotSelection(slot)}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                 selectedTimeSlots.includes(slot)
                   ? "bg-blue-600 text-white"
                   : "bg-gray-100 text-gray-700 hover:bg-blue-100"
               }`}
             >
               {slot}
             </button>
           ))}
         </div>
       </div>
     </div>
   );
 };


 const profiles = [
   { id: 1, category: "Corporate Finance", name: "Corporate Finance", icon: FrontendIcon1 },
   { id: 2, category: "Investment Banking", name: "Investment Banking", icon: FrontendIcon2 },
   { id: 3, category: "Asset Management and Wealth Management", name: "Asset Management and Wealth Management", icon: FrontendIcon3 },
   { id: 4, category: "Risk Management", name: "Risk Management", icon: FrontendIcon4 },
   { id: 5, category: "Accounting and Auditing", name: "Accounting and Auditing", icon: FrontendIcon5 },
   { id: 6, category: "Financial Advisory", name: "Financial Advisory", icon: FrontendIcon6 },
   { id: 7, category: "Banking and Financial Services", name: "Banking and Financial Services", icon: FrontendIcon7 },
   { id: 8, category: "Financial Technology (FinTech)", name: "Financial Technology (FinTech)", icon: FrontendIcon8 },
   { id: 9, category: "Insurance", name: "Insurance", icon: FrontendIcon9 },
   { id: 10, category: "Real Estate Finance", name: "Real Estate Finance", icon: FrontendIcon10 },
   { id: 11, category: "Treasury and Cash Management", name: "Treasury and Cash Management", icon: FrontendIcon11 },
   { id: 12, category: "Quantitative Finance", name: "Quantitative Finance", icon: FrontendIcon12 },
   { id: 13, category: "Compliance and Regulatory Roles", name: "Compliance and Regulatory Roles", icon: FrontendIcon13 },
   { id: 14, category: "Financial Journalism and Research", name: "Financial Journalism and Research", icon: FrontendIcon14 },
   { id: 15, category: "Taxation", name: "Taxation", icon: FrontendIcon15 },
 ];


 const filteredProfiles = profiles.filter((profile) =>
   profile.name.toLowerCase().includes(searchTerm.toLowerCase())
 );


 const handleChange = (key, value) => {
   setInterviewerData((prevData) => ({
     ...prevData,
     [key]: value,
   }));
 };


 const handleSubmit = async () => {
   const canRegister = validateForm();
   if (!canRegister) return;


   try {
     setLoading(true);
    
     // Create FormData object
     const formData = new FormData();
    
     // Add all the interviewer data fields
     Object.keys(interviewerData).forEach(key => {
       if (key === 'availability') {
         // Handle nested availability object
         formData.append('availableDays', JSON.stringify(interviewerData.availability.availableDays));
         formData.append('availableTimeSlots', JSON.stringify(interviewerData.availability.availableTimeSlots));
       } else if (key === 'industryExpertise') {
         // Handle array
         formData.append('industryExpertise', JSON.stringify(interviewerData.industryExpertise));
       } else if (key === 'resume') {
         // Handle resume file - only append if a file exists
         if (interviewerData[key] instanceof File) {
           formData.append('resume', interviewerData[key], interviewerData[key].name);
         }
       } else {
         formData.append(key, interviewerData[key]);
       }
     });


     const result = await axios.post(
       `${config.apiBaseUrl}/api/interviewer/AddInterviewer`,
       formData,
       {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       }
     );
     if (result.status === 201) {
       toast({
         title: "Welcome",
         description: "Successfully registered interviewer.",
         variant: "top-accent",
         status: "success",
         isClosable: true,
       });
       navigate("/login/interviewer");
       return;
     }
   } catch (error) {
     setLoading(false);
     toast({
       title: "Error",
       description: `${error.message}`,
       variant: "top-accent",
       status: "error",
       isClosable: true,
     });
     return;
   }
   setLoading(false);
   toast({
     title: "Error",
     description: "Something went wrong. Please try again.",
     variant: "top-accent",
     status: "error",
     isClosable: true,
   });
 };


 // Update the handleFileChange function to properly handle file objects
 const handleFileChange = (key, event) => {
   const file = event.target.files[0];
   if (file) {
     // Validate file type if it's a resume
     if (key === 'resume') {
       const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
       if (!allowedTypes.includes(file.type)) {
         toast({
           title: "Invalid file type",
           description: "Please upload a PDF or Word document",
           status: "error",
           isClosable: true,
         });
         return;
       }
       // Optional: Check file size (e.g., 5MB limit)
       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
       if (file.size > maxSize) {
         toast({
           title: "File too large",
           description: "Please upload a file smaller than 5MB",
           status: "error",
           isClosable: true,
         });
         return;
       }
     }
    
     setInterviewerData(prevData => ({
       ...prevData,
       [key]: file
     }));
   }
 };


 return (
   <div className="h-full min-h-screen flex items-center justify-center p-4 bg-gray-50">
     <div className="w-full max-w-[1200px] flex flex-col items-center justify-center bg-white shadow-xl p-8 rounded-lg">
       <LoadingBar color="blue" progress={33.33 * (currentStep - 1)} />


       {currentStep === 1 ? (
         <div className="flex flex-col items-center w-full gap-6">
           <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">
             Step 1: <span className="text-blue-900">Choose Your Expertise</span>
           </h1>
           <p className="text-lg md:text-xl text-gray-500 font-light">
             Build your profile to conduct finance interviews and share your knowledge
           </p>


           <div className="w-full">
             <input
               type="text"
               placeholder="Search Domain"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
             />
           </div>


           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full p-5">
             {filteredProfiles.map((profile) => (
               <div
                 key={profile.id}
                 onClick={() => handleDomainSelection(profile.id)}
                 className={`border-2 ${
                   selectedProcesses.includes(profile.id)
                     ? "border-blue-600 bg-blue-50"
                     : "border-gray-200"
                 } rounded-lg cursor-pointer p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-md`}
               >
                 <img
                   src={profile.icon}
                   alt={profile.name}
                   className="w-12 h-12 mb-2"
                 />
                 <h3 className="text-center text-sm md:text-lg font-semibold text-gray-800">
                   {profile.name}
                 </h3>
               </div>
             ))}
           </div>
         </div>
       ) : currentStep === 2 ? (
         <div className="flex flex-col items-center w-full gap-6">
           <div className="text-center space-y-2">
             <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">
               Complete Your <span className="text-blue-900">Fintervue Profile</span>
             </h3>
             <p className="text-lg md:text-xl text-gray-500 font-light">
               Help organizations find the right finance talent
             </p>
           </div>


           <div className="w-full">
             <AvailabilitySelector />
           </div>


           <div className="w-full max-w-[800px]">
             <InterviewerSignupForm
               formData={interviewerData}
               handleChange={handleChange}
               handleFileChange={handleFileChange}
               errors={errors}
             />
           </div>
         </div>
       ) : (
         <div>
           <h1></h1>
         </div>
       )}


       <div className="flex justify-center gap-4 mt-8">
         {currentStep > 1 && (
           <button
             onClick={() => setCurrentStep(currentStep - 1)}
             className="py-3 px-6 text-blue-600 border bg-white border-blue-600 text-lg rounded-lg transition-all hover:bg-blue-50"
           >
             Back
           </button>
         )}
         {currentStep < 2 && (
           <button
             onClick={() => setCurrentStep(currentStep + 1)}
             className="py-3 px-6 text-white bg-blue-700 text-lg rounded-lg transition-all hover:bg-blue-800"
           >
             Next
           </button>
         )}
         {currentStep === 2 && (
           <button
             disabled={loading}
             onClick={handleSubmit}
             className="py-3 px-6 text-white bg-blue-700 text-lg rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-blue-800"
           >
             {loading ? (
               <Loader2 size={20} className="animate-spin" />
             ) : (
               "Sign Up"
             )}
           </button>
         )}
       </div>
     </div>
   </div>
 );
};


export default InterviewerSignupPage;
