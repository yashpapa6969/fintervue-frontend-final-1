import { Link } from "react-router-dom";

const ProductCard = ({
  title,
  description,
  buttonText,
  imagePosition,
  imagelink,
  link,
}) => (
  <div
    className={`flex flex-col lg:flex-row items-center gap-8 py-8 ${
      imagePosition === "right" ? "lg:flex-row-reverse" : ""
    }`}
  >
    <div className="w-full lg:w-1/2 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
      <Link to={link}>
        <button className=" mt-3 btn btn-lg bg-black text-white p-3 rounded-md">{buttonText}</button>
      </Link>
    </div>
    <div className="w-full lg:w-1/2">
      <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
        <span className="text-2xl font-bold text-background">
          <img src={imagelink} alt="similar image" />
        </span>
      </div>
    </div>
  </div>
);

const ProductSection = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <ProductCard
          title="AI Job Interview"
          description="Prepare for your upcoming interview with a mock interview. Gain valuable insights and confidence to ace your next job interview."
          buttonText="Start Now"
          imagePosition="left"
          link="/product/ai_intervue"
          imagelink="../assests/ai_interview.jpg"
        />

        <div className="divider my-2 border-t border-border"></div>

        <ProductCard
          title="Resume Builder"
          description="Create or upload a resume, or enter your job title and let our AI generate a professional resume for you in seconds."
          buttonText="Start Now"
          imagePosition="right"
          link="/product/resumeBuilder"
          imagelink="../assests/ai_interview.jpg"
        />

        <div className="divider my-2 border-t border-border"></div>

        <ProductCard
          title="Resume Analysis"
          description="Upload your resume and get matched with the best job offers. Generate application kits for job posts with just a click!"
          buttonText="Start Now"
          imagePosition="left"
          link="/product/resumeAnalysis"
          imagelink="../assests/ai_interview.jpg"
        />
      </div>
    </div>
  );
};

export default ProductSection;
