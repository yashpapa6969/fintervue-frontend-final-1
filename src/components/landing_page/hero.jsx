"use client";

import { FaArrowRight } from "react-icons/fa";
import Button from "../button";
import HeroImage from "../../assests/svg-2.svg"; 
// import HalfTorus from "../../assests/half-torus1.png"; 
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // console.log("HeroImage:", HeroImage);
  // console.log("HalfTorus:", HalfTorus);

  return (
    <section
      ref={heroRef}
      className="p-8 pb-16 md:p-10 lg:p-20 font-medium bg-gradient-to-tr from-[#001E80] via-[#e4eaff]  overflow-x-clip md:items-center gap-3"
    >
      <div className="md:flex items-center justify-center gap-16">
        <div className="md:w-[478px]">
          <div className="text-5xl md:text-7xl font-black my-7 bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text tracking-tighter">
          Ace your next finance interview with Fintervue.
          </div>
          <div className="text-xl lg:text-2xl tracking-tighter opacity-85">
          One stop shop for aspiring finance professionals, industry veterans and corporate behemoths to achieve their goals.
          </div>

          <div className="flex items-center gap-3 mt-6 text-lg">
            <Button text="Join as interviewer" />
            <Button text="Join as interviewee " />
          </div>
        </div>
        <div className="pt-12 md:pt-0 md:h-[648px] md:w-[648px] relative">
          <motion.img
            src={HeroImage.src || HeroImage} 
            alt="Hero Image"
            className="md:absolute md:h-full md:w-auto md:max-w-none"
            animate={{
              translateY,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={HalfTorus.src || HalfTorus} 
            alt="HalfTorus"
            className="hidden lg:block md:absolute left-[400px] top-[500px]"
            style={{
              translateY,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
