import { ChevronRight } from "lucide-react";
import React from "react";
import Navbar from "../navbar";
import { useTheme } from "next-themes";
import { MagicCard } from "../../components/ui/magic-card";
import BoxReveal from "../../components/ui/box-reveal";
import resumeGen from "../../assests/resume_generator.png";
import Button from "../button";

const RefundsAndCancellation = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col items-center">
        <div className="text-3xl md:text-4xl lg:text-5xl py-3 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          Refunds and Cancellation
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 max-w-[1000px] mt-8">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            <p className="w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              totam aspernatur? Ea, facilis qui.
            </p>
            <button
              className={`px-4 py-3 rounded-lg text-lg w-fit font-medium transition-colors flex items-center gap-2 duration-300 bg-gray-800 hover:bg-gray-900 text-white`}
            >
              Claim your refund <ChevronRight size={16} />
            </button>
          </div>
          <div className="w-full flex flex-col gap-4 md:w-1/2">
            <div className="border-2 w-full py-4 px-3 text-md font-semibold rounded-xl border-slate-300/80">
              Email Id
              <p className="w-full text-sm font-normal">
                fintervue.dev@gmail.com
              </p>
            </div>
            <div className="border-2 w-full py-4 px-3 text-md font-semibold rounded-xl border-slate-300/80">
              Contact no
              <p className="w-full text-sm font-normal">080-123-4567-890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundsAndCancellation;
