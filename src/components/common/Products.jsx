import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

// Import images
import resumeAnalysisImage from "../../assests/icons/resume_analysis.jpg";
import aiInterviewImage from "../../assests/ai_interview.jpg";
import resumeBuilderImage from "../../assests/icons/resumeBuilder.jpg";
import Footer from "../landing_page/footer";

const ProductCard = ({
  title,
  description,
  buttonText,
  imagePosition,
  imagelink,
  link,
}) => {
  const navigate = useNavigate();

  const handleProductAccess = () => {
    navigate(link);
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