import Navbar from "../navbar";
import { useTheme } from "next-themes";
import { MagicCard } from "../../components/ui/magic-card";
import BoxReveal from "../../components/ui/box-reveal";
import resumeGen from "../../assests/resume_generator.png";
import Button from "../button";
import { Divide } from "lucide-react";
import Helix from "../../assests/helix2_1.png";
import CubeHelix from "../../assests/cube-helix (2).png";
import HalfTorus from "../../assests/half-torus-old.png";

const Products = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-10 my-6">
        <div className="md:col-span-3 bg-hellix-img relative overflow-hidden group flex flex-col gap-5 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 p-10">
          <img className="hidden md:flex absolute right-10 bottom-10 h-1/2" src={Helix} />
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-4xl font-semibold">
              AI Job Interview<span className="text-[#5046e6]">.</span>
            </p>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-[.5rem] text-[1.5rem]">
              Prepare for your upcoming interview in style. Generate a{" "}
              <span className="text-[#5046e6]">
                mock interview and practise
              </span>{" "}
              beforehand to gain valuable insights and confidence.{" "}
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-[1.5rem] flex flex-col gap-3">
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Prepare before real interview
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Expand your knowledge
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Increase Confidence
                </span>
              </p>
            </div>
          </BoxReveal>
          <a href="/product">
            <Button text={"Start Now"} className="" />
          </a>
        </div>
        <div className="md:col-span-2 relative flex group flex-col gap-5 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 p-10">
          <img className="hidden md:flex absolute right-10 bottom-10 h-1/2" src={HalfTorus} />
          <BoxReveal boxColor={"#5046e6"} duration={1.0}>
            <p className="text-4xl font-semibold">Resume Builder</p>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.0}>
            <h2 className="mt-[.5rem] text-[1.5rem]">
              The quickest and most efficient way to create a resume, upload an
              existing one or provide your{" "}
              <span className="text-[#5046e6]"> desired job title</span> and our
              AI will generate the first draft for you in seconds.{" "}
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.0}>
            <div className="mt-[1.5rem] flex flex-col gap-3">
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  First draft in seconds
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  AI First Editor
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  ATS Friendly resume builder
                </span>
              </p>
            </div>
          </BoxReveal>
          <a href="/product/resumeBuilder">
            <Button text={"Start Now"} className="w-[300px]" />
          </a>
        </div>
        <div className="flex md:col-span-5 relative group flex-col gap-5 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 p-10">
        <img className="hidden md:flex absolute right-10 bottom-10 h-1/2" src={CubeHelix} />
          <BoxReveal boxColor={"#5046e6"} duration={1.5}>
            <p className="text-4xl font-semibold">Resume analysis</p>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.5}>
            <h2 className="mt-[.5rem] text-[1.5rem]">
              Upload your CV and get matched with{" "}
              <span className="text-[#5046e6]">the best job offers</span> from
              all around the world. To apply quicker, generate application kits
              for the job posts in a single click!
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.5}>
            <div className="mt-[1.5rem] flex flex-col gap-3">
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Jobs in finance sectors
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Match with perfect offers using AI
                </span>
              </p>
              <p>
                <span className="font-semibold text-[1.2rem] text-[#5046e6]">
                  Integrated Application Kits
                </span>
              </p>
            </div>
          </BoxReveal>
          <a href="/product/resumeAnalysis">
            <Button text={"Start Now"} className="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;
