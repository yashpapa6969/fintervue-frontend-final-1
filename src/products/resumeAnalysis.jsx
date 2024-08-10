import React from "react";
import Navbar from "../components/navbar";
import FlipText from "../components/ui/flip-text";
import { BorderBeam } from "../components/ui/border-beam";
import img1 from "../assests/resume_generator.png"; // Ensure the path is correct
import Upload from "../components/common/Upload";

const ResumeAnalysis = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 p-20">
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
           <FlipText
              className="text-4xl font-bold tracking-[-0.1em] bg-clip-text   md:text-7xl md:leading-[5rem]"
              word="Resume analyser"
            />
            <h3 className="mt-[.5rem] text-[1.5rem] pt-5">
              helps you optimize your resume for any job, highlighting the key
              experience and skills recruiters need to see.
            </h3>

            {/* Image and BorderBeam Container */}
            <div className="relative mt-10 w-[400px] h-[400px] mx-auto rounded-[20px]">
              <img
                src={img1}
                alt="Resume Generator"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0">
                <BorderBeam
                  size={200}
                  duration={15}
                  anchor={90}
                  borderWidth={2.5}
                  colorFrom="#ffaa40"
                  colorTo="#9c40ff"
                  delay={0}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Upload/>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
