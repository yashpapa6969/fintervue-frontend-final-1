import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Navbar from "../navbar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


// Import images
import resumeAnalysisImage from "../../assests/icons/resume_analysis.jpg";
import aiInterviewImage from "../../assests/ai_interview.jpg";
import resumeBuilderImage from "../../assests/icons/resumeBuilder.jpg";
import Footer from "../landing_page/footer";


// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     borderRadius: "15px",
//     padding: "20px",
//     width: "90%",
//     maxWidth: "500px",
//     boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
//   },
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//   },
// };

const validateInput = (name, email, phone) => {
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{10}$/;

  if (!namePattern.test(name)) {
    alert("Please enter a valid name (only letters and spaces are allowed).");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
  }

  return true;
};

const ProductCard = ({
  title,
  description,
  buttonText,
  imagePosition,
  imagelink,
  link,
}) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleProductAccess = () => {

    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, phone } = formData;
    if (validateInput(name, email, phone)) {
      closeModal();
      navigate(link);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 py-8 ${
        imagePosition === "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
        <button
          className="mt-3 btn btn-lg bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors"
          onClick={handleProductAccess}
        >
          {buttonText}
        </button>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="aspect-video rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={imagelink}
            alt={title}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
      {/* Modal - Only shown when authenticated */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Product Details Form"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="w-full mt-3 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Verify
          </button>
        </div>
      </Modal> */}

      <Dialog open={modalIsOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-bold mb-4">
              Enter Your Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h2>Name</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2  rounded-md"
            />
            <h2>Email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
            <h2>Phone no </h2>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="w-full mt-3 bg-black text-white p-3 rounded-md
              hover:bg-gray-800 transition-colors"
            >
              {" "}
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ProductSection = () => {
  const navigate = useNavigate();


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div>
          <ProductCard
            title="AI Job Interview"
            description="Prepare for your upcoming interview with a mock interview. Gain valuable insights and confidence to ace your next job interview."
            buttonText="Start Now"
            imagePosition="left"
            link="/product/ai_intervue"
            imagelink={aiInterviewImage}
          />

        </div>

        <div className="divider my-2 border-t border-gray-200"></div>

        <ProductCard
          title="Resume Builder"
          description="Create or upload a resume, or enter your job title and let our AI generate a professional resume for you in seconds."
          buttonText="Start Now"
          imagePosition="right"
          link="/product/resumeBuilder"
          imagelink={resumeBuilderImage}
        />

        <div className="divider my-2 border-t border-gray-200"></div>

        <ProductCard
          title="Resume Analysis"
          description="Upload your resume and get matched with the best job offers. Generate application kits for job posts with just a click!"
          buttonText="Start Now"
          imagePosition="left"
          link="/product/resumeAnalysis"
          imagelink={resumeAnalysisImage}
        />
      </div>
      <Footer/>
    </>
  );
};

export default ProductSection;