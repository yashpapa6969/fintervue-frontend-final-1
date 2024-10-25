import { ChevronRight } from "lucide-react";
import React from "react";
import Navbar from "../Navbar";
import resumeGen from "../../assests/resume_generator.png";
import Button from "../button";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-6">
        {/* About Us Heading */}
        <div className="text-3xl md:text-4xl lg:text-5xl py-3 font-bold tracking-tighter text-center text-black">
          Privacy Policy
        </div>

        {/* What is Fintervue? Section */}
        <div className="mt-8 text-lg text-black leading-relaxed">
          <h2 className="text-2xl font-semibold mb-4">What is Fintervue?</h2>
          <p>
            Fintervue streamlines your hiring process with AI-driven tools,
            providing efficient candidate assessments and data-driven
            decision-making. It also offers a fair and flexible interview
            experience, ensuring objective evaluation and valuable feedback for
            your career growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
