"use client";

import ProductImage from "../../assests/product_image.png";
import Pyramid from "../../assests/pyramid.png";
import Tube from "../../assests/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoBell, GoGoal } from "react-icons/go";
import { LuLeaf } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";

const ProductShowcase = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-t from-[#acbae8] to-white flex flex-col items-center overflow-x-hidden pb-24"
    >
      <div className="flex flex-col items-center font-medium mt-24 px-8 mx-auto md:w-[550px] lg:w-[630px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          Boost your productivity
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          What is Fintervue?
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
          Fintervue is an innovative platform designed to transform the way you
          conduct interviews for finance sector positions. Our AI-driven
          solution provides a seamless and efficient interview process, saving
          you time and resources while ensuring you get the best talent.
        </div>
      </div>
      <div className="relative ">
        <motion.img
          src={Pyramid.src}
          alt="Pyramid Image"
          className="absolute -right-24 -top-20 w-72 h-72 hidden md:block"
          style={{
            translateY: translateY,
          }}
        />
        <div className="bg-white p-7 rounded-[20px]">
          <img
            src={ProductImage}
            alt="Product Image"
            className="px-1 rounded-[20px]"
          />
          <motion.img
            src={Tube.src}
            alt="Tube Image"
            className="absolute w-72 h-72 top-64 -left-28 hidden md:block"
            style={{
              translateY: translateY,
            }}
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-20 max-w-[1400px] lg:px-28">
        <div className="mt-16">
          <LuLeaf className="text-2xl mb-3" />
          <div className="font-bold text-2xl">
            Optimizing Efficiency to Reduce Time to Hire
          </div>
          <div className="text-lg my-2">
            Streamline recruitment to speed up candidate evaluation.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <GoGoal className="text-2xl mb-3" />
          <div className="font-bold text-2xl">
            Standardized Interview Process
          </div>
          <div className="text-lg my-2">
            Ensures fair and consistent candidate evaluation.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <MdLockOutline className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Secure data encryption</div>
          <div className="text-lg my-2">
            Ensure data safety with top-tier encryption.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <GoBell className="text-2xl mb-3" />
          <div className="font-bold text-2xl">
            Easily Handle High Volumes of Applicants
          </div>
          <div className="text-lg my-2">
            automation tools and structured workflows enables seamless
            management
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
