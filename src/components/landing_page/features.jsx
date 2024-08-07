import React from "react";
import  InfoSection from "./infoSection";


import svg1 from "../../assests/profile.png";
import svg2 from "../../assests/Visual.png";

import profile from "../../assests/svg-1.svg";

import svg3 from "../../assests/Visual.png";

const homeObjOne = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "AI Interview platform",
  headline: "Revolutionize Your Hiring Process",
  description:
    "With Fintervue, leverage advanced AI to streamline and enhance your recruitment process, ensuring you find the best candidates for your finance-related job roles.",
  buttonLabel: "Get Started",
  imgStart: "",
  img: svg1,
  alt: "Credit Card",
  start: "",
};



const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: "Leverage technology",
  headline: "What is Fintervue?",
  description:
    "Fintervue is an innovative platform designed to transform the way you conduct interviews for finance sector positions. Our AI-driven solution provides a seamless and efficient interview process, saving you time and resources while ensuring you get the best talent.",
  buttonLabel: "Learn More",
  imgStart: "start",
  img: profile,
  alt: "Vault",
  start: "true",
};


const Features = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="info-section ">
        <InfoSection {...homeObjThree} />
      </div>
      <div className="info-section">
        <InfoSection {...homeObjOne} />
      </div>
    
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Source Sans Pro", sans-serif;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        *::-webkit-scrollbar {
          width: 0.5px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
          border: transparent;
        }
        .container {
          z-index: 1;
          width: 100%;
          // max-width: 1300px;
          margin-right: auto;
          margin-left: auto;
          padding-right: 50px;
          padding-left: 50px;
        }
        @media screen and (max-width: 991px) {
          .container {
            padding-right: 30px;
            padding-left: 30px;
          }
        }
        .button {
          border-radius: 4px;
          background: var(--primary-bg, #4b59f7);
          white-space: nowrap;
          padding: var(--button-padding, 10px 20px);
          color: #fff;
          font-size: var(--button-font-size, 16px);
          outline: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }
        .button:hover {
          background: #fff;
          background-color: var(--primary-hover-bg, #0467fb);
        }
        @media screen and (max-width: 960px) {
          .button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;
