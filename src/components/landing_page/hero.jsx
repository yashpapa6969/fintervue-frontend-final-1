"use client";

import { FaArrowRight } from "react-icons/fa";
import Button from "../button";
import HeroImage from "../../assests/svg-2.svg"; 

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={heroRef}
      className="p-8 pb-16 md:p-12 lg:p-20 bg-gradient-to-tr from-[#001E80] via-[#e4eaff] to-white overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto md:flex items-center justify-between gap-16">
        <div className="md:w-[520px] space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-b from-[#1a1a1a] to-[#002499] text-transparent bg-clip-text">
            Ace your next finance interview with Fintervue.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            A one-stop solution for aspiring finance professionals, industry veterans,
            and corporate leaders to reach new heights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/signup/interviewer" aria-label="Join as interviewer" className="w-full sm:w-auto">
              <Button
                text="Join as interviewer"
                className="w-full sm:w-auto bg-[#1E90FF] text-white shadow-lg 
                hover:bg-[#1C86EE] hover:shadow-[#1E90FF]/20 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-md
                transition-all duration-200 ease-in-out
                font-semibold tracking-wide"
              />
            </Link>
            <Link to="/signup/candidate" aria-label="Join as interviewee" className="w-full sm:w-auto">
              <Button
                text="Join as interviewee"
                className="w-full sm:w-auto bg-white text-[#1E90FF] border-2 border-[#1E90FF]
                shadow-lg hover:shadow-[#1E90FF]/20 hover:-translate-y-0.5 
                hover:bg-[#1E90FF]/5 active:bg-[#1E90FF]/10
                active:translate-y-0 active:shadow-md
                transition-all duration-200 ease-in-out
                font-semibold tracking-wide"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-0 md:w-[580px] relative">
          <motion.img
            src={HeroImage.src || HeroImage}
            alt="Hero Image"
            className="w-full h-auto md:max-w-none object-contain"
            style={{ translateY }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
